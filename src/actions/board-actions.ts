"use server";

import { createClient } from "@/utils/supabase/server";
import { Database } from "../../types_db";

export type PostsRow = Database["public"]["Tables"]["posts"]["Row"];
export type PostsRowInsert = Database["public"]["Tables"]["posts"]["Insert"];
export type PostsRowUpdate = Database["public"]["Tables"]["posts"]["Update"];
// Create 기능
export async function createPost(posts: PostsRowInsert) {
  const supabase = await createClient();
  const user = supabase.auth.getUser();
  const { data, error, status } = await supabase
    .from("posts")
    .insert([
      {
        author_id: posts.author_id,
        category_id: posts.category_id,
        content: posts.content,
        title: posts.title,
        views: 0,
      },
    ])
    .select()
    .single();

  return { data, error, status };
}

// Read 기능
export async function getPosts() {
  const supabase = await createClient();
  const { data, error, status } = await supabase.from("posts").select("*");
  return { data, error, status };
}

// Read 기능 id 한개
export async function getPostId(id: number) {
  const supabase = await createClient();
  const { data, error, status } = await supabase
    .from("posts")
    .select()
    .eq("id", id)
    .single();
  return { data, error, status } as {
    data: PostsRow | null;
    error: Error | null;
    status: number;
  };
}
