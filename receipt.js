// ============================================
// CRACKSHOT - 내 영수증 (결산)
// data.js의 CONCERTS를 그대로 읽어서 씁니다.
// ============================================

const concertsDesc = [...CONCERTS].sort((a, b) => new Date(b.date) - new Date(a.date));
const STORE_KEY = "crackshot-receipt-checked";

function normalizeSong(s) { return s.trim().toLowerCase(); }
function isUnknown(s) { return normalizeSong(s) === "coming soon"; }
function formatDate(d) { return d.replaceAll("-", "."); }
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function hasPending(c) { return c.setlist.some(isUnknown); }

// ---------- 체크 상태 (이 기기 브라우저에 저장) ----------
function loadChecked() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
    const valid = new Set(concertsDesc.filter(c => !hasPending(c)).map(c => String(c.id)));
    return new Set(raw.map(String).filter(id => valid.has(id)));
  } catch (e) { return new Set(); }
}
function saveChecked() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify([...checked])); } catch (e) {}
}
let checked = loadChecked();

// ---------- 공연 체크 목록 ----------
function renderChecks() {
  const box = document.getElementById("concertChecks");
  box.innerHTML = concertsDesc.map(c => {
    const pending = hasPending(c);
    const id = String(c.id);
    return `
      <label class="r-item${pending ? " pending" : ""}">
        <input type="checkbox" data-id="${esc(id)}" ${checked.has(id) ? "checked" : ""} ${pending ? "disabled" : ""}>
        <span class="r-box" aria-hidden="true"></span>
        <span class="r-date">${formatDate(c.date)}</span>
        <span class="r-info">
          <span class="r-title">${esc(c.title)}</span>
          <span class="r-venue">${esc(c.venue)}${pending ? " · 세트리스트 미정" : ""}</span>
        </span>
      </label>`;
  }).join("");
  updatePicked();
}

function updatePicked() {
  document.getElementById("pickedCount").textContent = `${checked.size}개 선택`;
  document.getElementById("makeReceipt").disabled = checked.size === 0;
}

document.getElementById("concertChecks").addEventListener("change", (e) => {
  const input = e.target.closest("input[type=checkbox]");
  if (!input) return;
  if (input.checked) checked.add(input.dataset.id); else checked.delete(input.dataset.id);
  saveChecked();
  updatePicked();
});
document.getElementById("selectAll").addEventListener("click", () => {
  concertsDesc.filter(c => !hasPending(c)).forEach(c => checked.add(String(c.id)));
  saveChecked(); renderChecks();
});
document.getElementById("clearAll").addEventListener("click", () => {
  checked.clear(); saveChecked(); renderChecks();
});

// ---------- 집계 ----------
function tally(selected) {
  const map = new Map(); // normalized -> {name, count}
  selected.forEach(c => {
    c.setlist.forEach(s => {
      if (isUnknown(s)) return;
      const key = normalizeSong(s);
      if (!map.has(key)) map.set(key, { name: s.trim(), count: 0 });
      map.get(key).count++;
    });
  });
  return [...map.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "ko"));
}

// //// 표기: 4개 + 가로선(5개 묶음)으로 세고, 남은 건 / 로 표시
function tallyMarks(n) {
  const groups = Math.floor(n / 5), rest = n % 5;
  let html = "";
  for (let i = 0; i < groups; i++) html += `<span class="tg">////</span> `;
  if (rest) html += `<span class="tr">${"/".repeat(rest)}</span>`;
  return html;
}

function highlightTags(name) {
  return name.replace(/\((포지션체인지|solo)\)/gi, '<span class="r-tag">($1)</span>');
}

// ---------- 영수증 ----------
function renderReceipt() {
  const selected = concertsDesc.filter(c => checked.has(String(c.id))).reverse(); // 오래된 순
  const rows = tally(selected);
  const totalPlays = rows.reduce((a, r) => a + r.count, 0);
  const today = new Date();
  const stamp = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;

  const concertLines = selected.map(c => `
    <div class="rc-line"><span class="rc-d">${formatDate(c.date)}</span><span class="rc-t">${esc(c.title)}</span></div>`).join("");

  const songLines = rows.map(r => `
    <div class="rc-song">
      <span class="rc-name">${highlightTags(esc(r.name))}</span>
      <span class="rc-tally">${tallyMarks(r.count)}</span>
      <span class="rc-qty">${r.count}</span>
    </div>`).join("");

  const top = rows[0];
  document.getElementById("receiptPaper").innerHTML = `
    <div class="rc-brand">CRACKSHOT</div>
    <div class="rc-kind">SETLIST RECEIPT</div>
    <div class="rc-meta"><span>${stamp}</span><span>${selected.length} SHOWS</span></div>
    <div class="rc-rule"></div>
    <div class="rc-sec">SHOWS</div>
    ${concertLines}
    <div class="rc-rule"></div>
    <div class="rc-cols"><span>SONG</span><span>QTY</span></div>
    <div class="rc-rule thin"></div>
    ${songLines || '<div class="rc-empty">연주된 곡이 없어요</div>'}
    <div class="rc-rule"></div>
    <div class="rc-sum"><span>SONGS</span><span>${rows.length}</span></div>
    <div class="rc-sum total"><span>TOTAL</span><span>${totalPlays}</span></div>
    ${top ? `<div class="rc-top">MOST HEARD · ${highlightTags(esc(top.name))} (${top.count})</div>` : ""}
    <div class="rc-rule"></div>
    <div class="rc-thanks">THANK YOU FOR COMING</div>
    <div class="rc-barcode" aria-hidden="true"></div>
  `;
}

// ---------- 화면 전환 ----------
function show(view) {
  document.getElementById("pickView").hidden = view !== "pick";
  document.getElementById("resultView").hidden = view !== "result";
  window.scrollTo(0, 0);
}
document.getElementById("makeReceipt").addEventListener("click", () => {
  renderReceipt(); show("result");
});
document.getElementById("backToPick").addEventListener("click", () => show("pick"));

// ---------- 이미지 저장 (html2canvas를 눌렀을 때만 불러옴) ----------
function loadScript(src) {
  return new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = src; s.onload = res; s.onerror = rej;
    document.head.appendChild(s);
  });
}
document.getElementById("saveImage").addEventListener("click", async () => {
  const note = document.getElementById("saveNote");
  note.textContent = "이미지 만드는 중…";
  try {
    if (!window.html2canvas) {
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
    }
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    const canvas = await window.html2canvas(document.getElementById("receiptPaper"), { scale: 2, backgroundColor: null });
    const a = document.createElement("a");
    a.download = "crackshot-receipt.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
    note.textContent = "";
  } catch (e) {
    note.textContent = "이미지 저장이 안 되면 화면을 캡처해서 저장해 주세요.";
  }
});

renderChecks();
show("pick");
