import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// 미들웨어 함수 정의
export async function middleware(request: NextRequest) {
  // next-intl 미들웨어 생성
  const response = createMiddleware(routing)(request);
  const pathname = request.nextUrl.pathname;
  // URL에서 로케일 제거
  const pathnameWithoutLocale = pathname.replace(/^\/[a-zA-Z]{2}(?:\/|$)/, "/");

  // 보호된 경로 목록 (로그인이 필요한 경로)
  const protectedPaths = ["/admin", "/admin/i18n", "/admin/test", "/board/new"];
  // 게스트 전용 경로 목록 (로그인 시 접근 불가한 경로)
  const guestOnlyPaths = [
    "/auth/login",
    "/auth/signup",
    "/auth/reset-password",
  ];

  // 현재 경로가 보호된 경로인지 확인
  const isProtected = protectedPaths.some(
    (path) => pathname.includes(path) || pathnameWithoutLocale.includes(path)
  );
  // 현재 경로가 게스트 전용 경로인지 확인
  const isGuestOnly = guestOnlyPaths.some(
    (path) => pathname.includes(path) || pathnameWithoutLocale.includes(path)
  );

  // Supabase 클라이언트 생성
  const supabase = createClient();
  // 현재 사용자 정보 가져오기
  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  // 사용자가 없고 보호된 경로에 접근하려는 경우, 홈으로 리디렉션
  if (!user && isProtected) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 사용자가 있고 게스트 전용 경로에 접근하려는 경우, 홈으로 리디렉션
  if (user && isGuestOnly) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 기본 응답 반환
  return response;
}

// 미들웨어 설정
export const config = {
  matcher: [
    "/auth/:path*", // 인증 관련 경로
    "/board/new", // 새 게시판 생성 경로
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)", // 특정 경로 제외한 모든 경로
  ],
};
