import Link from "next/link"
import { ImageIcon, BookOpen, Mail, Plus } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

const serviceLabels: Record<string, string> = {
  web: "Web制作",
  webapp: "Webアプリ制作",
  banner: "バナー制作",
  dtp: "DTP制作",
  other: "その他",
}

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [worksRes, blogRes, contactsRes, unreadRes] = await Promise.all([
    supabase.from("works").select("id", { count: "exact", head: true }),
    supabase.from("blog_posts").select("id", { count: "exact", head: true }),
    supabase.from("contacts").select("id", { count: "exact", head: true }),
    supabase.from("contacts").select("id", { count: "exact", head: true }).eq("is_read", false),
  ])

  const { data: recentContacts } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  const stats = [
    {
      label: "制作実績",
      value: worksRes.count ?? 0,
      icon: ImageIcon,
      href: "/admin/works",
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "ブログ記事",
      value: blogRes.count ?? 0,
      icon: BookOpen,
      href: "/admin/blog",
      color: "bg-green-50 text-green-600",
    },
    {
      label: "お問い合わせ",
      value: contactsRes.count ?? 0,
      icon: Mail,
      href: "/admin/contacts",
      color: "bg-orange-50 text-orange-600",
    },
    {
      label: "未読",
      value: unreadRes.count ?? 0,
      icon: Mail,
      href: "/admin/contacts",
      color: "bg-red-50 text-red-600",
    },
  ]

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-medium">ダッシュボード</h1>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-background rounded-lg border p-5 hover:shadow-sm transition-shadow"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="mt-3 text-2xl font-semibold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-medium mb-4">クイックアクション</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/works/new"
              className="flex items-center gap-2 px-4 py-2 bg-foreground text-background text-sm rounded-md hover:bg-foreground/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              新しい実績を追加
            </Link>
            <Link
              href="/admin/blog/new"
              className="flex items-center gap-2 px-4 py-2 bg-foreground text-background text-sm rounded-md hover:bg-foreground/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              新しい記事を追加
            </Link>
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">最新のお問い合わせ</h2>
            <Link href="/admin/contacts" className="text-sm text-muted-foreground hover:text-foreground">
              すべて見る →
            </Link>
          </div>

          <div className="bg-background rounded-lg border overflow-hidden">
            {recentContacts && recentContacts.length > 0 ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left px-4 py-3 font-medium">名前</th>
                    <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">相談内容</th>
                    <th className="text-left px-4 py-3 font-medium hidden md:table-cell">日時</th>
                    <th className="text-left px-4 py-3 font-medium">状態</th>
                  </tr>
                </thead>
                <tbody>
                  {recentContacts.map((contact) => (
                    <tr key={contact.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-muted-foreground text-xs">{contact.email}</p>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">
                        {serviceLabels[contact.service] ?? contact.service}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">
                        {formatDate(contact.created_at)}
                      </td>
                      <td className="px-4 py-3">
                        {contact.is_read ? (
                          <span className="text-xs text-muted-foreground">既読</span>
                        ) : (
                          <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">未読</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-muted-foreground py-8 text-sm">
                お問い合わせはまだありません
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
