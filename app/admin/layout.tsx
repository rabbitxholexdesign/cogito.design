import Link from "next/link"
import { redirect } from "next/navigation"
import { LayoutDashboard, ImageIcon, BookOpen, Mail, LogOut, ExternalLink } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { AdminLogoutButton } from "./logout-button"

const navItems = [
  { href: "/admin", label: "ダッシュボード", icon: LayoutDashboard, exact: true },
  { href: "/admin/works", label: "Works", icon: ImageIcon },
  { href: "/admin/blog", label: "Blog", icon: BookOpen },
  { href: "/admin/contacts", label: "お問い合わせ", icon: Mail },
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen flex bg-muted/20">
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 bg-background border-r flex flex-col">
        {/* Logo */}
        <div className="px-6 py-5 border-b">
          <span className="font-medium text-sm">cogito.design</span>
          <p className="text-xs text-muted-foreground mt-0.5">管理画面</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 text-sm rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <ExternalLink className="w-4 h-4 flex-shrink-0" />
            サイトを開く
          </Link>
          <AdminLogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
