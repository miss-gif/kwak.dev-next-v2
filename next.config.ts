import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    domains: ["streak-stats.demolab.com", "github-readme-stats.vercel.app"], // 외부 이미지 도메인 등록
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
