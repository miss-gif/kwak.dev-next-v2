import { createBrowserClient } from "@supabase/ssr";
import { Database } from "../../../types_db";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createBrowserClient<Database>(supabaseUrl, supabaseKey);

// ! 신규 코드로 보이는데, 사용법 모르겠음
export function createClient() {
  // 프로젝트의 자격 증명을 사용하여 브라우저에서 Supabase 클라이언트를 생성합니다
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
