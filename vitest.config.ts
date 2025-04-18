// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // 전역 테스트 API 사용 가능
    environment: "jsdom", // DOM 환경 설정
    include: ["src/**/*.test.tsx", "tests/**/*.spec.ts"],
  },
});
