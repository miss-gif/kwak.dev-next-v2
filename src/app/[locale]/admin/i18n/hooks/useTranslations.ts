import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export function useTranslations(textId: number | null) {
  const supabase = createClient();
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!textId) {
      setTranslations({});
      return;
    }

    const fetch = async () => {
      const { data } = await supabase
        .from("ui_text_translations")
        .select("lang_code, value")
        .eq("ui_text_id", textId);

      if (data) {
        const result = Object.fromEntries(
          data.map((d) => [d.lang_code, d.value])
        );
        setTranslations(result);
      }
    };

    fetch();
  }, [textId, supabase]);

  return { translations, setTranslations };
}
