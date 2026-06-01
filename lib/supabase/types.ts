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
          created_at: string;
        };
        Insert: {
          id: string;
          role: "seafarer" | "company";
          created_at?: string;
        };
        Update: {
          id?: string;
          role?: "seafarer" | "company";
          created_at?: string;
        };
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
        };
        Insert: {
          id: string;
          name?: string | null;
          logo_url?: string | null;
          location?: string | null;
          description?: string | null;
          website?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string | null;
          logo_url?: string | null;
          location?: string | null;
          description?: string | null;
          website?: string | null;
          updated_at?: string | null;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// Convenience types
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Seafarer = Database["public"]["Tables"]["seafarers"]["Row"];
export type Certificate = Database["public"]["Tables"]["certificates"]["Row"];
export type SeaExperience = Database["public"]["Tables"]["sea_experience"]["Row"];
export type Company = Database["public"]["Tables"]["companies"]["Row"];
