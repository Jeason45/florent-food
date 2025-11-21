/**
 * Types générés automatiquement depuis le schéma Supabase
 * À regénérer après chaque modification du schéma avec:
 * npx supabase gen types typescript --project-id <project-id> > src/types/supabase.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          first_name: string | null;
          last_name: string | null;
          avatar_url: string | null;
          role: "admin" | "user";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          first_name?: string | null;
          last_name?: string | null;
          avatar_url?: string | null;
          role?: "admin" | "user";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          first_name?: string | null;
          last_name?: string | null;
          avatar_url?: string | null;
          role?: "admin" | "user";
          created_at?: string;
          updated_at?: string;
        };
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          first_name: string | null;
          status: "active" | "unsubscribed" | "bounced";
          source: string | null;
          preferences: Json;
          tags: string[];
          total_opens: number;
          total_clicks: number;
          last_opened_at: string | null;
          subscribed_at: string;
          unsubscribed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          first_name?: string | null;
          status?: "active" | "unsubscribed" | "bounced";
          source?: string | null;
          preferences?: Json;
          tags?: string[];
          total_opens?: number;
          total_clicks?: number;
          last_opened_at?: string | null;
          subscribed_at?: string;
          unsubscribed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          first_name?: string | null;
          status?: "active" | "unsubscribed" | "bounced";
          source?: string | null;
          preferences?: Json;
          tags?: string[];
          total_opens?: number;
          total_clicks?: number;
          last_opened_at?: string | null;
          subscribed_at?: string;
          unsubscribed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      recipes: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          category: string[];
          difficulty: "debutant" | "intermediaire" | "expert";
          prep_time: number;
          cook_time: number;
          total_time: number;
          servings: number;
          ingredients: Json;
          steps: Json;
          video_url: string | null;
          pdf_url: string | null;
          status: "draft" | "published";
          visibility: "free" | "premium";
          meta_title: string | null;
          meta_description: string | null;
          tags: string[];
          views_count: number;
          favorites_count: number;
          completed_count: number;
          author_id: string | null;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description?: string | null;
          image_url?: string | null;
          category: string[];
          difficulty: "debutant" | "intermediaire" | "expert";
          prep_time: number;
          cook_time: number;
          servings?: number;
          ingredients: Json;
          steps: Json;
          video_url?: string | null;
          pdf_url?: string | null;
          status?: "draft" | "published";
          visibility?: "free" | "premium";
          meta_title?: string | null;
          meta_description?: string | null;
          tags?: string[];
          views_count?: number;
          favorites_count?: number;
          completed_count?: number;
          author_id?: string | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string | null;
          image_url?: string | null;
          category?: string[];
          difficulty?: "debutant" | "intermediaire" | "expert";
          prep_time?: number;
          cook_time?: number;
          servings?: number;
          ingredients?: Json;
          steps?: Json;
          video_url?: string | null;
          pdf_url?: string | null;
          status?: "draft" | "published";
          visibility?: "free" | "premium";
          meta_title?: string | null;
          meta_description?: string | null;
          tags?: string[];
          views_count?: number;
          favorites_count?: number;
          completed_count?: number;
          author_id?: string | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      newsletters: {
        Row: {
          id: string;
          subject: string;
          preheader: string | null;
          content: Json;
          type: "regular" | "welcome_sequence" | "promotional";
          segment_filter: Json | null;
          status: "draft" | "scheduled" | "sent";
          scheduled_at: string | null;
          sent_at: string | null;
          recipients_count: number;
          opens_count: number;
          clicks_count: number;
          unsubscribes_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          subject: string;
          preheader?: string | null;
          content: Json;
          type: "regular" | "welcome_sequence" | "promotional";
          segment_filter?: Json | null;
          status?: "draft" | "scheduled" | "sent";
          scheduled_at?: string | null;
          sent_at?: string | null;
          recipients_count?: number;
          opens_count?: number;
          clicks_count?: number;
          unsubscribes_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          subject?: string;
          preheader?: string | null;
          content?: Json;
          type?: "regular" | "welcome_sequence" | "promotional";
          segment_filter?: Json | null;
          status?: "draft" | "scheduled" | "sent";
          scheduled_at?: string | null;
          sent_at?: string | null;
          recipients_count?: number;
          opens_count?: number;
          clicks_count?: number;
          unsubscribes_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      newsletter_events: {
        Row: {
          id: string;
          newsletter_id: string | null;
          subscriber_id: string | null;
          event_type: "sent" | "opened" | "clicked" | "bounced" | "unsubscribed";
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          newsletter_id?: string | null;
          subscriber_id?: string | null;
          event_type: "sent" | "opened" | "clicked" | "bounced" | "unsubscribed";
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          newsletter_id?: string | null;
          subscriber_id?: string | null;
          event_type?: "sent" | "opened" | "clicked" | "bounced" | "unsubscribed";
          metadata?: Json;
          created_at?: string;
        };
      };
      email_automations: {
        Row: {
          id: string;
          name: string;
          trigger_type: "newsletter_signup" | "book_purchase" | "membership_signup" | "abandoned_cart";
          sequence: Json;
          status: "active" | "paused";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          trigger_type: "newsletter_signup" | "book_purchase" | "membership_signup" | "abandoned_cart";
          sequence: Json;
          status?: "active" | "paused";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          trigger_type?: "newsletter_signup" | "book_purchase" | "membership_signup" | "abandoned_cart";
          sequence?: Json;
          status?: "active" | "paused";
          created_at?: string;
          updated_at?: string;
        };
      };
      automation_queue: {
        Row: {
          id: string;
          automation_id: string | null;
          subscriber_id: string | null;
          step_index: number;
          status: "pending" | "sent" | "failed" | "cancelled";
          scheduled_for: string;
          sent_at: string | null;
          error: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          automation_id?: string | null;
          subscriber_id?: string | null;
          step_index: number;
          status?: "pending" | "sent" | "failed" | "cancelled";
          scheduled_for: string;
          sent_at?: string | null;
          error?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          automation_id?: string | null;
          subscriber_id?: string | null;
          step_index?: number;
          status?: "pending" | "sent" | "failed" | "cancelled";
          scheduled_for?: string;
          sent_at?: string | null;
          error?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      analytics_daily: {
        Row: {
          id: string;
          date: string;
          new_subscribers: number;
          total_subscribers: number;
          unsubscribes: number;
          unique_visitors: number;
          page_views: number;
          recipes_views: number;
          recipes_favorites: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          date: string;
          new_subscribers?: number;
          total_subscribers?: number;
          unsubscribes?: number;
          unique_visitors?: number;
          page_views?: number;
          recipes_views?: number;
          recipes_favorites?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          date?: string;
          new_subscribers?: number;
          total_subscribers?: number;
          unsubscribes?: number;
          unique_visitors?: number;
          page_views?: number;
          recipes_views?: number;
          recipes_favorites?: number;
          created_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}
