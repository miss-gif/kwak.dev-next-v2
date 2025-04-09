export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blog: {
        Row: {
          content: string
          created_at: string
          id: number
          title: string
          user_email: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
          title: string
          user_email?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          title?: string
          user_email?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          id: number
          slug: string
        }
        Insert: {
          id?: number
          slug: string
        }
        Update: {
          id?: number
          slug?: string
        }
        Relationships: []
      }
      category_translations: {
        Row: {
          category_id: number | null
          id: number
          lang_code: string
          localized_name: string
        }
        Insert: {
          category_id?: number | null
          id?: number
          lang_code: string
          localized_name: string
        }
        Update: {
          category_id?: number | null
          id?: number
          lang_code?: string
          localized_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_translations_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          author_id: string | null
          content: string
          created_at: string | null
          id: number
          post_id: number
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string | null
          id?: number
          post_id: number
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string | null
          id?: number
          post_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      languages: {
        Row: {
          code: string
          name: string
        }
        Insert: {
          code: string
          name: string
        }
        Update: {
          code?: string
          name?: string
        }
        Relationships: []
      }
      note: {
        Row: {
          content: string
          created_at: string
          id: number
          title: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
          title: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          title?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          author_id: string | null
          category_id: number
          content: string
          created_at: string | null
          id: number
          title: string
          updated_at: string | null
          views: number | null
        }
        Insert: {
          author_id?: string | null
          category_id: number
          content: string
          created_at?: string | null
          id?: number
          title: string
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          author_id?: string | null
          category_id?: number
          content?: string
          created_at?: string | null
          id?: number
          title?: string
          updated_at?: string | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      todos: {
        Row: {
          contents: string
          created_at: string
          end_date: string | null
          id: number
          start_date: string | null
          title: string
          user_email: string | null
          user_id: string | null
        }
        Insert: {
          contents: string
          created_at?: string
          end_date?: string | null
          id?: number
          start_date?: string | null
          title: string
          user_email?: string | null
          user_id?: string | null
        }
        Update: {
          contents?: string
          created_at?: string
          end_date?: string | null
          id?: number
          start_date?: string | null
          title?: string
          user_email?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      ui_text_translations: {
        Row: {
          id: number
          is_fallback: boolean | null
          lang_code: string
          last_updated_by: string | null
          translated_text: string
          ui_text_id: number
          updated_at: string | null
        }
        Insert: {
          id?: number
          is_fallback?: boolean | null
          lang_code: string
          last_updated_by?: string | null
          translated_text: string
          ui_text_id: number
          updated_at?: string | null
        }
        Update: {
          id?: number
          is_fallback?: boolean | null
          lang_code?: string
          last_updated_by?: string | null
          translated_text?: string
          ui_text_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_ui_text"
            columns: ["ui_text_id"]
            isOneToOne: false
            referencedRelation: "missing_translations"
            referencedColumns: ["ui_text_id"]
          },
          {
            foreignKeyName: "fk_ui_text"
            columns: ["ui_text_id"]
            isOneToOne: false
            referencedRelation: "ui_texts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ui_text_translations_lang_code_fkey"
            columns: ["lang_code"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "ui_text_translations_lang_code_fkey"
            columns: ["lang_code"]
            isOneToOne: false
            referencedRelation: "missing_translations"
            referencedColumns: ["missing_lang_code"]
          },
        ]
      }
      ui_texts: {
        Row: {
          description: string | null
          href: string | null
          id: number
          key: string
        }
        Insert: {
          description?: string | null
          href?: string | null
          id?: number
          key: string
        }
        Update: {
          description?: string | null
          href?: string | null
          id?: number
          key?: string
        }
        Relationships: []
      }
    }
    Views: {
      missing_translations: {
        Row: {
          key: string | null
          missing_lang_code: string | null
          ui_text_id: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
