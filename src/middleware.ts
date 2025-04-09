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
  if (pathname.startsWith("/board/new") && !user) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname); // 현재 경로 저장
    return NextResponse.redirect(loginUrl);
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
