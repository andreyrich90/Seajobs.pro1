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
          role: "seafarer" | "company";
          is_admin: boolean;
          is_blocked: boolean;
          created_at: string;
        };
        Insert: {
          id: string;
          role: "seafarer" | "company";
          is_admin?: boolean;
          is_blocked?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          role?: "seafarer" | "company";
          is_admin?: boolean;
          is_blocked?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      news_articles: {
        Row: {
          id: string;
          title: Record<string, string>;
          body: Record<string, string>;
          tag: string | null;
          cover_gradient: string | null;
          cover_url: string | null;
          is_published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          title: Record<string, string>;
          body: Record<string, string>;
          tag?: string | null;
          cover_gradient?: string | null;
          cover_url?: string | null;
          is_published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          title?: Record<string, string>;
          body?: Record<string, string>;
          tag?: string | null;
          cover_gradient?: string | null;
          cover_url?: string | null;
          is_published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      seafarers: {
        Row: {
          id: string;
          first_name: string | null;
          last_name: string | null;
          photo_url: string | null;
          nationality: string | null;
          date_of_birth: string | null;
          phone: string | null;
          rank: string | null;
          readiness_date: string | null;
          about: string | null;
          updated_at: string | null;
        };
        Insert: {
          id: string;
          first_name?: string | null;
          last_name?: string | null;
          photo_url?: string | null;
          nationality?: string | null;
          date_of_birth?: string | null;
          phone?: string | null;
          rank?: string | null;
          readiness_date?: string | null;
          about?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          first_name?: string | null;
          last_name?: string | null;
          photo_url?: string | null;
          nationality?: string | null;
          date_of_birth?: string | null;
          phone?: string | null;
          rank?: string | null;
          readiness_date?: string | null;
          about?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      certificates: {
        Row: {
          id: string;
          seafarer_id: string;
          name: string;
          number: string | null;
          issue_date: string | null;
          expiry_date: string | null;
          issuing_authority: string | null;
          file_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          seafarer_id: string;
          name: string;
          number?: string | null;
          issue_date?: string | null;
          expiry_date?: string | null;
          issuing_authority?: string | null;
          file_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          seafarer_id?: string;
          name?: string;
          number?: string | null;
          issue_date?: string | null;
          expiry_date?: string | null;
          issuing_authority?: string | null;
          file_url?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      sea_experience: {
        Row: {
          id: string;
          seafarer_id: string;
          vessel_name: string;
          vessel_type: string | null;
          rank: string | null;
          company: string | null;
          flag: string | null;
          imo_number: string | null;
          from_date: string | null;
          to_date: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          seafarer_id: string;
          vessel_name: string;
          vessel_type?: string | null;
          rank?: string | null;
          company?: string | null;
          flag?: string | null;
          imo_number?: string | null;
          from_date?: string | null;
          to_date?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          seafarer_id?: string;
          vessel_name?: string;
          vessel_type?: string | null;
          rank?: string | null;
          company?: string | null;
          flag?: string | null;
          imo_number?: string | null;
          from_date?: string | null;
          to_date?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      companies: {
        Row: {
          id: string;
          name: string | null;
          logo_url: string | null;
          location: string | null;
          description: string | null;
          website: string | null;
          updated_at: string | null;
          is_verified: boolean;
        };
        Insert: {
          id: string;
          name?: string | null;
          logo_url?: string | null;
          location?: string | null;
          description?: string | null;
          website?: string | null;
          updated_at?: string | null;
          is_verified?: boolean;
        };
        Update: {
          id?: string;
          name?: string | null;
          logo_url?: string | null;
          location?: string | null;
          description?: string | null;
          website?: string | null;
          updated_at?: string | null;
          is_verified?: boolean;
        };
        Relationships: [];
      };
      vacancies: {
        Row: {
          id: string;
          company_id: string;
          title: string;
          rank: string | null;
          vessel_type: string | null;
          salary_from: number | null;
          salary_to: number | null;
          currency: string;
          contract_duration: string | null;
          joining_date: string | null;
          description: string | null;
          is_active: boolean;
          is_imported: boolean;
          source_url: string | null;
          views_count: number;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          company_id: string;
          title: string;
          rank?: string | null;
          vessel_type?: string | null;
          salary_from?: number | null;
          salary_to?: number | null;
          currency?: string;
          contract_duration?: string | null;
          joining_date?: string | null;
          description?: string | null;
          is_active?: boolean;
          is_imported?: boolean;
          source_url?: string | null;
          views_count?: number;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          company_id?: string;
          title?: string;
          rank?: string | null;
          vessel_type?: string | null;
          salary_from?: number | null;
          salary_to?: number | null;
          currency?: string;
          contract_duration?: string | null;
          joining_date?: string | null;
          description?: string | null;
          is_active?: boolean;
          is_imported?: boolean;
          source_url?: string | null;
          views_count?: number;
          created_at?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      applications: {
        Row: {
          id: string;
          vacancy_id: string;
          seafarer_id: string;
          cover_letter: string | null;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          vacancy_id: string;
          seafarer_id: string;
          cover_letter?: string | null;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          vacancy_id?: string;
          seafarer_id?: string;
          cover_letter?: string | null;
          status?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      saved_vacancies: {
        Row: {
          vacancy_id: string;
          seafarer_id: string;
          created_at: string;
        };
        Insert: {
          vacancy_id: string;
          seafarer_id: string;
          created_at?: string;
        };
        Update: {
          vacancy_id?: string;
          seafarer_id?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      forum_topics: {
        Row: {
          id: string;
          user_id: string | null;
          author_name: string | null;
          title: string;
          content: string;
          is_pinned: boolean;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          author_name?: string | null;
          title: string;
          content: string;
          is_pinned?: boolean;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          author_name?: string | null;
          title?: string;
          content?: string;
          is_pinned?: boolean;
          created_at?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      forum_posts: {
        Row: {
          id: string;
          topic_id: string;
          user_id: string | null;
          author_name: string | null;
          content: string;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          topic_id: string;
          user_id?: string | null;
          author_name?: string | null;
          content: string;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          topic_id?: string;
          user_id?: string | null;
          author_name?: string | null;
          content?: string;
          created_at?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      messages: {
        Row: {
          id: string;
          user_id: string | null;
          name: string | null;
          email: string | null;
          subject: string | null;
          content: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          name?: string | null;
          email?: string | null;
          subject?: string | null;
          content: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          name?: string | null;
          email?: string | null;
          subject?: string | null;
          content?: string;
          is_read?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          body: string | null;
          link: string | null;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          title: string;
          body?: string | null;
          link?: string | null;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: string;
          title?: string;
          body?: string | null;
          link?: string | null;
          is_read?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      job_alerts: {
        Row: {
          seafarer_id: string;
          rank: string;
          created_at: string;
        };
        Insert: {
          seafarer_id: string;
          rank: string;
          created_at?: string;
        };
        Update: {
          seafarer_id?: string;
          rank?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: {
      increment_vacancy_views: {
        Args: { vid: string };
        Returns: undefined;
      };
    };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
}

// Convenience types
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Seafarer = Database["public"]["Tables"]["seafarers"]["Row"];
export type Certificate = Database["public"]["Tables"]["certificates"]["Row"];
export type SeaExperience = Database["public"]["Tables"]["sea_experience"]["Row"];
export type Company = Database["public"]["Tables"]["companies"]["Row"];
export type Vacancy = Database["public"]["Tables"]["vacancies"]["Row"];
export type ForumTopic = Database["public"]["Tables"]["forum_topics"]["Row"];
export type ForumPost = Database["public"]["Tables"]["forum_posts"]["Row"];
export type NewsArticle = Database["public"]["Tables"]["news_articles"]["Row"];
export type Application = Database["public"]["Tables"]["applications"]["Row"];
export type SavedVacancy = Database["public"]["Tables"]["saved_vacancies"]["Row"];
