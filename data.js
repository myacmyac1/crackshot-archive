// ============================================
// CRACKSHOT 공연 데이터
// 새 공연을 추가하려면 이 배열 맨 위에
// { ... } 객체를 하나 복사해서 붙여넣고 내용만 바꾸면 됩니다.
//
// photoUrl은 선택 항목입니다.
// 구글 포토 앨범, 인스타그램 게시물, 네이버 카페 게시글 등
// 사진이 올라가 있는 외부 페이지의 링크(URL)를 넣으면 됩니다.
// 사진 링크가 없는 공연은 이 줄을 아예 빼면 됩니다.
// ============================================

const CONCERTS = [
  {
    id: "2026-05-10",
    date: "2026-05-10",
    title: "CRACKSHOT LIVE : IGNITION",
    venue: "홍대 롤링홀",
    photoUrl: "https://photos.app.goo.gl/example",
    setlist: [
      "Wildfire",
      "Ashes",
      "Reload",
      "Nightcall",
      "Static"
    ]
  },
  {
    id: "2025-11-22",
    date: "2025-11-22",
    title: "CRACKSHOT 단독공연 : AFTERGLOW",
    venue: "무브홀",
    setlist: [
      "Wildfire",
      "Nightcall",
      "Blueprint"
    ]
  },
  {
    id: "2025-08-03",
    date: "2025-08-03",
    title: "인디밴드 페스티벌 2025",
    venue: "잠실종합운동장 특설무대",
    setlist: [
      "Static",
      "Ashes",
      "Blueprint",
      "Wildfire"
    ]
  }
];

// ============================================
// SCHEDULE (선택 사항)
// 세트리스트가 없는 일정을 캘린더에만 표시하고 싶을 때 사용합니다.
// 예: 라디오 출연, 인터뷰, 게스트 출연, 휴식 공지 등
// title을 클릭하면 세트리스트 페이지로 가지 않고, memo 내용이 담긴 작은 창이 뜹니다.
// memo는 선택 항목이라 빼도 됩니다.
// ============================================

const SCHEDULE = [
  {
    date: "2026-06-15",
    title: "라디오 게스트 출연",
    memo: "MBC 라디오 <음악캠프> 게스트 출연 예정"
  }
];
