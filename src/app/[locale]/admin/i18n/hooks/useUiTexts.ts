import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Database } from "../../../../../../types_db";

type UiTextsRow = Database["public"]["Tables"]["ui_texts"]["Row"];

export function useUiTexts() {
  const supabase = createClient();
  const [uiTexts, setUiTexts] = useState<UiTextsRow[]>([]);

  const fetchUiTexts = async () => {
    const { data } = await supabase.from("ui_texts").select("*").order("id");
    if (data) setUiTexts(data);
  };

  const deleteUiText = async (id: number) => {
    await supabase.from("ui_texts").delete().eq("id", id);
    await fetchUiTexts();
  };

  return { uiTexts, setUiTexts, fetchUiTexts, deleteUiText };
}
