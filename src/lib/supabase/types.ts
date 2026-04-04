export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          business_name: string | null
          website_url: string | null
          package_tier: 'starter' | 'growth' | 'premium' | null
          avatar_url: string | null
          bio: string | null
          is_admin: boolean
          onboarding_complete: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          business_name?: string | null
          website_url?: string | null
          package_tier?: 'starter' | 'growth' | 'premium' | null
          avatar_url?: string | null
          bio?: string | null
          is_admin?: boolean
          onboarding_complete?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_name?: string | null
          website_url?: string | null
          package_tier?: 'starter' | 'growth' | 'premium' | null
          avatar_url?: string | null
          bio?: string | null
          is_admin?: boolean
          onboarding_complete?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      guides: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string
          category: 'trailhead' | 'quick-wins' | 'deep-dives'
          trailhead_milestone: number | null
          trailhead_order: number | null
          difficulty: 'quick' | 'standard' | 'advanced'
          read_time_minutes: number
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt: string
          category: 'trailhead' | 'quick-wins' | 'deep-dives'
          trailhead_milestone?: number | null
          trailhead_order?: number | null
          difficulty: 'quick' | 'standard' | 'advanced'
          read_time_minutes: number
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string
          category?: 'trailhead' | 'quick-wins' | 'deep-dives'
          trailhead_milestone?: number | null
          trailhead_order?: number | null
          difficulty?: 'quick' | 'standard' | 'advanced'
          read_time_minutes?: number
          published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      user_guide_progress: {
        Row: {
          id: string
          user_id: string
          guide_id: string
          completed: boolean
          progress_percent: number
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          guide_id: string
          completed?: boolean
          progress_percent?: number
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          guide_id?: string
          completed?: boolean
          progress_percent?: number
          completed_at?: string | null
          created_at?: string
        }
      }
      videos: {
        Row: {
          id: string
          title: string
          youtube_url: string
          thumbnail_url: string | null
          category: string
          description: string
          duration_seconds: number
          order_index: number
          published: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          youtube_url: string
          thumbnail_url?: string | null
          category: string
          description: string
          duration_seconds: number
          order_index: number
          published?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          youtube_url?: string
          thumbnail_url?: string | null
          category?: string
          description?: string
          duration_seconds?: number
          order_index?: number
          published?: boolean
          created_at?: string
        }
      }
      faq: {
        Row: {
          id: string
          question: string
          answer: string
          category: string
          order_index: number
        }
        Insert: {
          id?: string
          question: string
          answer: string
          category: string
          order_index: number
        }
        Update: {
          id?: string
          question?: string
          answer?: string
          category?: string
          order_index?: number
        }
      }
      tickets: {
        Row: {
          id: string
          user_id: string
          subject: string
          message: string
          status: 'open' | 'in_progress' | 'resolved'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subject: string
          message: string
          status?: 'open' | 'in_progress' | 'resolved'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          subject?: string
          message?: string
          status?: 'open' | 'in_progress' | 'resolved'
          created_at?: string
          updated_at?: string
        }
      }
      ticket_replies: {
        Row: {
          id: string
          ticket_id: string
          user_id: string
          message: string
          is_admin: boolean
          created_at: string
        }
        Insert: {
          id?: string
          ticket_id: string
          user_id: string
          message: string
          is_admin?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          ticket_id?: string
          user_id?: string
          message?: string
          is_admin?: boolean
          created_at?: string
        }
      }
      forum_posts: {
        Row: {
          id: string
          user_id: string
          title: string
          content: string
          category: 'wins' | 'questions' | 'tips' | 'show-work'
          pinned: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          content: string
          category: 'wins' | 'questions' | 'tips' | 'show-work'
          pinned?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          content?: string
          category?: 'wins' | 'questions' | 'tips' | 'show-work'
          pinned?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      forum_replies: {
        Row: {
          id: string
          post_id: string
          user_id: string
          content: string
          helpful_count: number
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          user_id: string
          content: string
          helpful_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          user_id?: string
          content?: string
          helpful_count?: number
          created_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          slug: string
          name: string
          description: string
          icon_name: string
          order_index: number
        }
        Insert: {
          id?: string
          slug: string
          name: string
          description: string
          icon_name: string
          order_index: number
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          description?: string
          icon_name?: string
          order_index?: number
        }
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: string
          earned_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_id: string
          earned_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          achievement_id?: string
          earned_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Guide = Database['public']['Tables']['guides']['Row']
export type UserGuideProgress = Database['public']['Tables']['user_guide_progress']['Row']
export type Video = Database['public']['Tables']['videos']['Row']
export type FAQ = Database['public']['Tables']['faq']['Row']
export type Ticket = Database['public']['Tables']['tickets']['Row']
export type TicketReply = Database['public']['Tables']['ticket_replies']['Row']
export type ForumPost = Database['public']['Tables']['forum_posts']['Row']
export type ForumReply = Database['public']['Tables']['forum_replies']['Row']
export type Achievement = Database['public']['Tables']['achievements']['Row']
export type UserAchievement = Database['public']['Tables']['user_achievements']['Row']
