"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { Database } from "@/lib/types/database"

type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"]

const categoryOptions = [
  { label: "デザイン", slug: "design" },
  { label: "Web制作", slug: "web" },
  { label: "DTP", slug: "dtp" },
  { label: "その他", slug: "other" },
]

interface Props {
  initialData?: BlogPost
}

export function BlogForm({ initialData }: Props) {
  const router = useRouter()
  const isEdit = !!initialData

  const [form, setForm] = useState({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    category: initialData?.category ?? "デザイン",
    category_slug: initialData?.category_slug ?? "design",
    excerpt: initialData?.excerpt ?? "",
    content: initialData?.content ?? "",
    thumbnail_url: initialData?.thumbnail_url ?? "",
    author: initialData?.author ?? "cogito.design",
    is_published: initialData?.is_published ?? true,
    published_at: initialData?.published_at
      ? new Date(initialData.published_at).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCategoryChange = (slug: string) => {
    const cat = categoryOptions.find((c) => c.slug === slug)
    if (cat) {
      setForm((prev) => ({
        ...prev,
        category: cat.label,
        category_slug: cat.slug,
      }))
    }
  }

  const generateSlug = () => {
    const date = new Date()
    const slug = `post-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}-${Date.now().toString().slice(-4)}`
    setForm((prev) => ({ ...prev, slug }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!form.title || !form.slug || !form.excerpt || !form.content) {
      setError("タイトル、スラッグ、抜粋、本文は必須です")
      setIsLoading(false)
      return
    }

    const supabase = createClient()
    const payload = {
      title: form.title,
      slug: form.slug,
      category: form.category,
      category_slug: form.category_slug,
      excerpt: form.excerpt,
      content: form.content,
      thumbnail_url: form.thumbnail_url || null,
      author: form.author || "cogito.design",
      is_published: form.is_published,
      published_at: new Date(form.published_at).toISOString(),
    }

    let queryError
    if (isEdit && initialData) {
      const { error } = await supabase
        .from("blog_posts")
        .update(payload)
        .eq("id", initialData.id)
      queryError = error
    } else {
      const { error } = await supabase.from("blog_posts").insert(payload)
      queryError = error
    }

    if (queryError) {
      setError(queryError.message)
      setIsLoading(false)
      return
    }

    router.push("/admin/blog")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-2">
          タイトル <span className="text-destructive">*</span>
        </label>
        <Input
          value={form.title}
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          placeholder="2024年のWebデザイントレンド5選"
          required
        />
      </div>

      {/* Slug */}
      <div>
        <label className="block text-sm font-medium mb-2">
          スラッグ（URLに使用） <span className="text-destructive">*</span>
        </label>
        <div className="flex gap-2">
          <Input
            value={form.slug}
            onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
            placeholder="web-design-trends-2024"
            required
          />
          <Button type="button" variant="outline" onClick={generateSlug} className="flex-shrink-0">
            自動生成
          </Button>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          例: web-design-trends-2024（半角英数字・ハイフンのみ）
        </p>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium mb-2">カテゴリ</label>
        <select
          value={form.category_slug}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {categoryOptions.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Excerpt */}
      <div>
        <label className="block text-sm font-medium mb-2">
          抜粋（一覧ページに表示） <span className="text-destructive">*</span>
        </label>
        <Textarea
          value={form.excerpt}
          onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
          placeholder="記事の要約を2〜3文で入力してください"
          rows={3}
          required
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium mb-2">
          本文（Markdown対応） <span className="text-destructive">*</span>
        </label>
        <Textarea
          value={form.content}
          onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
          placeholder={`## はじめに\n\n本文を入力してください。\n\n## 見出し2\n\n- リスト項目`}
          rows={16}
          className="font-mono text-sm"
          required
        />
        <p className="mt-1 text-xs text-muted-foreground">
          ## 見出し / - リスト / 通常テキスト が使えます
        </p>
      </div>

      {/* Thumbnail URL */}
      <div>
        <label className="block text-sm font-medium mb-2">サムネイル URL</label>
        <Input
          type="url"
          value={form.thumbnail_url}
          onChange={(e) => setForm((prev) => ({ ...prev, thumbnail_url: e.target.value }))}
          placeholder="https://..."
        />
      </div>

      {/* Author */}
      <div>
        <label className="block text-sm font-medium mb-2">著者</label>
        <Input
          value={form.author}
          onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))}
          placeholder="cogito.design"
        />
      </div>

      {/* Published At */}
      <div>
        <label className="block text-sm font-medium mb-2">公開日</label>
        <Input
          type="date"
          value={form.published_at}
          onChange={(e) => setForm((prev) => ({ ...prev, published_at: e.target.value }))}
        />
      </div>

      {/* Is Published */}
      <div className="flex items-center gap-3">
        <input
          id="is_published"
          type="checkbox"
          checked={form.is_published}
          onChange={(e) => setForm((prev) => ({ ...prev, is_published: e.target.checked }))}
          className="w-4 h-4"
        />
        <label htmlFor="is_published" className="text-sm font-medium">
          公開する
        </label>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-md bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "保存中..." : isEdit ? "更新する" : "追加する"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/blog")}
        >
          キャンセル
        </Button>
      </div>
    </form>
  )
}
