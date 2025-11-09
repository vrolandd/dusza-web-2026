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
  public: {
    Tables: {
      battle_cards: {
        Row: {
          attack_snapshot: number
          battle_id: string | null
          created_at: string | null
          element_snapshot: string
          hp_snapshot: number
          id: string
          order_index: number
          origin_card_id: string
          origin_type: string
        }
        Insert: {
          attack_snapshot: number
          battle_id?: string | null
          created_at?: string | null
          element_snapshot: string
          hp_snapshot: number
          id?: string
          order_index: number
          origin_card_id: string
          origin_type: string
        }
        Update: {
          attack_snapshot?: number
          battle_id?: string | null
          created_at?: string | null
          element_snapshot?: string
          hp_snapshot?: number
          id?: string
          order_index?: number
          origin_card_id?: string
          origin_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "battle_cards_battle_id_fkey"
            columns: ["battle_id"]
            isOneToOne: false
            referencedRelation: "battles"
            referencedColumns: ["id"]
          },
        ]
      }
      battle_tick_meta: {
        Row: {
          battle_id: string | null
          draws: number | null
          dungeon_wins: number | null
          ended_at: string | null
          id: string
          player_wins: number | null
          result: string | null
          started_at: string | null
          tick_number: number
        }
        Insert: {
          battle_id?: string | null
          draws?: number | null
          dungeon_wins?: number | null
          ended_at?: string | null
          id?: string
          player_wins?: number | null
          result?: string | null
          started_at?: string | null
          tick_number: number
        }
        Update: {
          battle_id?: string | null
          draws?: number | null
          dungeon_wins?: number | null
          ended_at?: string | null
          id?: string
          player_wins?: number | null
          result?: string | null
          started_at?: string | null
          tick_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "battle_tick_meta_battle_id_fkey"
            columns: ["battle_id"]
            isOneToOne: false
            referencedRelation: "battles"
            referencedColumns: ["id"]
          },
        ]
      }
      battle_ticks: {
        Row: {
          battle_id: string | null
          created_at: string | null
          dungeon_card_battle_id: string | null
          dungeon_damage: number | null
          dungeon_hp_before: number | null
          id: number
          player_card_battle_id: string | null
          player_damage: number | null
          player_hp_before: number | null
          reason: string | null
          tick_number: number
          winner: string | null
        }
        Insert: {
          battle_id?: string | null
          created_at?: string | null
          dungeon_card_battle_id?: string | null
          dungeon_damage?: number | null
          dungeon_hp_before?: number | null
          id?: number
          player_card_battle_id?: string | null
          player_damage?: number | null
          player_hp_before?: number | null
          reason?: string | null
          tick_number: number
          winner?: string | null
        }
        Update: {
          battle_id?: string | null
          created_at?: string | null
          dungeon_card_battle_id?: string | null
          dungeon_damage?: number | null
          dungeon_hp_before?: number | null
          id?: number
          player_card_battle_id?: string | null
          player_damage?: number | null
          player_hp_before?: number | null
          reason?: string | null
          tick_number?: number
          winner?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "battle_ticks_battle_id_fkey"
            columns: ["battle_id"]
            isOneToOne: false
            referencedRelation: "battles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "battle_ticks_dungeon_card_battle_id_fkey"
            columns: ["dungeon_card_battle_id"]
            isOneToOne: false
            referencedRelation: "battle_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "battle_ticks_player_card_battle_id_fkey"
            columns: ["player_card_battle_id"]
            isOneToOne: false
            referencedRelation: "battle_cards"
            referencedColumns: ["id"]
          },
        ]
      }
      battles: {
        Row: {
          draws: number | null
          dungeon_id: string | null
          dungeon_wins: number | null
          finished_at: string | null
          id: string
          player_id: string | null
          player_wins: number | null
          started_at: string | null
          status: string | null
          tick_number: number | null
          winner: string | null
        }
        Insert: {
          draws?: number | null
          dungeon_id?: string | null
          dungeon_wins?: number | null
          finished_at?: string | null
          id?: string
          player_id?: string | null
          player_wins?: number | null
          started_at?: string | null
          status?: string | null
          tick_number?: number | null
          winner?: string | null
        }
        Update: {
          draws?: number | null
          dungeon_id?: string | null
          dungeon_wins?: number | null
          finished_at?: string | null
          id?: string
          player_id?: string | null
          player_wins?: number | null
          started_at?: string | null
          status?: string | null
          tick_number?: number | null
          winner?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "battles_dungeon_id_fkey"
            columns: ["dungeon_id"]
            isOneToOne: false
            referencedRelation: "dungeons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "battles_dungeon_id_fkey"
            columns: ["dungeon_id"]
            isOneToOne: false
            referencedRelation: "public_dungeon_cards"
            referencedColumns: ["dungeon_id"]
          },
          {
            foreignKeyName: "battles_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player_battle_stats"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "battles_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player_card_leaderboard"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "battles_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      dungeon_cards: {
        Row: {
          attack: number
          bucket_id: string | null
          created_at: string | null
          dungeon_id: string | null
          element: string
          hp: number
          id: string
          islead: boolean | null
          name: string
        }
        Insert: {
          attack: number
          bucket_id?: string | null
          created_at?: string | null
          dungeon_id?: string | null
          element: string
          hp: number
          id?: string
          islead?: boolean | null
          name: string
        }
        Update: {
          attack?: number
          bucket_id?: string | null
          created_at?: string | null
          dungeon_id?: string | null
          element?: string
          hp?: number
          id?: string
          islead?: boolean | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "dungeon_cards_dungeon_id_fkey"
            columns: ["dungeon_id"]
            isOneToOne: false
            referencedRelation: "dungeons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dungeon_cards_dungeon_id_fkey"
            columns: ["dungeon_id"]
            isOneToOne: false
            referencedRelation: "public_dungeon_cards"
            referencedColumns: ["dungeon_id"]
          },
        ]
      }
      dungeons: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          type: Database["public"]["Enums"]["dungeon_type"]
          xp_value: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          type?: Database["public"]["Enums"]["dungeon_type"]
          xp_value?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          type?: Database["public"]["Enums"]["dungeon_type"]
          xp_value?: number | null
        }
        Relationships: []
      }
      player_cards: {
        Row: {
          attack: number
          bucket_id: string | null
          created_at: string | null
          element: string
          hp: number
          id: string
          islead: boolean
          name: string
          player_id: string | null
        }
        Insert: {
          attack: number
          bucket_id?: string | null
          created_at?: string | null
          element: string
          hp: number
          id?: string
          islead?: boolean
          name: string
          player_id?: string | null
        }
        Update: {
          attack?: number
          bucket_id?: string | null
          created_at?: string | null
          element?: string
          hp?: number
          id?: string
          islead?: boolean
          name?: string
          player_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "player_cards_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player_battle_stats"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "player_cards_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player_card_leaderboard"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "player_cards_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      player_deck_cards: {
        Row: {
          deck_id: string | null
          id: string
          player_card_id: string | null
          position: number
        }
        Insert: {
          deck_id?: string | null
          id?: string
          player_card_id?: string | null
          position: number
        }
        Update: {
          deck_id?: string | null
          id?: string
          player_card_id?: string | null
          position?: number
        }
        Relationships: [
          {
            foreignKeyName: "player_deck_cards_deck_id_fkey"
            columns: ["deck_id"]
            isOneToOne: false
            referencedRelation: "player_decks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_deck_cards_player_card_id_fkey"
            columns: ["player_card_id"]
            isOneToOne: false
            referencedRelation: "player_card_leaderboard"
            referencedColumns: ["player_card_id"]
          },
          {
            foreignKeyName: "player_deck_cards_player_card_id_fkey"
            columns: ["player_card_id"]
            isOneToOne: false
            referencedRelation: "player_cards"
            referencedColumns: ["id"]
          },
        ]
      }
      player_decks: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          player_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          player_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          player_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "player_decks_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player_battle_stats"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "player_decks_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player_card_leaderboard"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "player_decks_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          created_at: string | null
          id: string
          user_id: string | null
          username: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          user_id?: string | null
          username: string
        }
        Update: {
          created_at?: string | null
          id?: string
          user_id?: string | null
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      player_battle_stats: {
        Row: {
          battles_drawn: number | null
          battles_lost: number | null
          battles_won: number | null
          player_id: string | null
          total_battles: number | null
          total_draws: number | null
          total_dungeon_wins: number | null
          total_player_wins: number | null
          username: string | null
        }
        Relationships: []
      }
      player_card_leaderboard: {
        Row: {
          card_xp: number | null
          player_card_id: string | null
          player_card_name: string | null
          player_id: string | null
          rank_position: number | null
          username: string | null
        }
        Relationships: []
      }
      public_dungeon_cards: {
        Row: {
          attack: number | null
          card_id: string | null
          card_name: string | null
          created_at: string | null
          dungeon_id: string | null
          dungeon_name: string | null
          dungeon_type: Database["public"]["Enums"]["dungeon_type"] | null
          element: string | null
          hp: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      finalize_battle: {
        Args: { p_battle_id: string; p_target_player_card_id: string }
        Returns: Json
      }
      start_battle: { Args: { p_dungeon_id: string }; Returns: string }
    }
    Enums: {
      dungeon_type: "simple" | "small" | "large"
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
  public: {
    Enums: {
      dungeon_type: ["simple", "small", "large"],
    },
  },
} as const
