import Inner from "@/components/layout/Inner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const mvpFeatures = [
  {
    value: "mvp-1",
    title: "MVP v1: 기본 CRUD 중심의 심플 게시판",
    content: [
      "🎯 목표: 게시글과 댓글을 CRUD로 처리하고, 로그인 기반의 접근만 가능하게 한다.",
      "기능 구성:",
      "- 회원가입 / 로그인 (Supabase Auth)",
      "- 게시글 목록 (SSR + 페이징)",
      "- 게시글 작성 / 상세 / 수정 / 삭제",
      "- 댓글 작성 / 수정 / 삭제",
      "- 작성자 정보 표시",
      "- 카테고리 구분",
      "- 작성일, 조회수, 기본 메타 표시",
    ],
  },
  {
    value: "mvp-2",
    title: "MVP v2: 리치 UI, 사용자 경험 개선",
    content: [
      "🎯 목표: 사용성을 높이고 사용자 참여를 유도한다.",
      "기능 추가:",
      "- 무한 스크롤 or 페이지네이션 선택",
      "- 마크다운 또는 리치 텍스트 에디터 (TipTap, Markdown)",
      "- 이미지/파일 업로드",
      "- 썸네일 / 이미지 미리보기",
      "- 카테고리 필터, 키워드 검색",
      "- 반응형 UI 및 접근성 개선",
      "- 작성 중 자동 저장 / 임시 저장",
    ],
  },
  {
    value: "mvp-3",
    title: "MVP v3: 소셜 기능 + 유저 참여 강화",
    content: [
      "🎯 목표: 사용자 간 상호작용을 통해 커뮤니티화",
      "기능 추가:",
      "- 대댓글 (Nested Comments)",
      "- 좋아요 / 추천 기능",
      "- 북마크 / 즐겨찾기",
      "- 해시태그 필터 기능",
      "- 공지글 상단 고정",
      "- 사용자 프로필 / 등급 / 활동 이력",
    ],
  },
  {
    value: "mvp-4",
    title: "MVP v4: 관리자 및 보안 기능 강화",
    content: [
      "🎯 목표: 커뮤니티 유지 관리와 보안을 위한 기능",
      "기능 추가:",
      "- 게시글/댓글 블라인드 처리",
      "- 관리자 전용 대시보드",
      "- 사용자 신고 기능 (신고 내역 관리)",
      "- 키워드 필터링 및 자동 블라인드",
      "- 권한 기반 접근 제어 (`USER`, `MOD`, `ADMIN`)",
      "- 통계 보기 (글 수, 댓글 수, 사용자 수 등)",
    ],
  },
  {
    value: "mvp-5",
    title: "MVP v5: 성능 최적화 + 확장성 강화",
    content: [
      "🎯 목표: 대규모 트래픽 대응과 UX 고도화",
      "기능 추가:",
      "- 인기글 / 최신글 정렬",
      "- 게시글 수정/삭제 이력 관리",
      "- SSR/ISR/CSR 전략 조합",
      "- 데이터 캐싱 (SWR + Supabase)",
      "- Lazy Loading + 코드 스플리팅",
      "- 이미지 최적화 (WebP 변환, 리사이징)",
    ],
  },
];

export default function Page() {
  return (
    <Accordion type="single" collapsible>
      {mvpFeatures.map((mvp) => (
        <AccordionItem key={mvp.value} value={mvp.value}>
          <AccordionTrigger>{mvp.title}</AccordionTrigger>
          <AccordionContent>
            {mvp.content.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
