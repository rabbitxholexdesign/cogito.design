import Link from "next/link"
import { Plus, Pencil } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { BlogDeleteButton } from "./delete-button"

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("ja-JP")
}

export default async function AdminBlogPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, title, category, is_published, published_at")
    .order("published_at", { ascending: false })

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-medium">Blog 管理</h1>
          <Link
            href="/admin/blog/new"
            className="flex items-center gap-2 px-4 py-2 bg-foreground text-background text-sm rounded-md hover:bg-foreground/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            新規追加
          </Link>
        </div>

        <div className="bg-background rounded-lg border overflow-hidden">
          {posts && posts.length > 0 ? (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left px-4 py-3 font-medium">タイトル</th>
                  <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">カテゴリ</th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">公開日</th>
                  <th className="text-left px-4 py-3 font-medium">状態</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 font-medium">{post.title}</td>
                    <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">{post.category}</td>
                    <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">
                      {formatDate(post.published_at)}
                    </td>
                    <td className="px-4 py-3">
                      {post.is_published ? (
                        <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">公開</span>
                      ) : (
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">非公開</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/blog/${post.id}/edit`}
                          className="p-1.5 rounded hover:bg-muted transition-colors"
                          title="編集"
                        >
                          <Pencil className="w-4 h-4 text-muted-foreground" />
                        </Link>
                        <BlogDeleteButton postId={post.id} postTitle={post.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-sm">記事がまだありません</p>
              <Link
                href="/admin/blog/new"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium hover:underline"
              >
                <Plus className="w-4 h-4" />
                最初の記事を追加する
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
