# CRACKSHOT Setlist Archive

CRACKSHOT 밴드의 공연 세트리스트를 기록하는 정적 웹사이트입니다.

## 새 공연 추가하는 법

`data.js` 파일을 열어서, `CONCERTS` 배열 맨 위에 아래 형식을 복사해서 붙여넣고 내용만 바꾸면 됩니다.

```js
{
  id: "2026-07-01",              // 날짜와 동일하게 (고유값)
  date: "2026-07-01",            // YYYY-MM-DD 형식
  title: "공연 이름",
  venue: "공연 장소",
  setlist: [
    "곡 이름1",
    "곡 이름2"
  ]
},
```

저장 후 GitHub에 push하면 Vercel이 자동으로 사이트를 다시 배포합니다.

## 로컬에서 미리보기

`index.html` 파일을 더블클릭해서 브라우저로 열면 바로 확인할 수 있습니다.
