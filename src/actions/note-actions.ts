"use server";

import { createClient } from "@/utils/supabase/server";

// 노트 목록을 가져오는 함수
export async function getNotes(search: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("note")
    .select("*")
    .ilike("title", `%${search}%`);

  if (error) throw new Error(error.message);
  return data;
}
