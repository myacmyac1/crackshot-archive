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

// ---------- 곡 이름 정규화: 대소문자 무시 + 앞뒤 공백 무시 ----------
// 비교(같은 곡인지 판단)할 때만 사용하고, 화면에 보여줄 땐 원래 이름을 씁니다.
function normalizeSong(song) {
  return song.trim().toLowerCase();
}

function isUpcoming(song) {
  return normalizeSong(song) === "COMING SOON";
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

// ---------- 곡 수 라벨: Upcoming이 포함되어 있으면 "-", 아니면 "N곡" ----------
function getCountLabel(concert) {
  const hasUpcoming = concert.setlist.some(isUpcoming);
  return hasUpcoming ? "-" : `${concert.setlist.length}곡`;
}

// ---------- (포지션체인지), (solo) 같은 태그를 포인트 컬러로 강조 ----------
function highlightTags(songName) {
  return songName.replace(/\((포지션 체인지|solo)\)/gi, '<span class="song-tag">($1)</span>');
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
    const numberLabel = isUpcoming(song) ? "-" : String(i + 1).padStart(2, "0");

    let statsHtml;
    if (isUpcoming(song)) {
      statsHtml = `<div class="song-gap">-</div>`;
    } else {
      const days = getDaysSinceLastPlayed(song, concert.date);
      const gapText = days === null ? "첫 연주" : `${days}일만`;
      const gapClass = days === null ? "song-gap first" : "song-gap";
      const yearCount = getPlayCountThisYear(song, concert.date);
      const yearCountText = `${year}년 ${yearCount}번째`;
      statsHtml = `<div class="${gapClass}">${gapText}<span class="song-divider">|</span>${yearCountText}</div>`;
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
    ? `<a class="sv-photo-link" href="${concert.photoUrl}" target="_blank" rel="noopener noreferrer">사진 보기 ↗</a>`
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

renderAll();
