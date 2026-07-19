// ============================================
// CRACKSHOT 공연 데이터
// 새 공연을 추가하려면 이 배열 맨 위에
// { ... } 객체를 하나 복사해서 붙여넣고 내용만 바꾸면 됩니다.
// photoUrl은 선택 항목입니다.
// 구글 포토 앨범, 인스타그램 게시물, 네이버 카페 게시글 등
// 사진이 올라가 있는 외부 페이지의 링크(URL)를 넣으면 됩니다.
// 사진 링크가 없는 공연은 이 줄을 아예 빼면 됩니다.
// ============================================
// ============================================

const CONCERTS = [
  {
    id: "2026-07-31",
    date: "2026-07-31",
    title: "2026 장흥 ROCK 페스티벌",
    venue: "장흥 물축제",
    photoUrl: "https://www.instagram.com/crackshot_official/p/Dahx7oSE2qy/",
    setlist: [
      "COMING SOON"
    ]
  },
  {
    id: "2026-07-25",
    date: "2026-07-25",
    title: "HAIL TO THE KING",
    venue: "홍대 클럽FF",
    photoUrl: "https://www.instagram.com/crackshot_official/p/DaUmkb4E8bm/",
    setlist: [
      "COMING SOON"
    ]
  },
  {
    id: "2026-07-19",
    date: "2026-07-19",
    title: "STILL ROLLING Vol.4",
    venue: "홍대 BENDER",
    photoUrl: "https://www.instagram.com/crackshot_official/p/Da-cEPAgaUC/",
    setlist: [
      "Walking on Fire",
      "Young & Wild",
      "LOUD! HOT! CRAZY!",
      "Puppeteer",
      "Take it Down",
      "Suzie Q",
      "Rock and Roll",
      "INFP",
      "Follow me"
    ]
  },
  {
    id: "2026-07-10",
    date: "2026-07-10",
    title: "문래동 프리덤",
    venue: "문래 후케즈",
    photoUrl: "https://www.instagram.com/p/DanYcARgSuZ/?utm_source=ig_web_copy_link",
    setlist: [
      "Get Over",
      "LOUD! HOT! CRAZY!",
      "Puppeteer",
      "Bang Your Head",
      "Young & Wild",
      "INFP",
      "Follow Me",
      "Kickstart My Heart"
    ]
  },
  {
    id: "2026-06-27",
    date: "2026-06-27",
    title: "Live Club Day",
    venue: "홍대 클럽FF",
    photoUrl: "https://www.instagram.com/p/DaDf06LAfFn/?utm_source=ig_web_copy_link",
    setlist: [
      "Young & Wild",
      "Get Over",
      "DASH",
      "Puppeteer",
      "Take it down",
      "Shake It!",
      "INFP",
      "LOUD! HOT! CRAZY!",
      "Follow Me",
      "Paradise city"
    ]
  },
  {
    id: "2026-06-05",
    date: "2026-06-05",
    title: "크랙샷 X 더픽스 Our Target",
    venue: "홍대 웨스트브릿지",
    photoUrl: "https://www.instagram.com/p/DZO4GYDEcxg/?utm_source=ig_web_copy_link",
    setlist: [
      "Young & Wild",
      "Get Over",
      "LOUD! HOT! CRAZY!",
      "Warriors",
      "FIRE",
      "Time To Rise",
      "Shake It!",
      "Overdrive",
      "Bye Goodbye",
      "Follow Me",
      "INFP",
      "Don't Stop Believin",
      "Don't Look Back"
    ]
  },
  {
    id: "2026-04-25",
    date: "2026-04-25",
    title: "2026 Hero Rock Festival",
    venue: "마포 문화비축기지",
    photoUrl: "https://www.instagram.com/p/DXi0UCVkWqk/?utm_source=ig_web_copy_link",
    setlist: [
      "Go Away",
      "Young & Wild",
      "Get Over",
      "Overdrive",
      "LOUD! HOT! CRAZY!",
      "Shake It!",
      "INFP",
      "Follow Me"
    ]
  },
    {
    id: "2026-04-17",
    date: "2026-04-17",
    title: "2026 ONE HOUR 4월",
    venue: "부산 상상마당",
    photoUrl: "https://www.instagram.com/p/DXO7xQggeRL/?utm_source=ig_web_copy_link",
    setlist: [
      "Go Away",
      "Get Over",
      "Young & Wild",
      "Overdrive",
      "Midnight Crime",
      "Don't Close Your Eyes",
      "Time To Rise",
      "My Friend",
      "Shake It!",
      "Slow Motion",
      "INFP",
      "LOUD! HOT! CRAZY!",
      "Bye Goodbye",
      "Break Down",
      "Follow Me"
    ]
  },
  {
    id: "2026-03-13",
    date: "2026-03-13",
    title: "크랙샷 단독 콘서트 백열",
    venue: "홍대 웨스트브릿지",
    photoUrl: "https://www.instagram.com/p/DV1BEBDAdJe/?utm_source=ig_web_copy_link",
    setlist: [
      "Go Away",
      "DASH",
      "Get Over",
      "Young & Wild",
      "Shake It!",
      "Night Rider",
      "Overdrive",
      "Party! Party!",
      "Suzie Q",
      "Slow Motion",
      "Slither",
      "Warriors",
      "The Show Must Go On",
      "Time To Rise",
      "Goodbye My Love",
      "Take it Down",
      "INFP",
      "LOUD! HOT! CRAZY!",
      "Bye Goodbye",
      "Break Down",
      "Follow Me"
    ]
  },
  {
    id: "2026-01-17",
    date: "2026-01-17",
    title: "너트 30 페스티벌",
    venue: "홍대 상상마당",
    photoUrl: "https://www.instagram.com/p/DTnYkL1gXAU/?utm_source=ig_web_copy_link",
    setlist: [
      "LOUD! HOT! CRAZY!",
      "Young & Wild",
      "Overdrive",
      "Shake It!",
      "INFP",
      "Follow Me",
      "Party! Party!",
      "넌 내게 반했어"
    ]
  },
    {
    id: "2025-12-24",
    date: "2025-12-24",
    title: "크랙샷 팬 콘서트 Merry CRACKSHOW",
    venue: "엠팟홀",
    photoUrl: "https://www.instagram.com/p/DSpm3nogV2C/?utm_source=ig_web_copy_link",
    setlist: [
      "Get Over",
      "LOUD! HOT! CRAZY!",
      "Fly me to the moon",
      "Bye Goodbye",
      "INFP",
      "Party! Party!",
      "Follow Me",
      "Feliz Navidad",
      "All I want for christmas is you",
    ]
  },
  {
    id: "2025-11-29",
    date: "2025-11-29",
    title: "히어로 in 인제 구상나무 숲길 홍보 콘서트",
    venue: "인제 구상나무숲",
    photoUrl: "https://www.instagram.com/crackshot_official/p/DRoYOoAkaCo/",
    setlist: [
      "LOUD! HOT! CRAZY!",
      "Young & Wild",
      "DASH",
      "INFP",
      "Overdrive",
      "Follow Me",
    ]
  },
  {
    id: "2025-11-19",
    date: "2025-11-19",
    title: "경산 공감 락 페스티벌",
    venue: "천마아트센터 그랜드홀",
    photoUrl: "https://www.instagram.com/crackshot_official/p/DRPS4QiAYrl/",
    setlist: [
      "Bye Goodbye",
      "LOUD! HOT! CRAZY!",
      "Young & Wild",
      "Shake It!",
      "INFP",
      "Follow Me",
      "Overdrive",
    ]
  },
  {
    id: "2025-10-17",
    date: "2025-10-17",
    title: "광주 버스킹 월드컵 32강",
    venue: "광주 국립아시아문화전당 하늘마당",
    setlist: [
      "The Show Must Go On",
      "LOUD! HOT! CRAZY!",
      "난 괜찮아",
      "아파트"
    ]
  },
  {
    id: "2025-10-18",
    date: "2025-10-18",
    title: "광주 버스킹 월드컵 16강",
    venue: "광주 국립아시아문화전당 하늘마당",
    setlist: [
      "Warriors",
      "FIRE",
      "Young & Wild",
      "Overdrive"
    ]
  },
 {
    id: "2025-10-19",
    date: "2025-10-19",
    title: "광주 버스킹 월드컵 결선",
    venue: "광주 국립아시아문화전당 하늘마당",
    setlist: [
      "Skyfall",
      "INFP"
    ]
 },
  {
    id: "2025-09-27",
    date: "2025-09-27",
    title: "양천 락 페스티벌",
    venue: "양천 신월야구장",
    setlist: [
      "Overdrive",
      "Young & Wild",
      "LOUD! HOT! CRAZY!",
      "INFP",
      "Follow Me",
    ]
  },
  {
    id: "2025-09-13",
    date: "2025-09-13",
    title: "사운드 플래닛 페스티벌 2025",
    venue: "인천 파라다이스시티",
    photoUrl: "https://www.instagram.com/crackshot_official/p/DOiN1tAEZon/",
    setlist: [
      "LOUD! HOT! CRAZY!",
      "Young & Wild",
      "Shake It!",
      "Go Away",
      "Overdrive",
      "Slow Motion",
      "INFP",
      "Follow Me",
    ]
  },
  {
    id: "2025-09-10",
    date: "2025-09-10",
    title: "뒤란",
    venue: "울산 문화예술회관 야외공연장",
    photoUrl: "https://www.instagram.com/crackshot_official/p/DObIrAygV6X/",
    setlist: [
      "Overdrive",
      "Get Over",
      "아파트",
      "LOUD! HOT! CRAZY!",
      "난 괜찮아",
    ]
  },
  {
    id: "2025-09-07",
    date: "2025-09-07",
    title: "2025 렛츠락 페스티벌",
    venue: "난지 한강공원",
    photoUrl: "https://www.instagram.com/crackshot_official/p/DOSrVupkeIU/",
    setlist: [
      "LOUD! HOT! CRAZY!",
      "Young & Wild",
      "DASH",
      "Get Over",
      "Overdrive",
      "Shake It!",
      "INFP",
      "Follow Me",
    ]
  },
  {
    id: "2025-09-06",
    date: "2025-09-06",
    title: "2025 라이징스타를 찾아라 콘서트",
    venue: "동탄 복합문화센터 야외공연장",
    photoUrl: "https://www.instagram.com/crackshot_official/p/DOQsRlNAXFw/",
    setlist: [
      "Overdrive",
      "Young & Wild",
      "INFP",
      "LOUD! HOT! CRAZY!",
      "Follow Me",
      "DASH",
    ]
  },
  {
    id: "2025-08-22",
    date: "2025-08-22",
    title: "서초 금요음악회 밴드 페스티벌 Rock The Night",
    venue: "서초 문화예술회관",
    photoUrl: "https://www.instagram.com/crackshot_official/p/DNqGBPMhwIE/",
    setlist: [
      "Young & Wild",
      "DASH",
      "Get Over",
      "아파트",
      "예술이야",
      "난 괜찮아",
      "Shake It!",
      "INFP",
      "Skyfall",
      "Oops I did it again",
      "Still loving you",
      "Dream On",
      "그대에게 + 붉은노을 + 여행을떠나요",
      "LOUD! HOT! CRAZY!",
      "Follow Me",
    ]
  },
  {
    id: "2025-08-16",
    date: "2025-08-16",
    title: "거제 한화오션 오션하모니",
    venue: "거제 옥포수변공원",
    photoUrl: "https://www.instagram.com/crackshot_official/p/DNajkm_ho-g/",
    setlist: [
      "아파트",
      "Go Away",
      "FIRE",
      "난 괜찮아",
      "INFP",
      "Follow Me",
      "달의 몰락",
    ]
  },
  {
    id: "2025-07-31",
    date: "2025-07-31",
    title: "2025 장흥 물 축제 락 페스티벌",
    venue: "장흥 물 축제",
    photoUrl: "https://www.instagram.com/crackshot_official/p/DMzzKrkBHkI/",
    setlist: [
      "Young & Wild",
      "난 괜찮아",
      "아파트",
      "Break Down",
      "그대에게 + 붉은노을 + 여행을떠나요",
      "INFP",
      "Follow Me",
      "DASH",
      "Overdrive",
    ]
  },
  {
    id: "2025-07-12",
    date: "2025-07-12",
    title: "포항 락메탈 경연대회",
    venue: "포항 영일대 해수욕장",
    photoUrl: "https://www.instagram.com/crackshot_official/p/DMAnIxZBKTk/",
    setlist: [
      "Young & Wild",
      "DASH",
      "Get Over",
      "그대에게 + 붉은노을 + 여행을떠나요",
      "INFP",
      "Go Away",
      "Overdrive",
      "Follow Me",
    ]
  },
  {
    id: "2025-07-11",
    date: "2025-07-11",
    title: "We Are Crackshot vol.5",
    venue: "홍대 웨스트브릿지",
    photoUrl: "https://www.instagram.com/crackshot_official/p/DL-VcG9h1qG/",
    setlist: [
      "무녀도",
      "Time To Rise",
      "Going Under",
      "Drowning",
      "Walking on Fire",
      "Midnight Crime",
      "Abracadabra",
      "Let Me Out",
      "Skyfall",
      "Oops I did it again",
      "Warriors",
      "FIRE",
      "Deep Inside",
      "Get Over",
      "Young & Wild",
      "Night Rider",
      "Go Away",
      "LOUD! HOT! CRAZY!",
      "Radioactive",
      "DASH",
      "Follow Me",
    ]
  },
  {
    id: "2025-06-14",
    date: "2025-06-14",
    title: "2025 MMC",
    venue: "영등포아트홀",
    photoUrl: "https://www.instagram.com/crackshot_official/p/DK4rYjdBCdi/",
    setlist: [
      "Walking on Fire",
      "Young & Wild",
      "Night Rider",
      "Shake It!",
      "Get Over",
      "Time To Rise",
      "Break Down",
      "Overdrive",
      "DASH",
      "INFP",
      "Follow Me",
    ]
  },
  {
    id: "2025-04-26",
    date: "2025-04-26",
    title: "라이엇키즈 10주년 The Kidz Are Alright",
    venue: "홍대 웨스트브릿지",
    photoUrl: "https://www.instagram.com/crackshot_official/p/DI6Pu7DBJJl/",
    setlist: [
      "Time To Rise",
      "DASH",
      "Young & Wild",
      "Get Over",
      "Overdrive",
      "Follow Me",
    ]
  },
  {
    id: "2025-04-12",
    date: "2025-04-12",
    title: "군산 청소년 꿈애축제",
    venue: "군산 은파호수공원",
    photoUrl: "https://www.instagram.com/crackshot_official/p/DIWDU3chq_E/",
    setlist: [
      "FIRE",
      "Get Over",
      "INFP",
      "Follow Me",
    ]
  },
  {
    id: "2025-04-05",
    date: "2025-04-05",
    title: "클럽투어 GET OVER - 서울",
    venue: "홍대 프리버드",
    photoUrl: "https://www.instagram.com/crackshot_official/p/DIEMhK9BlhI/",
    setlist: [
      "Weekly Medley",
      "Young & Wild",
      "Night Rider",
      "DASH",
      "Walking on Fire",
      "World on Fire",
      "Go Away",
      "Shake It!",
      "INFP",
      "Time To Rise",
      "Faint",
      "Break Down",
      "Get Over",
      "Immigrant Song + Whole Lotta Love + Rock and Roll",
      "Overdrive",
      "Have a nice day",
      "Paradise City",
      "Follow Me",
    ]
  },
  {
    id: "2025-03-30",
    date: "2025-03-30",
    title: "클럽투어 GET OVER - 대전",
    venue: "대전 인터플레이",
    photoUrl: "https://www.instagram.com/crackshot_official/p/DH0sJ_cBlnP/",
    setlist: [
      "We will rock you",
      "Young & Wild",
      "Night Rider",
      "DASH",
      "Walking on Fire",
      "Shout at the Devil",
      "Go Away",
      "Slow Motion",
      "INFP",
      "Don't Close Your Eyes",
      "Faint",
      "Break Down",
      "Get Over",
      "You could be mine",
      "Overdrive",
      "Kickstart my Heart",
      "Follow Me",
    ]
  },
  {
    id: "2025-03-29",
    date: "2025-03-29",
    title: "클럽투어 GET OVER - 광주",
    venue: "광주 보헤미안",
    photoUrl: "https://www.instagram.com/crackshot_official/p/DHyGinzhEpV/",
    setlist: [
      "We will rock you",
      "Young & Wild",
      "Night Rider",
      "DASH",
      "Walking on Fire",
      "Youth gone wild",
      "Go Away",
      "Shake It!",
      "INFP",
      "Don't Close Your Eyes",
      "Faint",
      "Break Down",
      "Get Over",
      "Immigrant Song + Whole Lotta Love + Rock and Roll",
      "Overdrive",
      "Slither",
      "Follow Me",
    ]
  },
  {
    id: "2025-03-23",
    date: "2025-03-23",
    title: "클럽투어 GET OVER - 대구",
    venue: "대구 클럽헤비",
    photoUrl: "https://www.instagram.com/crackshot_official/p/DHipDF2hA_h/",
    setlist: [
      "Young & Wild",
      "Night Rider",
      "DASH",
      "Ready to Fire",
      "You give love a bad name",
      "Go Away",
      "Shake It!",
      "INFP",
      "My Friend",
      "Shine",
      "Break Down",
      "Get Over",
      "Party! Party!",
      "Suzie Q",
      "Overdrive",
      "난 괜찮아",
      "Follow Me",
    ]
  },
  {
    id: "2025-03-22",
    date: "2025-03-22",
    title: "클럽투어 GET OVER - 부산",
    venue: "부산 바이닐 언더그라운드",
    photoUrl: "https://www.instagram.com/crackshot_official/p/DHgH59ehoGe/",
    setlist: [
      "Young & Wild",
      "Night Rider",
      "DASH",
      "Walking on Fire",
      "Wild Side",
      "Go Away",
      "Shake It!",
      "INFP",
      "My Friend",
      "Shine",
      "Break Down",
      "Get Over",
      "World on Fire",
      "Overdrive",
      "Paradise City",
      "Follow Me",
    ]
  },
  {
    id: "2025-02-21",
    date: "2025-02-21",
    title: "We Are Crackshot vol.4",
    venue: "CKL 스테이지",
    photoUrl: "https://www.instagram.com/crackshot_official/p/DGVkzY2BTtX/",
    setlist: [
      "Walking on Fire",
      "Young & Wild",
      "Night Rider",
      "DASH",
      "Shake It!",
      "INFP",
      "Slow Motion",
      "Dream On",
      "Warriors",
      "Faithfully",
      "Home Sweet Home",
      "Go Away",
      "The Greatest Show",
      "Break Down",
      "Get Over",
      "Overdrive",
      "무녀도",
      "Follow Me",
    ]
  },
  {
    id: "2025-02-10",
    date: "2025-02-10",
    title: "불후의 명곡 윤수일편",
    venue: "KBS 신관",
    photoUrl: "https://www.instagram.com/crackshot_official/p/DGX3MhVhpLY/",
    setlist: [
      "아파트"
    ]
  },
  {
    id: "2025-01-05",
    date: "2025-01-05",
    title: "롤링홀 30주년 기념공연 CRACKSHOT",
    venue: "홍대 롤링홀",
    photoUrl: "https://www.instagram.com/crackshot_official/p/DEcYjHKhH4a/",
    setlist: [
      "Young & Wild",
      "Night Rider",
      "DASH",
      "Midnight Crime",
      "Shake It!",
      "INFP",
      "Slow Motion",
      "You",
      "Dream On",
      "Warriors",
      "Time To Rise",
      "Go Away",
      "난 괜찮아",
      "Break Down",
      "Party! Party!",
      "Suzie Q",
      "Overdrive",
      "Slither",
      "Bye Goodbye",
      "Follow Me",
    ]
  },

{
    id: "2024-11-23",
    date: "2024-11-23",
    title: "SUDDENLY ROCK FESTA",
    venue: "고양아람누리 아람극장",
    photoUrl: "https://www.instagram.com/crackshot_official/p/DCtn0UKhMN_/",

    setlist: [
      "Warriors",
      "Go Away",
      "Young & Wild",
      "Shake It!",
      "YOU",
      "INFP",
      "Slow Motion",
      "달의 몰락",
      "Follow Me"
    ]
},

{
    id: "2024-10-20",
    date: "2024-10-20",
    title: "정관 생태하천 학습문화축제",
    venue: "기장군 정관",
    photoUrl: "https://www.instagram.com/crackshot_official/p/DBWJNDsy-dU/",

    setlist: [
      "난 괜찮아",
      "Young & Wild",
      "INFP",
      "그대에게 + 붉은노을 + 여행을떠나요",
      "Go Away",
      "Follow Me"
    ]
},

{
    id: "2024-10-13",
    date: "2024-10-13",
    title: "경기 인디 뮤직 페스티벌",
    venue: "파주 임진각",
    photoUrl: "https://www.instagram.com/crackshot_official/p/DBD13FQyqdA/",

    setlist: [
      "Night Rider",
      "Go Away",
      "Break Down",
      "Young & Wild",
      "Follow Me"
    ]
},

{
    id: "2024-10-12",
    date: "2024-10-12",
    title: "인천 레코드 플랫폼 쇼케이스",
    venue: "인천아트플랫폼",
    photoUrl: "https://www.instagram.com/crackshot_official/p/DBBfBJ0yCvg/",

    setlist: [
      "FIRE",
      "Young & Wild",
      "달의 몰락",
      "Go Away",
      "Follow Me"
    ]
},

{
    id: "2024-08-28",
    date: "2024-08-28",
    title: "뒤란 (순서수정필요)",
    venue: "울산 문화예술회",
    photoUrl: "https://www.instagram.com/crackshot_official/p/C_N3tViS4hT/",

    setlist: [
      "INFP",
      "Go Away",
      "Young & Wild",
      "Follow Me",
      "예술이야"
    ]
},

{
    id: "2024-08-27",
    date: "2024-08-27",
    title: "라라라온",
    venue: "홍대 상상마당",
    photoUrl: "https://www.instagram.com/crackshot_official/p/C_LQ3FGSMqM/",

    setlist: [
      "Night Rider",
      "DASH",
      "INFP",
      "Go Away",
      "Young & Wild",
      "Follow Me"
    ]
},

{
    id: "2024-08-10",
    date: "2024-08-10",
    title: "JUMF 2024",
    venue: "전주종합경기장",
    photoUrl: "https://www.instagram.com/crackshot_official/p/C-fGgEKysQX/",

    setlist: [
      "Night Rider",
      "난 괜찮아",
      "Young & Wild",
      "INFP",
      "예술이야",
      "Go Away",
      "Follow Me"
    ]
},

{
    id: "2024-08-02",
    date: "2024-08-02",
    title: "보령 머드락 페스타",
    venue: "대천해수욕장",
    photoUrl: "https://www.instagram.com/crackshot_official/p/C-KlKaCyb2Q/",

    setlist: [
      "DASH",
      "INFP",
      "Go Away",
      "예술이야",
      "그대에게 + 붉은노을 + 여행을떠나요",
      "Follow Me"
    ]
},

{
    id: "2024-07-28",
    date: "2024-07-28",
    title: "크랙샷 앨범 발매 기념 공연 충돌",
    venue: "홍대 롤링홀",
    photoUrl: "https://www.instagram.com/crackshot_official/p/C99xPWxSlH9/",

    setlist: [
      "Night Rider",
      "DASH",
      "Shake It!",
      "Never Say You Loved Me",
      "Midnight Crime",
      "Fade Away",
      "My Friend",
      "Dream In The Mirror",
      "Broken Love",
      "Break Down",
      "Young & Wild",
      "Slow Motion",
      "INFP",
      "Party! Party!",
      "Go Away",
      "Overdrive",
      "Bye Goodbye",
      "Time To Rise",
      "Follow Me"
    ]
},

{
    id: "2024-07-06",
    date: "2024-07-06",
    title: "240706 We Are Crackshot vol.3",
    venue: "꿈빛극장",
    photoUrl: "https://www.instagram.com/crackshot_official/p/C9FMb2kyJ72/",

    setlist: [
      "Walking on Fire",
      "DASH",
      "Shake It!",
      "Dream On",
      "FIRE",
      "Any Way You Want It",
      "Slow Motion",
      "INFP",
      "예술이야",
      "Somewhere only we know (포지션체인지)",
      "Break Down",
      "Party! Party!",
      "Suzie Q",
      "Time To Rise",
      "난 괜찮아",
      "Bye Goodbye",
      "Overdrive",
      "Kickstart My Heart",
      "Follow Me"
    ]
},

  {
    id: "2024-06-22",
    date: "2024-06-22",
    title: "도시 음악을 기록하다 ROCK WILL NEVER DIE",
    venue: "부평 아트센",
    photoUrl: "https://www.instagram.com/crackshot_official/p/C8g35zRShu5/",

    setlist: [
      "Warriors",
      "DASH",
      "Shake It!",
      "난 괜찮아",
      "Follow Me"
    ]
},
  
{
    id: "2024-06-24",
    date: "2024-06-24",
    title: "불후의 명곡 싸이편",
    venue: "KBS 신관",
    photoUrl: "https://www.instagram.com/crackshot_official/p/C8zBIxty4Hx/",

    setlist: [
      "예술이야"
    ]
},

{
    id: "2024-06-02",
    date: "2024-06-02",
    title: "화성 뱃놀이 축제",
    venue: "전곡항",
    photoUrl: "https://www.instagram.com/crackshot_official/p/C7tXtW_JxBQ/",

    setlist: [
      "난 괜찮아",
      "DASH",
      "Follow Me"
    ]
},

{
    id: "2024-05-25",
    date: "2024-05-25",
    title: "경주 EDM 페스티벌",
    venue: "봉황대 광장",
    photoUrl: "https://www.instagram.com/crackshot_official/p/C7Y9KavpZsi/",

    setlist: [
      "난 괜찮아",
      "DASH",
      "INFP",
      "Break Down",
      "Overdrive",
      "Follow Me",
      "달의 몰락"
    ]
},

{
    id: "2024-05-14",
    date: "2024-05-14",
    title: "남원 춘향제 판락페스티벌 ",
    venue: "요천로",
    photoUrl: "https://www.instagram.com/crackshot_official/p/C68wiRAJFUp/",

    setlist: [
      "난 괜찮아",
      "DASH",
      "Slow Motion",
      "INFP",
      "그대에게 + 붉은노을 + 여행을떠나요",
      "Follow Me"
    ]
},

{
    id: "2024-05-10",
    date: "2024-05-10",
    title: "We Are Crackshot vol.2",
    venue: "웨스트브릿지",
    photoUrl: " https://www.instagram.com/crackshot_official/p/C6yq4UPJm64/",

    setlist: [
      "DASH ",
      "Walking on Fire",
      "Shake It! ",
      "INFP",
      "Midnight Crime",
      "Warriors  ",
      "Let Me Out",
      "You give love a bad name",
      "Slow Motion ",
      "Party! Party!",
      "Fade Away",
      "Break Down",
      "The Pretender (포지션체인지)",
      "Young & Wild",
      "Bye Goodbye ",
      "Overdrive",
      "난 괜찮아 ",
      "Follow Me"
    ]
},

{
    id: "2024-01-30",
    date: "2024-01-30",
    title: "경록절 로큰롤 파라다이스",
    venue: "파라다이스 시티",
    photoUrl: "https://www.instagram.com/crackshot_official/p/C2uagXwMCo9/",

    setlist: [
      "DASH",
      "INFP",
      "Warriors",
      "Overdrive",
      "Paradise City",
      "Follow Me",
      "달의 몰락"
    ]
},

{
    id: "2024-01-20",
    date: "2024-01-20",
    title: "We Are Crackshot vol.1",
    venue: "홍대 롤링홀",
    photoUrl: "https://www.instagram.com/crackshot_official/p/C2UfwlHpsxW/",

    setlist: [
      "Time To Rise ",
      "DASH ",
      "Shake It!",
      "Warriors ",
      "무녀도 ",
      "Midnight Crime",
      "Metalingus",
      "계절의 끝에서 ",
      "Goodbye My Love",
      "Somebody Save Me (포지션체인지)",
      "Break Down ",
      "INFP ",
      "Slow Motion",
      "FIRE",
      "난 괜찮아 ",
      "Bye Goodbye ",
      "Overdrive",
      "完全感覚 Dreamer",
      "Follow Me",
      "Home Sweet Home"
    ]
},

{
    id: "2023-12-24",
    date: "2023-12-24",
    title: "크랙샷 팬미팅 MERRY CRACKS-MAS",
    venue: "벨로주 망원",
    photoUrl: "https://www.instagram.com/crackshot_official/p/C1PDwyMpWDc/",

    setlist: [
      "Rockin' Around The Christmas Tree",
      "계절의 끝에서"
    ]
},

{
    id: "2023-12-17",
    date: "2023-12-17",
    title: "HERO 2023",
    venue: "프리즘홀",
    photoUrl: "https://www.instagram.com/crackshot_official/p/C084lXNJsmY/",

    setlist: [
      "Time To Rise",
      "DASH",
      "INFP",
      "Warriors",
      "Overdrive",
      "Follow Me",
      "Slither"
    ]
},

{
    id: "2023-11-23",
    date: "2023-11-23",
    title: "씬디 프레젠트",
    venue: "프리즘홀",
    photoUrl: "https://www.instagram.com/crackshot_official/p/Cz_qOTEpbh6/",

    setlist: [
      "Time To Rise",
      "Shake It!",
      "INFP",
      "무녀도",
      "Overdrive",
      "Follow Me",
      "Slither",
      "Suzie Q",
      "Jailhouse Rock"
    ]
},

{
    id: "2023-10-28",
    date: "2023-10-28",
    title: "문경 락 앤 소울푸드 페스티벌",
    venue: "영강체육공원",
    photoUrl: "https://www.instagram.com/crackshot_official/p/Cy8bIwopkyE/",

    setlist: [
      "난 괜찮아",
      "Slow Motion",
      "INFP",
      "Hotel California",
      "Follow Me",
      "그대에게 + 붉은노을 + 여행을떠나요"
    ]
},

{
    id: "2023-10-19",
    date: "2023-10-19",
    title: "광주 그라제 Rising Bullet",
    venue: "광주 예술의전당",
    photoUrl: "https://www.instagram.com/crackshot_official/p/CylUUcaROcN/ ",

    setlist: [
      "Shake It!",
      "DASH",
      "Warriors",
      "Time To Rise",
      "My Friend ",
      "Separate Ways",
      "Slow Motion",
      "INFP",
      "Break Down ",
      "난 괜찮아",
      "그대에게 + 붉은노을 + 여행을떠나요",
      "Follow Me",
      "Overdrive ",
      "Kickstart My Heart"
    ]
},

{
    id: "2023-10-15",
    date: "2023-10-15",
    title: "2023 경기 인디 뮤직 페스티벌",
    venue: "안산 와~스타디움",
    photoUrl: "https://www.instagram.com/crackshot_official/p/CyaouNaJTON/",

    setlist: [
      "Warriors",
      "FIRE",
      "Break Down",
      "Time To Rise",
      "INFP",
      "Overdrive",
      "Follow Me"
    ]
},

{
    id: "2023-10-14",
    date: "2023-10-14",
    title: "크랙샷 10주년 공연 A Live Bullet 막공",
    venue: "고양문화재단",
    photoUrl: "https://www.instagram.com/crackshot_official/p/CyYUqS4JIrC/",

    setlist: [
      "DASH ",
      "Shake It!",
      "Fellowship",
      "Plug In Baby",
      "FIRE",
      "Lost Memories",
      "Break Down",
      "Walking on Fire",
      "Don't Close Your Eyes",
      "난 괜찮아 ",
      "Time To Rise",
      "Warriors",
      "INFP",
      "Bye Goodbye",
      "Overdrive",
      "Separate Ways",
      "Follow Me"
    ]
},

{
    id: "2023-10-13",
    date: "2023-10-13",
    title: "크랙샷 10주년 공연 A Live Bullet 첫공",
    venue: "고양문화재단",
    photoUrl: "https://www.instagram.com/crackshot_official/p/CyV7l9qJVQj/",

    setlist: [
      "Let Me Out",
      "FIRE",
      "Midnight Crime",
      "Uprising",
      "Shake It!",
      "Slow Motion ",
      "My Friend",
      "Ready to Fire ",
      "Break Down",
      "Warriors ",
      "INFP",
      "Bye Goodbye",
      "Overdrive",
      "달의 몰락 ",
      "Time To Rise",
      "Kickstart My Heart",
      "Follow Me"
    ]
},

{
    id: "2023-10-07",
    date: "2023-10-07",
    title: "해남 오시아노 뮤직 페스타",
    venue: "해남 오시아노 캠핑장",
    photoUrl: "https://www.instagram.com/crackshot_official/p/CyGQdIZJPeP/",

    setlist: [
      "Shake It!",
      "난 괜찮아",
      "Time To Rise",
      "INFP",
      "그대에게 + 붉은노을 + 여행을떠나요",
      "Follow Me"
    ]
},

{
    id: "2023-09-02",
    date: "2023-09-02",
    title: "2023 렛츠락 페스티벌",
    venue: "난지한강공원",
    photoUrl: "https://www.instagram.com/crackshot_official/p/CwrvbUAJ_IO/",

    setlist: [
      "DASH",
      "INFP",
      "Time To Rise",
      "Overdrive",
      "Bye Goodbye",
      "Follow Me"
    ]
},

{
    id: "2023-08-25",
    date: "2023-08-25",
    title: "동두천 락 페스티벌",
    venue: "소요산입구 광장 특설무대",
    photoUrl: "https://www.instagram.com/crackshot_official/p/CwXehqRppk2/",

    setlist: [
      "Overdrive",
      "INFP",
      "난 괜찮아",
      "Break Down",
      "Follow Me",
      "DASH "
    ]
},

{
    id: "2023-08-15",
    date: "2023-08-15",
    title: "815 Seoul, My Soul",
    venue: "광화문 육조마당",
    photoUrl: "https://www.instagram.com/crackshot_official/p/Cv98DmLprdE/",

    setlist: [
      "Warriors",
      "INFP",
      "Follow Me"
    ]
},

{
    id: "2023-08-05",
    date: "2023-08-05",
    title: "철원 다슬기축제 칼군무 경연대회",
    venue: "화강 쉬리공원",
    photoUrl: "https://www.instagram.com/crackshot_official/p/CvkGPC4pvfI/",

    setlist: [
      "달의 몰락",
      "DASH",
      "INFP",
      "그대에게 + 붉은노을 + 여행을떠나요",
      "Follow Me",
      "잘못된 만남"
    ]
},

{
    id: "2023-08-04",
    date: "2023-08-04",
    title: "보령 머드축제 머드나잇스탠드 (순서수정필요)",
    venue: "대천해수욕장",
    photoUrl: "https://www.instagram.com/crackshot_official/p/CvhcKmTpgqq/",

    setlist: [
      "난 괜찮아",
      "Follow Me",
      "잘못된 만남",
      "그대에게 + 붉은노을 + 여행을떠나요",
      "DASH",
      "INFP"
    ]
},

{
    id: "2023-06-18",
    date: "2023-06-18",
    title: "로맨틱파티",
    venue: "웨스트브릿지",
    photoUrl: "https://www.instagram.com/crackshot_official/p/CtqEgc8pSyQ/",

    setlist: [
      "Warriors",
      "Shake It!",
      "INFP",
      "Overdrive",
      "Follow Me"
    ]
},

{
    id: "2023-06-09",
    date: "2023-06-09",
    title: "Speak Out",
    venue: "홍대 롤링홀",
    photoUrl: "https://www.instagram.com/crackshot_official/p/CtSzXmopVVK/",

    setlist: [
      "Break Down ",
      "Walking on Fire",
      "DASH",
      "Shake It! ",
      "Slow Motion",
      "Don't Close Your Eyes ",
      "Fellowship",
      "Goodbye My Love",
      "Eye For An Eye",
      "달의 몰락",
      "Immigrant Song + Whole Lotta Love + Rock and Roll",
      "Tomorrow",
      "Warriors",
      "INFP",
      "Party! Party! ",
      "Suzie Q",
      "난 괜찮아 ",
      "Slither",
      "Overdrive",
      "Separate Ways",
      "Follow Me"
    ]
},

{
    id: "2023-04-26",
    date: "2023-04-26",
    title: "뒤란 (순서수정필요)",
    venue: "울산 문화예술회관",
    photoUrl: "https://www.instagram.com/crackshot_official/p/CrgI2JYJwDx/",

    setlist: [
      "Goodbye My Love ",
      "INFP",
      "난 괜찮아",
      "Follow Me",
      "달의 몰락"
    ]
},

{
    id: "2023-04-09",
    date: "2023-04-09",
    title: "경기도청 봄꽃축제",
    venue: "경기도구청사",
    photoUrl: "https://www.instagram.com/crackshot_official/p/Cqz62lsphSc/",

    setlist: [
      "난 괜찮아",
      "Shake It! ",
      "Slow Motion",
      "Overdrive",
      "달의 몰락",
      "Follow Me",
      "잘못된 만남"
    ]
},

{
    id: "2023-03-25",
    date: "2023-03-25",
    title: "크랙샷 전국 투어 HELLO MY LOVE - 전주",
    venue: "더뮤지션",
    photoUrl: "https://www.instagram.com/crackshot_official/p/CqNz211JzQm/",

    setlist: [
      "DASH ",
      "Shake It! ",
      "Vision Again",
      "Midnight Crime ",
      "달의 몰락",
      "Goodbye My Love",
      "Fade Away",
      "Stay - Willy (solo)",
      "Michael Jackson Medley",
      "Slow Motion",
      "난 괜찮아",
      "Break Down",
      "Overdrive",
      "INFP",
      "Follow Me",
      "Daddy, Brother, Lover, Little boy",
      "Paradise City"
    ]
},

{
    id: "2023-03-19",
    date: "2023-03-19",
    title: "크랙샷 전국 투어 HELLO MY LOVE - 대구",
    venue: "클럽 헤비",
    photoUrl: "https://www.instagram.com/crackshot_official/p/CqNz211JzQm/",

    setlist: [
      "DASH ",
      "Ready to Fire ",
      "Shake It!",
      "Walking on Fire ",
      "달의 몰락",
      "Goodbye My Love",
      "My Friend ",
      "Unholy - CYAN (solo)",
      "Suzie Q ",
      "Party! Party!",
      "Slow Motion ",
      "난 괜찮아",
      "Break Down",
      "Overdrive",
      "INFP",
      "Follow Me",
      "Separate Ways",
      "Kickstart My Heart"
    ]
},

{
    id: "2023-03-18",
    date: "2023-03-18",
    title: "크랙샷 전국 투어 HELLO MY LOVE - 부산",
    venue: "부산 상상마당",
    photoUrl: "https://www.instagram.com/crackshot_official/p/CqNz211JzQm/",

    setlist: [
      "DASH ",
      "Ready to Fire ",
      "Shake It!",
      "Midnight Crime",
      "달의 몰락 ",
      "Goodbye My Love",
      "Fellowship",
      "Danny (solo)",
      "Michael Jackson Medley",
      "Slow Motion ",
      "난 괜찮아",
      "Break Down",
      "Overdrive",
      "INFP",
      "Follow Me",
      "Still loving you",
      "Welcome to the jungle"
    ]
},

{
    id: "2023-03-11",
    date: "2023-03-11",
    title: "크랙샷 전국 투어 HELLO MY LOVE - 서울",
    venue: "홍대 롤링홀",
    photoUrl: "https://www.instagram.com/crackshot_official/p/CprsUNgJMFK/",

    setlist: [
      "DASH ",
      "Ready to Fire ",
      "Shake It!",
      "Walking on Fire ",
      "달의 몰락",
      "Goodbye My Love",
      "Fade Away",
      "Watch Over You - Vincent (solo)",
      "Suzie Q ",
      "Party! Party!",
      "Slow Motion ",
      "Break Down ",
      "Overdrive",
      "난 괜찮아",
      "Follow Me",
      "INFP",
      "Slither",
      "Butterfly"
    ]
},

{
    id: "2023-02-12",
    date: "2023-02-12",
    title: "2023 경록절 마포르네상스",
    venue: "마포아트센터",
    photoUrl: "https://www.instagram.com/crackshot_official/p/CojjxT7pgcb/",

    setlist: [
      "Shake It!",
      "Slow Motion",
      "난 괜찮아",
      "Overdrive",
      "Follow Me"
    ]
},

{
    id: "2022-12-30",
    date: "2022-12-30",
    title: "2022 크랙샷 연말 콘서트 RELOAD",
    venue: "구름아래소극장",
    photoUrl: "https://www.instagram.com/crackshot_official/p/CmzC8Jop77O/",

    setlist: [
      "Shake It!",
      "Vision Again",
      "Walking on Fire ",
      "Fellowship",
      "Let Me Out",
      "Goodbye My Love",
      "계절의 끝에서 ",
      "Fade Away ",
      "My Friend ",
      "Butterfly",
      "Fake Plastic Trees - CYAN (solo)",
      "One Day - Willy (solo)",
      "Danny (solo)",
      "Out of my way",
      "Break Down ",
      "Slow Motion ",
      "달의 몰락",
      "DASH ",
      "Overdrive",
      "Follow Me",
      "Slither ",
      "난 괜찮아"
    ]
},

{
    id: "2022-11-26",
    date: "2022-11-26",
    title: "Live Club Day",
    venue: "홍대 클럽FF",
    photoUrl: "https://www.instagram.com/crackshot_official/p/ClbUknkJdEE/",

    setlist: [
      "Midnight Crime ",
      "Shake It!",
      "Slow Motion ",
      "Never Say You Loved Me",
      "달의 몰락 ",
      "Party! Party! ",
      "Follow Me",
      "난 괜찮아"
    ]
},

{
    id: "2022-10-30",
    date: "2022-10-30",
    title: "Danny's HALLOKITTY (순서수정필요)",
    venue: "웨스트브릿지",
    photoUrl: " ",

    setlist: [
      "Michael Jackson Medley",
      "Let Me Out",
      "난 괜찮아",
      "Toxic",
      "Follow Me",
      "계절의 끝에서",
      "Don't Close Your Eyes ",
      "안녕 스무살",
      "Midnight Crime",
      "Immigrant Song + Whole Lotta Love + Rock and Roll",
      "Daddy, Brother, Lover, Little Boy ",
      "Slow Motion",
      "주문 MIROTIC ",
      "Sweet Dreams",
      "Shake It! ",
      "Break Down"
    ]
},

{
    id: "2022-10-06",
    date: "2022-10-06",
    title: "계명문화대학교 축제",
    venue: "계명문화대학교",
    photoUrl: "https://www.instagram.com/crackshot_official/p/CjX9L9dpdfN/",

    setlist: [
      "Shake It! ",
      "Sweet Child O' Mine",
      "Break Down",
      "Slow Motion",
      "달의 몰락",
      "Toxic",
      "난 괜찮아",
      "Follow Me",
      "Shut Up And Dance"
    ]
},

{
    id: "2022-09-25",
    date: "2022-09-25",
    title: "동두천 락페스티벌",
    venue: "소요산입구 광장 특설무대",
    photoUrl: "https://www.instagram.com/crackshot_official/p/Ci9tQWiJsZL/",

    setlist: [
      "Walking on Fire ",
      "Shake It!",
      "Slow Motion",
      "Fellowship",
      "난 괜찮아 ",
      "Follow Me"
    ]
},

{
    id: "2022-09-24",
    date: "2022-09-24",
    title: "Flight092324",
    venue: "구름아래소극장",
    photoUrl: "https://www.instagram.com/crackshot_official/p/Ci6nDtcpAg8/",

    setlist: [
      "You're invited (but your friend can't come)",
      "Toxic",
      "Livin' La Vida Loca",
      "Pink",
      "Midnight Crime ",
      "Lost Memories",
      "My Friend",
      "Let Me Out",
      "Kickstart My Heart",
      "난 괜찮아",
      "아시나요",
      "잘못된 만남",
      "Shut It Down",
      "Goodbye My Love",
      "Follow Me"
    ]
},

{
    id: "2022-09-23",
    date: "2022-09-23",
    title: "Flight092324",
    venue: "구름아래소극장",
    photoUrl: "https://www.instagram.com/crackshot_official/p/Ci6nDtcpAg8/",

    setlist: [
      "Alone Again",
      "주문 MIROTIC",
      "Livin' La Vida Loca",
      "Paradise City",
      "Shout At The Devil",
      "Midnight Crime ",
      "Lost Memories",
      "My Friend",
      "Let Me Out",
      "Nightrain",
      "달의 몰락",
      "아모르 파티",
      "Purple Rain",
      "Shut It Down",
      "Goodbye My Love"
    ]
},

{
    id: "2022-09-16",
    date: "2022-09-16",
    title: "칠포재즈페스티벌 (순서수정필요)",
    venue: "칠포해수욕장 상설무대",
    photoUrl: "https://www.instagram.com/crackshot_official/p/CirMcxbJ5LN/",

    setlist: [
      "Fellowship",
      "난 괜찮아",
      "달의 몰락",
      "Party! Party! ",
      "Suzie Q",
      "Slither",
      "Break Down",
      "Slow Motion",
      "Shake It!",
      "Follow Me"
    ]
},

{
    id: "2022-08-27",
    date: "2022-08-27",
    title: "크랙샷콘서트 Wave Re:Turns",
    venue: "웨스트브릿지",
    photoUrl: "https://www.instagram.com/crackshot_official/p/ChzNWmCJ_tA/",

    setlist: [
      "Walking on Fire ",
      "Never Say You Loved Me",
      "My Friend",
      "Broken Love",
      "Shake It!",
      "Don't Close Your Eyes",
      "Slow Motion",
      "Let Me Out",
      "Cynic - CYAN (solo)",
      "Midnight Crime ",
      "Ready to Fire",
      "Fellowship",
      "Break Down",
      "Summer Rain - Willy (solo)",
      "Dream In The Mirror",
      "달의 몰락",
      "Wicked Stone",
      "난 괜찮아",
      "Danny (solo)",
      "Follow Me",
      "Slither",
      "Suzie Q",
      "Party! Party!"
    ]
},

{
    id: "2022-08-05",
    date: "2022-08-05",
    title: "펜타포트 락 페스티벌",
    venue: "달빛축제공원",
    photoUrl: "https://www.instagram.com/crackshot_official/p/Cg-58OsJLXN/",

    setlist: [
      "Shake It!",
      "Break Down",
      "Slow Motion",
      "Fellowship",
      "달의 몰락",
      "난 괜찮아",
      "Follow Me"
    ]
},

{
    id: "2022-03-27",
    date: "2022-03-27",
    title: "크랙샷 9주년 콘서트",
    venue: "yes24 라이브홀",
    photoUrl: "https://www.instagram.com/crackshot_official/p/Cbm-_tXlyu1/",

    setlist: [
      "Shake It!",
      "Sweet Child O' Mine",
      "Slow Motion",
      "Alone Again",
      "My Friend",
      "I LOVE YOU - Danny (solo)",
      "Break Down",
      "Out Of My Way",
      "달의 몰락",
      "Cynic - CYAN (solo)",
      "Broken Love",
      "Vision Again",
      "난 괜찮아",
      "Slither",
      "Overdrive",
      "Kickstart My Heart",
      "Follow Me"
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
//뮤지컬
  {
    date: "2025-08-14",
    title: "*Danny* 뮤지컬 웨이스티드 세션",
    memo: "(일정추가필요) 8/14, 8/19, 8/26, 9/2, 9/16, 9/30, 10/3, 10/7, 10/10, 10/14, 10/21, 10/24"
  },
  {
    date: "2023-10-09",
    title: "*Danny**CYAN* 뮤지컬 볼륨업",
    memo: "10/9 10/11 10/18 10/22 10/24 10/27 11/2 11/4 11/7 11/10 11/14 11/17(싸) 11/18(댄) 11/21(싸) 11/22(댄) 11/25 11/28(싸) 12/1 12/3(댄) 12/5(싸) 12/6(댄) 12/8 12/9 12/12(싸) 12/13 12/16(댄) 12/22 12/25 12/29(싸) 12/30 1/1(댄) 1/3(싸) 1/5 1/7(댄) 1/12 1/14"
  },

  
//일정
  {
    date: "2026-06-13",
    title: "*Willy* 이자헌 단독 콘서트 게스트"
  },
  {
    date: "2026-05-23",
    title: "*Willy* 스프링스 버스킹"
  },
  {
    date: "2026-05-02",
    title: "*Willy* 톤메이킹 클리닉"
  },
  ,
  {
    date: "2026-04-04",
    title: "*Willy* 2026 뮤니브 콘서트 심사"
  },
  {
    date: "2025-11-08",
    title: "*Willy* 기타쇼낙원 기타클리닉"
  },
  {
    date: "2025-10-18",
    title: "*CYAN* [방송] 불후의 명곡2 20세기보이즈 세션"
  },
  {
    date: "2025-02-22",
    title: "[방송] 불후의 명곡2 윤수일편"
  },
  {
    date: "2024-10-26",
    title: "*Willy* 나스락 페스티벌 심사"
  },
  {
    date: "2024-06-29",
    title: "[방송] 불후의 명곡2 싸이편"
  },
  {
    date: "2023-07-29",
    title: "*Vincent* 내귀에 도청장치 스튜디오 라이브 게스트"
  },
  {
    date: "2023-02-19",
    title: "[방송] 열린음악회"
  },
  {
    date: "2022-12-22",
    title: "*Willy* 이다온 단독 콘서트 게스트"
  },
  {
    date: "2022-10-16",
    title: "CX 경기 인디 뮤직 페스티벌"
  },
  {
    date: "2022-09-18",
    title: "CX 리슨어게인 페스티벌"
  },
  {
    date: "2022-08-20",
    title: "홍대 퍼레이드"
  },
  {
    date: "2022-08-13",
    title: "*Willy* 락골당"
  },
  {
    date: "2022-07-21",
    title: "CX 난장"
  },
  {
    date: "2022-07-09",
    title: "CX 유니콘"
  },
  {
    date: "2022-07-10",
    title: "CX 유니콘"
  },
  {
    date: "2022-07-03",
    title: "*VINCENT**CYAN* Green Road 게스트"
  },
  {
    date: "2022-06-29",
    title: "CX 뒤란"
  },
  {
    date: "2022-06-28",
    title: "CX Make a DASH 쇼케이스"
  },
  {
    date: "2022-05-21",
    title: "CX 불후의 명곡 자우림편"
  },
  {
    date: "2022-05-13",
    title: "*CYAN* 케이브라운 단독 콘서트 게스트"
  },
  {
    date: "2022-03-27",
    title: "[방송] 열린음악회"
  },
  {
    date: "2022-01-09",
    title: "CX 슈퍼 콘서트"
  },
  {
    date: "2022-01-08",
    title: "CX 슈퍼 콘서트"
  },
  {
    date: "2021-12-19",
    title: "CX 어썸 뮤직 페스티벌"
  },
  {
    date: "2021-12-18",
    title: "CX 어썸 뮤직 페스티벌"
  },
  {
    date: "2021-12-04",
    title: "CX 슈퍼밴드2 콘서트 부산"
  },
  {
    date: "2021-11-28",
    title: "CX 슈퍼밴드2 콘서트 서울"
  },
  {
    date: "2021-11-27",
    title: "CX 슈퍼밴드2 콘서트 서울"
  },
  {
    date: "2021-11-26",
    title: "CX 슈퍼밴드2 콘서트 서울"
  }
];




