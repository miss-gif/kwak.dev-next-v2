import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// ✅ 미들웨어 함수
export async function middleware(request: NextRequest) {
  const response = createMiddleware(routing)(request);

  // Supabase 클라이언트 생성
  const supabase = createClient();

  // ✅ 세션 가져오기
  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  // ✅ 특정 경로 보호 예시
  const pathname = request.nextUrl.pathname;

  // 로케일 제거 후 경로 확인 (i18n이 사용되는 경우)
  // 예: /en/auth/login -> /auth/login
  const pathnameWithoutLocale = pathname.replace(/^\/[a-zA-Z]{2}(?:\/|$)/, "/");

  if (pathname.startsWith("/board/new") && !user) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname); // 현재 경로 저장
    return NextResponse.redirect(loginUrl);
  }

  const authProtectedPaths = [
    "/auth/login",
    "/auth/signup",
    "/auth/reset-password",
  ];

  // 로케일을 고려하여 경로 확인
  const isAuthPage = authProtectedPaths.some(
    (path) => pathname.includes(path) || pathnameWithoutLocale.includes(path)
  );

  if (user && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/board/new",
    "/auth/:path*",
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
  ],
};
