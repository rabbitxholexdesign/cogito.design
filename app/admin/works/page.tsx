import Link from "next/link"
import { Plus, Pencil } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { WorkDeleteButton } from "./delete-button"

export default async function AdminWorksPage() {
  const supabase = await createClient()
  const { data: works } = await supabase
    .from("works")
    .select("id, title, category, is_published, published_at")
    .order("published_at", { ascending: false })

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-medium">Works 管理</h1>
          <Link
            href="/admin/works/new"
            className="flex items-center gap-2 px-4 py-2 bg-foreground text-background text-sm rounded-md hover:bg-foreground/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            新規追加
          </Link>
        </div>

        <div className="bg-background rounded-lg border overflow-hidden">
          {works && works.length > 0 ? (
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
                {works.map((work) => (
                  <tr key={work.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 font-medium">{work.title}</td>
                    <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">{work.category}</td>
                    <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">
                      {new Date(work.published_at).toLocaleDateString("ja-JP")}
                    </td>
                    <td className="px-4 py-3">
                      {work.is_published ? (
                        <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">公開</span>
                      ) : (
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">非公開</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/works/${work.id}/edit`}
                          className="p-1.5 rounded hover:bg-muted transition-colors"
                          title="編集"
                        >
                          <Pencil className="w-4 h-4 text-muted-foreground" />
                        </Link>
                        <WorkDeleteButton workId={work.id} workTitle={work.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-sm">実績がまだありません</p>
              <Link
                href="/admin/works/new"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium hover:underline"
              >
                <Plus className="w-4 h-4" />
                最初の実績を追加する
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
