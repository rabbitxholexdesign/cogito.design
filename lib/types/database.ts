export type Database = {
  public: {
    Tables: {
      works: {
        Row: {
          id: string
          title: string
          slug: string
          category: string
          category_slug: string
          description: string
          content: string | null
          thumbnail_url: string | null
          client: string | null
          period: string | null
          services: string[]
          url: string | null
          is_published: boolean
          published_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          category: string
          category_slug: string
          description: string
          content?: string | null
          thumbnail_url?: string | null
          client?: string | null
          period?: string | null
          services?: string[]
          url?: string | null
          is_published?: boolean
          published_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          category?: string
          category_slug?: string
          description?: string
          content?: string | null
          thumbnail_url?: string | null
          client?: string | null
          period?: string | null
          services?: string[]
          url?: string | null
          is_published?: boolean
          published_at?: string
          updated_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          category: string
          category_slug: string
          excerpt: string
          content: string
          thumbnail_url: string | null
          author: string
          is_published: boolean
          published_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          category: string
          category_slug: string
          excerpt: string
          content: string
          thumbnail_url?: string | null
          author?: string
          is_published?: boolean
          published_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          category?: string
          category_slug?: string
          excerpt?: string
          content?: string
          thumbnail_url?: string | null
          author?: string
          is_published?: boolean
          published_at?: string
          updated_at?: string
        }
      }
      contacts: {
        Row: {
          id: string
          name: string
          company: string | null
          email: string
          phone: string | null
          service: string
          message: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          company?: string | null
          email: string
          phone?: string | null
          service: string
          message: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          is_read?: boolean
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
