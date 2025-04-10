import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const TranslationEditor = ({
  selectedTextId,
  translations,
  setTranslations,
  languages,
  fetchTranslations,
}) => {
  const handleSaveTranslation = async () => {
    if (!selectedTextId) return;
    for (const lang_code of languages) {
      const text = translations[lang_code] || "";
      await supabase.from("ui_text_translations").upsert({
        ui_text_id: selectedTextId,
        lang_code,
        translated_text: text,
      });
    }
    fetchTranslations(selectedTextId);
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div>ui_texts ID : {selectedTextId}</div>
        <h2 className="text-lg font-semibold">🌍 번역 관리</h2>
        <div className="grid gap-4">
          {["ko", "en", "ja"].map((lang) => (
            <div key={lang} className="space-y-2">
              <h3 className="text-md font-medium">{lang.toUpperCase()}</h3>
              <div className="flex items-center space-x-4">
                <Textarea
                  className="flex-1"
                  readOnly
                  value={translations[`${lang}_text`] || ""}
                  placeholder={`${lang} 기본값`}
                />
                <Textarea
                  className="flex-1"
                  value={translations[`${lang}_text`] || ""}
                  placeholder={`${lang} 변경값`}
                  onChange={(e) =>
                    setTranslations({
                      ...translations,
                      [`${lang}_new`]: e.target.value,
                    })
                  }
                />
                <Button
                  onClick={async () => {
                    const newTranslation = translations[`${lang}_new`] || "";
                    await supabase.from("ui_text_translations").upsert({
                      ui_text_id: selectedTextId,
                      lang_code: lang,
                      translated_text: newTranslation,
                    });
                    fetchTranslations(selectedTextId);
                  }}
                >
                  수정
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TranslationEditor;
