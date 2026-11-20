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

// ---------- 연도 탭을 누르면: 그 연도(전체)에서 가장 위에 있는, 세트리스트가 확정된 공연을 선택 ----------
function selectTopConcertOfYear(year) {
  const list = year ? sortedConcerts.filter(c => c.date.startsWith(year)) : sortedConcerts;
  const top = list.find(c => !c.setlist.some(isUnknown)) || list[0];
  if (top) selectedConcertId = top.id;
}

// ---------- 연도 탭 렌더링 ----------
function renderYearNav() {
  const years = [...new Set(sortedConcerts.map(c => c.date.slice(0, 4)))].sort((a, b) => b - a);
  const nav = document.getElementById("yearNav");
  nav.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.className = "year-tab" + (selectedYear === null ? " active" : "");
  allBtn.textContent = "전체";
  allBtn.onclick = () => { selectedYear = null; selectTopConcertOfYear(null); showView("archive"); };
  nav.appendChild(allBtn);

  years.forEach(year => {
    const btn = document.createElement("button");
    btn.className = "year-tab" + (selectedYear === year ? " active" : "");
    btn.textContent = year;
    btn.onclick = () => { selectedYear = year; selectTopConcertOfYear(year); showView("archive"); };
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
    const block = document.createElement("button");
    block.type = "button";
    block.className = "concert-block"
      + (concert.id === selectedConcertId ? " selected" : "")
      + (concert.setlist.some(isUnknown) ? " pending" : "");
    block.innerHTML = `
      <span class="date">${formatDate(concert.date)}</span>
      <span class="info">
        <span class="title">${concert.title}</span>
        <span class="venue">${concert.venue}</span>
      </span>
      <span class="count">${getCountLabel(concert)}</span>
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
        ${isUnknown(song)
          ? `<div class="song-name">${displayName}</div>`
          : `<button type="button" class="song-name" data-i="${i}" title="곡 기록 보기">${displayName}</button>`}
        ${statsHtml}
      </div>
    `;
  }).join("");

  const photoLink = concert.photoUrl
    ? `<a class="sv-photo-link" href="${concert.photoUrl}" target="_blank" rel="noopener noreferrer">추억의 책장 ↗</a>`
    : "";

  view.innerHTML = `
    <div class="sv-date">${formatDate(concert.date)}</div>
    <h2 class="sv-title">${concert.title}</h2>
    <div class="sv-venue"><span>${concert.venue}</span><span class="sv-count">${getCountLabel(concert)}</span>${photoLink}</div>
    <div class="song-head"><span>NO</span><span>SONG</span><span>HISTORY</span></div>
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

// 캘린더 초기 표시 월: 오늘 날짜가 있는 달로 시작
function initCalendarDate() {
  const today = new Date();
  calYear = today.getFullYear();
  calMonth = today.getMonth();
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

    const dayConcerts = sortedConcerts.filter(c => c.date === dateStr);
    const daySchedules = scheduleItems.filter(s => s.date === dateStr);

    // PC: 날짜 칸에 공연명 / 일정명 표시
    dayConcerts.forEach(concert => {
      const tag = document.createElement("button");
      tag.type = "button";
      tag.className = "cal-event cal-event-concert";
      tag.textContent = concert.title;
      tag.onclick = () => goToConcert(concert.id);
      cell.appendChild(tag);
    });

    daySchedules.forEach(item => {
      const tag = document.createElement("button");
      tag.type = "button";
      tag.className = "cal-event cal-event-schedule";
      tag.textContent = item.title;
      tag.onclick = () => openScheduleModal(item);
      cell.appendChild(tag);
    });

    // 모바일: 공연명 대신 점으로 표시 (빨강 = 공연, 회색 = 일정)
    if (dayConcerts.length || daySchedules.length) {
      const dots = document.createElement("div");
      dots.className = "cal-dots";
      dayConcerts.forEach(() => {
        const dot = document.createElement("span");
        dot.className = "cal-dot concert";
        dots.appendChild(dot);
      });
      daySchedules.forEach(() => {
        const dot = document.createElement("span");
        dot.className = "cal-dot schedule";
        dots.appendChild(dot);
      });
      cell.appendChild(dots);
    }

    grid.appendChild(cell);
  }

  renderAgenda();
}

// ---------- 모바일: 캘린더 아래 "이달의 일정" 목록 ----------
function renderAgenda() {
  const agenda = document.getElementById("calendarAgenda");
  const prefix = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-`;

  const items = [
    ...sortedConcerts
      .filter(c => c.date.startsWith(prefix))
      .map(c => ({ type: "concert", date: c.date, title: c.title, concert: c })),
    ...scheduleItems
      .filter(s => s.date.startsWith(prefix))
      .map(s => ({ type: "schedule", date: s.date, title: s.title, schedule: s }))
  ].sort((a, b) => a.date.localeCompare(b.date));

  agenda.innerHTML = "";

  const head = document.createElement("div");
  head.className = "agenda-head";
  head.textContent = "이달의 일정";
  agenda.appendChild(head);

  if (items.length === 0) {
    const empty = document.createElement("p");
    empty.className = "agenda-empty";
    empty.textContent = "이달의 일정이 없습니다.";
    agenda.appendChild(empty);
    return;
  }

  items.forEach(item => {
    const row = document.createElement("button");
    row.type = "button";
    row.className = "agenda-item " + item.type;

    const date = document.createElement("span");
    date.className = "agenda-date";
    date.textContent = item.date.slice(5).replace("-", ".");

    const title = document.createElement("span");
    title.className = "agenda-title";
    title.textContent = item.title;

    row.appendChild(date);
    row.appendChild(title);
    row.onclick = () => {
      if (item.type === "concert") goToConcert(item.concert.id);
      else openScheduleModal(item.schedule);
    };
    agenda.appendChild(row);
  });
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
// 곡 기록 팝업 (곡 이름 클릭)
// ============================================

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// 이 곡의 전체 연주 기록 계산 (대소문자·앞뒤 공백 무시)
function getSongHistory(songName) {
  const target = normalizeSong(songName);

  // sortedConcerts는 최신순
  const rows = sortedConcerts.map(c => {
    const played = c.setlist.some(s => normalizeSong(s) === target);
    const unknown = !played && c.setlist.some(isUnknown); // 세트리스트가 아직 미정인 공연
    return { concert: c, played, unknown };
  });

  const playedRows = rows.filter(r => r.played);
  const last = playedRows.length ? playedRows[0].concert : null;

  // 첫 공연 연도 ~ 마지막 공연 연도까지, 연주 0회인 해도 포함
  const yearNums = sortedConcerts.map(c => Number(c.date.slice(0, 4)));
  const minY = Math.min(...yearNums);
  const maxY = Math.max(...yearNums);
  const yearCounts = [];
  for (let y = minY; y <= maxY; y++) {
    yearCounts.push({
      year: y,
      count: playedRows.filter(r => Number(r.concert.date.slice(0, 4)) === y).length
    });
  }

  return { rows, total: playedRows.length, last, yearCounts };
}

let songModalOpener = null; // 팝업 닫은 뒤 포커스를 돌려줄 요소

function openSongModal(songName) {
  const h = getSongHistory(songName);
  const maxCount = Math.max(1, ...h.yearCounts.map(y => y.count));

  const lastHtml = h.last
    ? `<span class="sm-label">마지막 연주</span>
       <span class="sm-last-date">${formatDate(h.last.date)}</span>
       <span class="sm-last-title">${escapeHtml(h.last.title)}</span>`
    : `<span class="sm-label">마지막 연주</span>
       <span class="sm-last-title">기록이 없습니다</span>`;

  const bars = h.yearCounts.map(y => {
    const px = y.count ? Math.max(4, Math.round((y.count / maxCount) * 52)) : 2;
    return `
      <div class="sm-col" title="${y.year}년 ${y.count}회">
        <span class="sm-count${y.count ? "" : " zero"}">${y.count}</span>
        <span class="sm-bar${y.count ? "" : " zero"}" style="height:${px}px"></span>
        <span class="sm-year">${y.year}</span>
      </div>`;
  }).join("");

  const tableRows = h.rows.map(r => {
    let mark;
    if (r.played) mark = `<span class="sm-circle played" role="img" aria-label="연주함"></span>`;
    else if (r.unknown) mark = `<span class="sm-unknown" aria-label="세트리스트 미정">-</span>`;
    else mark = `<span class="sm-circle none" role="img" aria-label="연주 안 함"></span>`;
    return `
      <tr class="sm-row${r.played ? " played" : ""}">
        <td class="sm-t-date">${formatDate(r.concert.date)}</td>
        <td class="sm-t-title">${escapeHtml(r.concert.title)}</td>
        <td class="sm-t-mark">${mark}</td>
      </tr>`;
  }).join("");

  document.getElementById("songModalBody").innerHTML = `
    <h3 class="sm-title" id="songModalTitle">${highlightTags(escapeHtml(songName.trim()))}</h3>
    <div class="sm-last">${lastHtml}</div>

<div class="sm-chart">${bars}</div>

    <div class="sm-head"><span>공연별 연주 여부</span></div>
    <div class="sm-table-wrap">
      <table class="sm-table"><tbody>${tableRows}</tbody></table>
    </div>
  `;

  songModalOpener = document.activeElement;
  document.getElementById("songModal").classList.add("open");
  document.getElementById("songModalClose").focus();
}

function closeSongModal() {
  const modal = document.getElementById("songModal");
  if (!modal.classList.contains("open")) return;
  modal.classList.remove("open");
  if (songModalOpener && songModalOpener.focus) songModalOpener.focus();
  songModalOpener = null;
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

// 곡 이름 클릭 -> 곡 기록 팝업
document.getElementById("setlistView").addEventListener("click", (e) => {
  const btn = e.target.closest("button.song-name");
  if (!btn) return;
  const concert = sortedConcerts.find(c => c.id === selectedConcertId);
  const song = concert ? concert.setlist[Number(btn.dataset.i)] : null;
  if (song) openSongModal(song);
});
document.getElementById("songModalClose").addEventListener("click", closeSongModal);
document.getElementById("songModal").addEventListener("click", (e) => {
  if (e.target.id === "songModal") closeSongModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeSongModal();
    closeScheduleModal();
  }
});

// ---------- 초기 실행: 첫 화면은 캘린더 뷰 ----------
initCalendarDate();
showView("calendar");
