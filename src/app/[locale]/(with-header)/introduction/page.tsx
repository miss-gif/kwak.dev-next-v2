"use client";

import Inner from "@/components/layout/Inner";
import { motion } from "motion/react";

export default function Page() {
  return (
    <Inner>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-6 md:p-8 max-w-4xl mx-auto space-y-8"
      >
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 border-b pb-3"
        >
          프로젝트 소개
        </motion.h1>

        <div className="text-gray-700 space-y-2 leading-relaxed">
          <p>
            기존 React 기반 프로젝트를 Next.js로 마이그레이션합니다.
            <br />
            이를 통해 최신 웹 기술을 적용하고 성능을 최적화한 웹사이트를
            제작합니다.
          </p>
          <p>
            효율적인 유지보수, 글로벌 사용자 대응(i18n), 데이터 캐싱, 서버 액션
            활용 등의 이점을 실현합니다.
          </p>
        </div>

        <motion.h2
          whileInView={{ x: [10, 0], opacity: [0, 1] }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-semibold text-gray-800 border-l-4 border-blue-500 pl-3 mt-8"
        >
          주요 목표
        </motion.h2>

        <ul className="space-y-4">
          {[
            {
              title: "국제화(i18n) 적용",
              content:
                "다국어 지원을 위한 i18n 적용. 지역별 콘텐츠 최적화를 구현합니다.",
            },
            {
              title: "성능 최적화",
              content:
                "SSG, ISR, SSR, CSR 등 상황에 맞는 렌더링 전략을 활용합니다.",
            },
            {
              title: "데이터 캐싱 최적화",
              content:
                "서버 및 클라이언트에서 적절한 캐싱 전략을 적용합니다. API 호출을 최적화하고 캐시 갱신 주기를 효율적으로 설정합니다.",
            },
            {
              title: "Supabase 도입",
              content:
                "Firebase 대체제로 Supabase를 활용합니다. 인증, 실시간 데이터베이스, 스토리지 등의 백엔드 서비스를 구축합니다.",
            },
            {
              title: "SEO 최적화",
              content:
                "서버 렌더링을 활용한 검색 엔진 친화적인 페이지를 구성합니다. 메타 태그 자동 생성 및 OG 태그, 구조화 데이터를 적용합니다.",
            },
            {
              title: "서버 액션 적용",
              content:
                "API Routes 없이 서버에서 직접 데이터를 처리합니다. 클라이언트-서버 간 통신을 최소화합니다.",
            },
            {
              title: "유지보수 개선",
              content:
                "컴포넌트 분리 및 코드 구조를 개선합니다. 타입스크립트 적용으로 안정성을 확보하고, 파일 기반 라우팅으로 코드 관리 용이성을 높입니다.",
            },
          ].map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            >
              <h3 className="font-semibold text-blue-700">{item.title}</h3>
              <p className="text-gray-700 mt-1">{item.content}</p>
            </motion.li>
          ))}
        </ul>

        <motion.h2
          whileInView={{ x: [10, 0], opacity: [0, 1] }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-semibold text-gray-800 border-l-4 border-green-500 pl-3 mt-8"
        >
          기대 효과
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "빠른 페이지 로딩 속도로 사용자 경험(UX) 향상",
            "다국어 지원을 통한 글로벌 확장 가능성 증가",
            "SEO 최적화로 검색엔진 노출 극대화",
            "Supabase 도입으로 백엔드 부담 감소 및 데이터 관리 용이",
            "서버 액션 활용으로 불필요한 API 호출 감소",
            "유지보수성이 높은 코드 구조로 개발 생산성 향상",
          ].map((effect, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className="p-3 bg-green-50 rounded-md border-l-2 border-green-400"
            >
              {effect}
            </motion.div>
          ))}
        </div>

        <motion.div
          whileInView={{ opacity: [0, 1] }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-5 bg-blue-50 rounded-lg text-center"
        >
          <p className="text-gray-700">
            이 프로젝트를 통해 최신 Next.js 기술을 적극적으로 활용합니다.
            <br />
            효율적이고 확장 가능한 웹사이트를 구축하는 것이 목표입니다.
          </p>
        </motion.div>
      </motion.div>
    </Inner>
  );
}
