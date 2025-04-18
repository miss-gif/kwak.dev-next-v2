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

---

# 완벽한 게시판 만들기

(MVP 버전 단계별 기능 설계)

### ✅ MVP v1: **기본 CRUD 중심의 심플 게시판**

**🎯 목표:** 게시글과 댓글을 CRUD로 처리하고, 로그인 기반의 접근만 가능하게 한다.

**기능 구성:**

- 회원가입 / 로그인 (Supabase Auth)
- 게시글 목록 (SSR + 페이징)
- 게시글 작성 / 상세 / 수정 / 삭제
- 댓글 작성 / 수정 / 삭제
- 작성자 정보 표시
- 카테고리 구분
- 작성일, 조회수, 기본 메타 표시

**Supabase 설정 포인트:**

- `posts`, `comments`, `users`, `categories` 테이블 생성
- RLS: 본인만 수정/삭제 가능하게
- 조회수는 `RPC` 또는 `Edge Function` 사용하면 좋음

---

### ✅ MVP v2: **리치 UI, 사용자 경험 개선**

**🎯 목표:** 사용성을 높이고 사용자 참여를 유도한다.

**기능 추가:**

- 무한 스크롤 or 페이지네이션 선택
- 마크다운 또는 리치 텍스트 에디터 (TipTap, Markdown)
- 이미지/파일 업로드
- 썸네일 / 이미지 미리보기
- 카테고리 필터, 키워드 검색
- 반응형 UI 및 접근성 개선
- 작성 중 자동 저장 / 임시 저장

**Supabase 포인트:**

- `files` 테이블 + 스토리지 연동
- 자동 저장용 `drafts` 테이블 고려
- 키워드 검색: Supabase `pgroonga` or `pg_trgm` 인덱스 사용

---

### ✅ MVP v3: **소셜 기능 + 유저 참여 강화**

**🎯 목표:** 사용자 간 상호작용을 통해 커뮤니티화

**기능 추가:**

- 대댓글 (Nested Comments)
- 좋아요 / 추천 기능
- 북마크 / 즐겨찾기
- 해시태그 필터 기능
- 공지글 상단 고정
- 사용자 프로필 / 등급 / 활동 이력

**Supabase 포인트:**

- `likes`, `bookmarks`, `tags` 테이블 추가
- 태그 필터는 `GIN index` 활용
- 공지글: `pinned` 필드 + 목록 정렬 시 우선순위 반영

---

### ✅ MVP v4: **관리자 및 보안 기능 강화**

**🎯 목표:** 커뮤니티 유지 관리와 보안을 위한 기능

**기능 추가:**

- 게시글/댓글 블라인드 처리
- 관리자 전용 대시보드
- 사용자 신고 기능 (신고 내역 관리)
- 키워드 필터링 및 자동 블라인드
- 권한 기반 접근 제어 (`USER`, `MOD`, `ADMIN`)
- 통계 보기 (글 수, 댓글 수, 사용자 수 등)

**Supabase 포인트:**

- `reports`, `roles`, `moderation_logs` 테이블
- RLS 정책을 Role 기반으로 분기 처리
- 관리자는 모든 글을 조회/수정 가능하게 RLS 조건 분기

---

### ✅ MVP v5: **성능 최적화 + 확장성 강화**

**🎯 목표:** 대규모 트래픽 대응과 UX 고도화

**기능 추가:**

- 인기글 / 최신글 정렬
- 게시글 수정/삭제 이력 관리
- SSR/ISR/CSR 전략 조합
- 데이터 캐싱 (SWR + Supabase)
- Lazy Loading + 코드 스플리팅
- 이미지 최적화 (WebP 변환, 리사이징)

**Supabase & Next.js 포인트:**

- `post_history` 테이블로 변경 이력 관리
- ISR 사용 시 revalidate 설정 최적화
- `sharp` + `Supabase Storage` + Edge Function으로 이미지 처리

# i18n의 번역데이터 관리

- 초기 번역은 JSON에 저장한 다음, DB로 마이그레이션

👇 두 방식의 차이점
1️⃣ JSON 방식 (초기 개발)

장점:

- 빠른 개발: 서버나 DB 연동 없이 로컬에서 바로 번역 가능.
- 프론트엔드에서 쉽게 관리: next-i18next나 react-i18next 같은 라이브러리로 쉽게 적용.
- 배포가 간단: 로컬 파일만 수정하면 되므로 서버 사이드 로직을 건드리지 않아도 됨.

단점:

- 운영 중 업데이트 어려움: 번역 추가나 수정이 있을 때마다 JSON 파일을 수정해야 함.
- 번역 관리: 번역 파일이 커지면 관리가 어려워지고, 실수로 번역이 누락되거나 오타가 생길 가능성 있음.
- 팀원 간 충돌: 번역 파일을 수정하는 사람이 많을 경우, Git에서 충돌이 발생할 수 있음.

2️⃣ DB 방식 (규모가 커지면)

장점:

- 동적 관리: 번역을 실시간으로 수정하고 추가할 수 있어 운영 환경에서도 수정이 용이.
- 자동화 가능: 관리자 페이지나 CMS를 통해 번역을 쉽게 관리하고 수정할 수 있음.
- API 기반 번역 관리: 프론트엔드에서 DB에 저장된 데이터를 API로 받아서 렌더링하므로 유연성 있음.
- 다국어 관리 효율성: 한 번에 여러 언어의 데이터를 관리할 수 있어 규모가 커질수록 더 효율적.
- 다국적 팀 지원: 여러 사람이 동시에 수정하고 업데이트 가능.

단점:

- 개발 초기엔 조금 더 복잡: DB 연동과 관리 시스템을 세팅해야 하므로 초기 개발이 다소 복잡.
- DB 부하: 번역 데이터가 많아지면 DB 쿼리 성능에 영향을 줄 수 있음. 이를 해결하려면 캐싱을 고려해야 함.

👇 어떤 시점에서 DB로 넘어가야 할까?
프로젝트 초기: 빠른 개발이 중요하고, 지원하는 언어가 많지 않다면 JSON으로 시작하는 것이 합리적.

프로젝트가 성장하고 관리할 언어가 많아질 때: 언어별 데이터가 많아지고 관리가 어려워질 경우 DB로 전환하는 것이 필요.

예시 시점:

- 사용자 수가 많아지고, 자주 번역을 수정해야 할 필요가 있을 때
  예: 마케팅 캠페인에 따라 자주 텍스트를 수정해야 하는 경우.

- 지원할 언어가 늘어나고, 팀원이 여러 명이 번역을 수정해야 할 때
  예: 한국어, 영어, 일본어 외에도 프랑스어, 독일어 등 다른 언어를 추가해야 할 때.

- 번역 데이터를 효율적으로 관리하고, 자동화할 필요가 있을 때
  예: 텍스트 번역이 카테고리나 제품과 연관되어 있으면, 이를 쉽게 관리할 수 있어야 함.

✅ 그럼 DB로 전환할 때 어떻게 해야 할까?

- 카테고리/페이지별로 번역 테이블을 두고, 각 언어별로 데이터를 분리해서 저장.
- 번역 API를 활용해 프론트엔드에서 필요한 데이터를 API로 받아와서 동적으로 표시.
- 캐시 전략: 자주 변경되지 않는 번역 데이터는 캐시해두고, 자주 수정되는 데이터는 실시간으로 가져오기.

## 기준 테이블과 번역 테이블 두기

- 기준 테이블과 번역 테이블은 반드시 분리해서 관리하는 게 유지보수, 쿼리, 확장성 측면에서 유리하다.

1️⃣ 정규화된 구조 = 확장성 확보
→ 번역 테이블은 lang_code 컬럼을 가진 row 형태로 만들어야 유연하게 확장 가능해.
2️⃣ 기준 테이블은 기능 중심, 번역 테이블은 텍스트 중심
역할 분리가 되어 있어야 유지보수도 쉽고, 기능 변경과 번역 변경을 독립적으로 관리할 수 있어.
3️⃣ Supabase 권장 방식
Postgres의 foreign key + RLS 정책 + JSON API 설계가 깔끔하게 작동되도록 최적화된 구조야.
4️⃣ 쿼리와 검색에 유리
단일 테이블로 관리하면 WHERE ja IS NOT NULL 같은 불편한 방식이 되어야 하고, 인덱스 최적화도 어렵고, 다국어 간 fallback도 어려워져.
5️⃣ 관리자 UI나 CMS 구성 시 유리
이중 테이블 구조는 프론트/백엔드 모두에서 관리 UI를 만들기 쉽게 만들어 줘.

DB 구조는 ‘지금’보다 ‘내일’을 바라보고 짜야 한다는 점에서, 분리 구조가 거의 유일한 정답에 가까워.
