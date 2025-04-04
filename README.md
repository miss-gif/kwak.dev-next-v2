# next-intl를 사용한 i18n 전략

1. 서버 컴포넌트에서 번역된 텍스트를 미리 props로 넘기기

- 특징

  - 클라이언트에서 번역 데이터를 사용할 수 있음 (props로 전달)
  - 서버에서 getTranslations() 실행하여 번역된 값만 클라이언트로 넘김 (최적화)
  - 정적인 번역 데이터에는 최적 (라우트 변경과 무관한 경우)

- 적합성
  - 정적이고 페이지 초기 로딩에 필요한 번역 데이터

2. 서버 액션을 사용해서 클라이언트에서 번역 데이터 가져오기

- 특징

  - 클라이언트에서 번역 데이터를 비동기로 가져옴
  - 언어 변경 시 즉시 반영 가능
  - 초기 로딩 속도는 느려질 수 있음 (서버에서 데이터를 받아오기 때문)

- 적합성

  - 언어가 사용자 동작에 따라 바뀌고, 즉각적인 반응이 필요할 때 (ex. 드롭다운으로 언어 선택)

  - 언어 변경 시, 전체 페이지 리로드 없이 즉시 적용 가능
  - 클라이언트에서 상태(State)로 관리 가능
  - API 요청 없이도 언어 전환 가능 (캐싱 & 성능 최적화)
  - 서버 액션을 활용하면 다국어 데이터 요청도 최적화 가능

---

## Vercel 배포 중 발생 에러

1. cannot find module '@tailwindcss/oxide-linux-arm64-gnu'

해결방법 : package.json 에서 아래 코드 추가

```
  "optionalDependencies": {
    "@tailwindcss/oxide-linux-x64-gnu": "^4",
    "lightningcss-linux-x64-gnu": "^1.29.1"
  }
```
