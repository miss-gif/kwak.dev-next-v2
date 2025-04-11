import AdminTranslationManager from "@/app/[locale]/admin/components/AdminTranslationManager";
import { createClient } from "@/utils/supabase/server";

export default async function AdminPage() {
  const supabase = await createClient(); // Supabase 클라이언트 생성

  // ui_texts 테이블에서 모든 컬럼을 가져옴
  const { data: uiTexts } = await supabase
    .from("ui_texts")
    .select("*")
    .order("id");

  // languages 테이블에서 code 컬럼만 가져옴
  const { data: languages } = await supabase.from("languages").select("code");

  // 데이터가 없거나 오류가 발생한 경우 처리
  if (!uiTexts || !languages) {
    return <div>Failed to load data</div>;
  }

  return (
    <AdminTranslationManager
      initialUiTexts={uiTexts}
      initialLanguages={languages.map((l) => l.code)}
    />
  );
}
