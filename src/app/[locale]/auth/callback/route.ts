import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code"); // URL에서 "code" 파라미터를 가져옵니다.
  const next = searchParams.get("next") ?? "/"; // URL에서 "next" 파라미터를 가져오거나 기본값으로 "/"를 설정합니다.

  console.log("code", code); // "code" 파라미터 값 출력
  console.log("next", next); // "next" 파라미터 값 출력

  if (code) {
    const supabase = await createClient(); // Supabase 클라이언트를 생성합니다.
    const { error } = await supabase.auth.exchangeCodeForSession(code); // 인증 코드를 세션으로 교환합니다.

    if (error) {
      // 인증 과정에서 에러가 발생한 경우 에러 메시지를 반환합니다.
      return new Response("❌ Supabase 인증 에러: " + error.message, {
        status: 500,
      });
    }

    // 인증 성공 시 리디렉션 처리
    const forwardedHost = request.headers.get("x-forwarded-host"); // 프록시를 통해 전달된 호스트 정보를 가져옵니다.
    const isLocalEnv = process.env.NODE_ENV === "development"; // 현재 환경이 로컬 개발 환경인지 확인합니다.

    if (isLocalEnv) {
      // 로컬 환경에서는 origin과 next를 사용하여 리디렉션합니다.
      return NextResponse.redirect(`${origin}${next}`);
    } else if (forwardedHost) {
      // 프로덕션 환경에서 x-forwarded-host 헤더가 있는 경우 이를 사용하여 리디렉션합니다.
      return NextResponse.redirect(`https://${forwardedHost}${next}`);
    } else {
      // 그 외의 경우 origin과 next를 사용하여 리디렉션합니다.
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // "code" 파라미터가 없는 경우 에러 메시지를 반환합니다.
  return new Response("❌ 인증 코드 없음 (Missing ?code=)", {
    status: 400,
  });
}
