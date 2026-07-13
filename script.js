// ============================================
// CRACKSHOT Setlist Archive - 동작 스크립트
// ============================================

// 날짜순(최신 -> 과거) 정렬된 공연 목록
const sortedConcerts = [...CONCERTS].sort((a, b) => new Date(b.date) - new Date(a.date));

let selectedYear = null;      // null이면 전체 연도
let selectedConcertId = sortedConcerts[0]?.id || null; // 기본값: 가장 최근 공연

// ---------- 날짜 포맷 (YYYY-MM-DD -> YYYY.MM.DD) ----------
function formatDate(dateStr) {
  return dateStr.replaceAll("-", ".");
}

// ---------- 이 곡을 이전에 연주한 날로부터 며칠만인지 계산 ----------
function getDaysSinceLastPlayed(songName, currentDate) {
  const past = sortedConcerts
    .filter(c => c.date < currentDate)
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // 최신순

  for (const concert of past) {
    if (concert.setlist.includes(songName)) {
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
  const year = currentDate.slice(0, 4);
  return sortedConcerts.filter(c =>
    c.date.slice(0, 4) === year &&
    c.date <= currentDate &&
    c.setlist.includes(songName)
  ).length;
}

// ---------- 연도 탭 렌더링 ----------
function renderYearNav() {
  const years = [...new Set(sortedConcerts.map(c => c.date.slice(0, 4)))].sort((a, b) => b - a);
  const nav = document.getElementById("yearNav");
  nav.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.className = "year-tab" + (selectedYear === null ? " active" : "");
  allBtn.textContent = "전체";
  allBtn.onclick = () => { selectedYear = null; renderAll(); };
  nav.appendChild(allBtn);

  years.forEach(year => {
    const btn = document.createElement("button");
    btn.className = "year-tab" + (selectedYear === year ? " active" : "");
    btn.textContent = year;
    btn.onclick = () => { selectedYear = year; renderAll(); };
    nav.appendChild(btn);
  });
}

// ---------- 왼쪽 공연 블록 리스트 렌더링 ----------
function renderConcertList() {
  const list = document.getElementById("concertList");
  list.innerHTML = "";

  const filtered = selectedYear
    ? sortedConcerts.filter(c => c.date.startsWith(selectedYear))
    : sortedConcerts;

  filtered.forEach(concert => {
    const block = document.createElement("div");
    block.className = "concert-block" + (concert.id === selectedConcertId ? " selected" : "");
    block.innerHTML = `
      <div class="date">${formatDate(concert.date)}</div>
      <div class="title">${concert.title}</div>
      <div class="venue">${concert.venue}</div>
      <span class="count">${concert.setlist.length}곡</span>
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
    const days = getDaysSinceLastPlayed(song, concert.date);
    const gapText = days === null ? "첫 연주" : `${days}일만`;
    const gapClass = days === null ? "song-gap first" : "song-gap";

    const yearCount = getPlayCountThisYear(song, concert.date);
    const yearCountText = `${year}년 ${yearCount}번째`;

    return `
      <div class="song-row">
        <div class="song-no">${String(i + 1).padStart(2, "0")}</div>
        <div class="song-name">${song}</div>
        <div class="${gapClass}">${gapText}<span class="song-divider">|</span>${yearCountText}</div>
      </div>
    `;
  }).join("");

  view.innerHTML = `
    <div class="sv-date">${formatDate(concert.date)}</div>
    <div class="sv-title">${concert.title}</div>
    <div class="sv-venue">${concert.venue}<span class="sv-count">· ${concert.setlist.length}곡</span></div>
    <div class="song-list">${rows}</div>
  `;
}

function renderAll() {
  renderYearNav();
  renderConcertList();
  renderSetlistView();
}

renderAll();
