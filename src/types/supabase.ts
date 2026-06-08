export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  la_esponjita_laundry: {
    Tables: {
      notes: {
        Row: {
          active: boolean
          aditional_payments: number
          client_name: string
          client_phone: string | null
          comments: string | null
          created_at: string
          created_by_id: string
          created_by_name: string
          delivery_date: string
          delivery_time: string
          deposit: number
          folio: number
          id: string
          status: string
          total: number
          updated_at: string | null
          updated_by_id: string | null
          updated_by_name: string | null
        }
        Insert: {
          active?: boolean
          aditional_payments?: number
          client_name: string
          client_phone?: string | null
          comments?: string | null
          created_at?: string
          created_by_id: string
          created_by_name: string
          delivery_date: string
          delivery_time: string
          deposit?: number
          folio: number
          id?: string
          status?: string
          total?: number
          updated_at?: string | null
          updated_by_id?: string | null
          updated_by_name?: string | null
        }
        Update: {
          active?: boolean
          aditional_payments?: number
          client_name?: string
          client_phone?: string | null
          comments?: string | null
          created_at?: string
          created_by_id?: string
          created_by_name?: string
          delivery_date?: string
          delivery_time?: string
          deposit?: number
          folio?: number
          id?: string
          status?: string
          total?: number
          updated_at?: string | null
          updated_by_id?: string | null
          updated_by_name?: string | null
        }
        Relationships: []
      }
      notes_services: {
        Row: {
          created_at: string
          id: string
          note_id: string
          quantity: number
          service_id: string
          service_name: string
          total: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          id?: string
          note_id: string
          quantity: number
          service_id: string
          service_name: string
          total: number
          unit_price: number
        }
        Update: {
          created_at?: string
          id?: string
          note_id?: string
          quantity?: number
          service_id?: string
          service_name?: string
          total?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "notes_items_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          active: boolean | null
          created_at: string | null
          email: string
          id: string
          name: string
          rol: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          email: string
          id: string
          name: string
          rol?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          rol?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          active: boolean
          created_at: string
          has_promo: boolean
          id: string
          name: string
          price: number
          promo_rules: Json | null
          promo_type: string | null
          unit: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          has_promo?: boolean
          id?: string
          name: string
          price: number
          promo_rules?: Json | null
          promo_type?: string | null
          unit: string
        }
        Update: {
          active?: boolean
          created_at?: string
          has_promo?: boolean
          id?: string
          name?: string
          price?: number
          promo_rules?: Json | null
          promo_type?: string | null
          unit?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_note_with_services: {
        Args: { note_data: Json; services_data: Json }
        Returns: {
          active: boolean
          aditional_payments: number
          client_name: string
          client_phone: string | null
          comments: string | null
          created_at: string
          created_by_id: string
          created_by_name: string
          delivery_date: string
          delivery_time: string
          deposit: number
          folio: number
          id: string
          status: string
          total: number
          updated_at: string | null
          updated_by_id: string | null
          updated_by_name: string | null
        }
        SetofOptions: {
          from: "*"
          to: "notes"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      create_profile: {
        Args: { user_email: string; user_id: string; user_meta: Json }
        Returns: undefined
      }
      is_admin: { Args: never; Returns: boolean }
      is_employee: { Args: never; Returns: boolean }
      update_note_and_services: {
        Args: { note_data: Json; services_data: Json }
        Returns: {
          active: boolean
          aditional_payments: number
          client_name: string
          client_phone: string | null
          comments: string | null
          created_at: string
          created_by_id: string
          created_by_name: string
          delivery_date: string
          delivery_time: string
          deposit: number
          folio: number
          id: string
          status: string
          total: number
          updated_at: string | null
          updated_by_id: string | null
          updated_by_name: string | null
        }
        SetofOptions: {
          from: "*"
          to: "notes"
          isOneToOne: true
          isSetofReturn: false
        }
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  la_esponjita_laundry: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
