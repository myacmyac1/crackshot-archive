// ============================================
// CRACKSHOT Setlist Archive - 동작 스크립트
// ============================================

// 날짜순(최신 -> 과거) 정렬된 공연 목록
const sortedConcerts = [...CONCERTS].sort((a, b) => new Date(b.date) - new Date(a.date));

let selectedYear = null;      // null이면 전체 연도
let selectedConcertId = sortedConcerts[0]?.id || null; // 기본값: 가장 최근 공연
let currentView = "calendar";  // "calendar" | "archive" — 첫 화면은 캘린더
let searchTerm = "";           // 곡 검색어 (정규화된 소문자 상태로 저장)

// 스케줄(세트리스트 없는 일정) - data.js에 없으면 빈 배열로 처리
const scheduleItems = typeof SCHEDULE !== "undefined" ? SCHEDULE : [];

// ---------- 날짜 포맷 (YYYY-MM-DD -> YYYY.MM.DD) ----------
function formatDate(dateStr) {
  return dateStr.replaceAll("-", ".");
}

// ---------- 곡 이름 정규화: 대소문자 무시 + 앞뒤 공백 무시 ----------
// 비교(같은 곡인지 판단)할 때만 사용하고, 화면에 보여줄 땐 원래 이름을 씁니다.
function normalizeSong(song) {
  return song.trim().toLowerCase();
}

function isUnknown(song) {
  return normalizeSong(song) === "coming soon";
}

// ---------- 이 곡을 이전에 연주한 날로부터 며칠만인지 계산 ----------
function getDaysSinceLastPlayed(songName, currentDate) {
  const target = normalizeSong(songName);
  const past = sortedConcerts
    .filter(c => c.date < currentDate)
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // 최신순

  for (const concert of past) {
    if (concert.setlist.some(s => normalizeSong(s) === target)) {
      const diffMs = new Date(currentDate) - new Date(concert.date);
      const days = Math.round(diffMs / (1000 * 60 * 60 * 24));
      return days;
    }
  }
  return null; // 이전에 연주된 기록 없음
}

// ---------- 이 곡을 올해(currentDate 기준 연도) 몇 번째로 연주하는지 계산 ----------
// 같은 연도의 공연들 중, 현재 공연을 포함해서 이 곡이 몇 번 등장했는지 셉니다.
function getPlayCountThisYear(songName, currentDate) {
  const target = normalizeSong(songName);
  const year = currentDate.slice(0, 4);
  return sortedConcerts.filter(c =>
    c.date.slice(0, 4) === year &&
    c.date <= currentDate &&
    c.setlist.some(s => normalizeSong(s) === target)
  ).length;
}

// ---------- 곡 수 라벨: UNKNOWN이 포함되어 있으면 "-", 아니면 "N곡" ----------
function getCountLabel(concert) {
  const hasUnknown = concert.setlist.some(isUnknown);
  return hasUnknown ? "-" : `${concert.setlist.length}곡`;
}

// ---------- (포지션체인지), (solo) 같은 태그를 포인트 컬러로 강조 ----------
function highlightTags(songName) {
  return songName.replace(/\((포지션체인지|solo)\)/gi, '<span class="song-tag">($1)</span>');
}

// ---------- 연도 탭 렌더링 ----------
function renderYearNav() {
  const years = [...new Set(sortedConcerts.map(c => c.date.slice(0, 4)))].sort((a, b) => b - a);
  const nav = document.getElementById("yearNav");
  nav.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.className = "year-tab" + (selectedYear === null ? " active" : "");
  allBtn.textContent = "전체";
  allBtn.onclick = () => { selectedYear = null; showView("archive"); };
  nav.appendChild(allBtn);

  years.forEach(year => {
    const btn = document.createElement("button");
    btn.className = "year-tab" + (selectedYear === year ? " active" : "");
    btn.textContent = year;
    btn.onclick = () => { selectedYear = year; showView("archive"); };
    nav.appendChild(btn);
  });
}

// ---------- 왼쪽 공연 블록 리스트 렌더링 ----------
function renderConcertList() {
  const list = document.getElementById("concertList");
  list.innerHTML = "";

  let filtered = selectedYear
    ? sortedConcerts.filter(c => c.date.startsWith(selectedYear))
    : sortedConcerts;

  if (searchTerm) {
    filtered = filtered.filter(c =>
      c.setlist.some(s => normalizeSong(s).includes(searchTerm))
    );
  }

  if (filtered.length === 0) {
    const empty = document.createElement("p");
    empty.className = "search-empty";
    empty.textContent = "일치하는 공연이 없습니다.";
    list.appendChild(empty);
    return;
  }

  filtered.forEach(concert => {
    const block = document.createElement("div");
    block.className = "concert-block" + (concert.id === selectedConcertId ? " selected" : "");
    block.innerHTML = `
      <div class="date">${formatDate(concert.date)}</div>
      <div class="title">${concert.title}</div>
      <div class="venue">${concert.venue}<span class="count">${getCountLabel(concert)}</span></div>
    `;
    block.onclick = () => {
      selectedConcertId = concert.id;
      renderAll();
    };
    list.appendChild(block);
  });
}

// ---------- 오른쪽 세트리스트 뷰 렌더링 ----------
function renderSetlistView() {
  const view = document.getElementById("setlistView");
  const concert = sortedConcerts.find(c => c.id === selectedConcertId);

  if (!concert) {
    view.innerHTML = `<p style="color:var(--ink-dim)">공연을 선택해주세요.</p>`;
    return;
  }

  const year = concert.date.slice(0, 4);

  const rows = concert.setlist.map((song, i) => {
    const displayName = highlightTags(song.trim());
    const numberLabel = isUnknown(song) ? "-" : String(i + 1).padStart(2, "0");

    let statsHtml;
    if (isUnknown(song)) {
      statsHtml = `<div class="song-gap">-</div>`;
    } else {
      const days = getDaysSinceLastPlayed(song, concert.date);
      const yearCount = getPlayCountThisYear(song, concert.date);
      const yearCountText = `${year}년 ${yearCount}번째`;

      // "n년 n번째"에서 1번째면 강조색
      const yearCountHtml = yearCount === 1
        ? `<span class="stat-highlight">${yearCountText}</span>`
        : yearCountText;

      // "n일만" 문구: 200일 이상 지났을 때만 일반 색상으로 표시. 첫 연주면 강조색으로 표시.
      let gapHtml = "";
      if (days === null) {
        gapHtml = `<span class="stat-highlight">첫 연주</span><span class="song-divider">|</span>`;
      } else if (days >= 200) {
        gapHtml = `${days}일만<span class="song-divider">|</span>`;
      }

      statsHtml = `<div class="song-gap">${gapHtml}${yearCountHtml}</div>`;
    }

    return `
      <div class="song-row">
        <div class="song-no">${numberLabel}</div>
        <div class="song-name">${displayName}</div>
        ${statsHtml}
      </div>
    `;
  }).join("");

  const photoLink = concert.photoUrl
    ? `<a class="sv-photo-link" href="${concert.photoUrl}" target="_blank" rel="noopener noreferrer">추억의 책장 ↗</a>`
    : "";

  view.innerHTML = `
    <div class="sv-date">${formatDate(concert.date)}</div>
    <div class="sv-title">${concert.title}</div>
    <div class="sv-venue">${concert.venue}<span class="sv-count">· ${getCountLabel(concert)}</span>${photoLink}</div>
    <div class="song-list">${rows}</div>
  `;
}

function renderAll() {
  renderYearNav();
  renderConcertList();
  renderSetlistView();
}

// ============================================
// 캘린더 뷰
// ============================================

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
let calYear, calMonth; // calMonth: 0~11

// 캘린더 초기 표시 월: 가장 최근 이벤트(공연 또는 스케줄)가 있는 달로 시작
function initCalendarDate() {
  const allDates = [
    ...sortedConcerts.map(c => c.date),
    ...scheduleItems.map(s => s.date)
  ].sort((a, b) => new Date(b) - new Date(a));

  const base = allDates.length ? new Date(allDates[0]) : new Date();
  calYear = base.getFullYear();
  calMonth = base.getMonth();
}

function renderCalendar() {
  const grid = document.getElementById("calendarGrid");
  const title = document.getElementById("calendarTitle");
  title.textContent = `${calYear}. ${String(calMonth + 1).padStart(2, "0")}`;
  grid.innerHTML = "";

  WEEKDAYS.forEach(w => {
    const cell = document.createElement("div");
    cell.className = "cal-weekday";
    cell.textContent = w;
    grid.appendChild(cell);
  });

  const firstDay = new Date(calYear, calMonth, 1);
  const startOffset = firstDay.getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();

  for (let i = 0; i < startOffset; i++) {
    const empty = document.createElement("div");
    empty.className = "cal-cell empty";
    grid.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const cell = document.createElement("div");
    cell.className = "cal-cell";

    const dayNum = document.createElement("div");
    dayNum.className = "cal-daynum";
    dayNum.textContent = day;
    cell.appendChild(dayNum);

    sortedConcerts
      .filter(c => c.date === dateStr)
      .forEach(concert => {
        const tag = document.createElement("div");
        tag.className = "cal-event cal-event-concert";
        tag.textContent = concert.title;
        tag.onclick = () => goToConcert(concert.id);
        cell.appendChild(tag);
      });

    scheduleItems
      .filter(s => s.date === dateStr)
      .forEach(item => {
        const tag = document.createElement("div");
        tag.className = "cal-event cal-event-schedule";
        tag.textContent = item.title;
        tag.onclick = () => openScheduleModal(item);
        cell.appendChild(tag);
      });

    grid.appendChild(cell);
  }
}

// 캘린더에서 공연 제목 클릭 -> 아카이브 뷰로 이동 + 해당 공연 선택
function goToConcert(concertId) {
  const concert = sortedConcerts.find(c => c.id === concertId);
  if (concert) selectedYear = concert.date.slice(0, 4);
  selectedConcertId = concertId;
  showView("archive");
}

// 세트리스트 없는 스케줄 클릭 -> 정보만 담긴 모달 표시
function openScheduleModal(item) {
  document.getElementById("modalDate").textContent = formatDate(item.date);
  document.getElementById("modalTitle").textContent = item.title;
  document.getElementById("modalMemo").textContent = item.memo || "";
  document.getElementById("scheduleModal").classList.add("open");
}

function closeScheduleModal() {
  document.getElementById("scheduleModal").classList.remove("open");
}

// ============================================
// 뷰 전환 (캘린더 <-> 아카이브)
// ============================================
function showView(view) {
  currentView = view;
  const archiveEl = document.getElementById("archiveView");
  const calendarEl = document.getElementById("calendarView");

  renderYearNav(); // 연도 탭은 두 화면 모두에서 항상 표시

  if (view === "calendar") {
    archiveEl.style.display = "none";
    calendarEl.style.display = "flex";
    renderCalendar();
  } else {
    calendarEl.style.display = "none";
    archiveEl.style.display = "grid";
    renderConcertList();
    renderSetlistView();
  }
}

// ---------- 이벤트 연결 ----------
document.getElementById("logoBtn").addEventListener("click", () => showView("calendar"));
document.getElementById("prevMonth").addEventListener("click", () => {
  calMonth--;
  if (calMonth < 0) { calMonth = 11; calYear--; }
  renderCalendar();
});
document.getElementById("nextMonth").addEventListener("click", () => {
  calMonth++;
  if (calMonth > 11) { calMonth = 0; calYear++; }
  renderCalendar();
});
document.getElementById("modalClose").addEventListener("click", closeScheduleModal);
document.getElementById("scheduleModal").addEventListener("click", (e) => {
  if (e.target.id === "scheduleModal") closeScheduleModal();
});
document.getElementById("songSearch").addEventListener("input", (e) => {
  searchTerm = normalizeSong(e.target.value);
  renderConcertList();
});

// ---------- 초기 실행: 첫 화면은 캘린더 뷰 ----------
initCalendarDate();
showView("calendar");
