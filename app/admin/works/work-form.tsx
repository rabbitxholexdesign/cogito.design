"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { Database } from "@/lib/types/database"

type Work = Database["public"]["Tables"]["works"]["Row"]

const categoryOptions = [
  { label: "Webサイト", slug: "web" },
  { label: "Webアプリ", slug: "webapp" },
  { label: "バナー", slug: "banner" },
  { label: "DTP", slug: "dtp" },
]

interface Props {
  initialData?: Work
}

export function WorkForm({ initialData }: Props) {
  const router = useRouter()
  const isEdit = !!initialData

  const [form, setForm] = useState({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    category: initialData?.category ?? "Webサイト",
    category_slug: initialData?.category_slug ?? "web",
    description: initialData?.description ?? "",
    content: initialData?.content ?? "",
    thumbnail_url: initialData?.thumbnail_url ?? "",
    client: initialData?.client ?? "",
    period: initialData?.period ?? "",
    services: initialData?.services?.join(", ") ?? "",
    url: initialData?.url ?? "",
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
    const slug = `work-${Date.now()}`
    setForm((prev) => ({ ...prev, slug }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!form.title || !form.slug || !form.description) {
      setError("タイトル、スラッグ、概要は必須です")
      setIsLoading(false)
      return
    }

    const supabase = createClient()
    const payload = {
      title: form.title,
      slug: form.slug,
      category: form.category,
      category_slug: form.category_slug,
      description: form.description,
      content: form.content || null,
      thumbnail_url: form.thumbnail_url || null,
      client: form.client || null,
      period: form.period || null,
      services: form.services
        ? form.services.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      url: form.url || null,
      is_published: form.is_published,
      published_at: new Date(form.published_at).toISOString(),
    }

    let queryError
    if (isEdit && initialData) {
      const { error } = await supabase
        .from("works")
        .update(payload)
        .eq("id", initialData.id)
      queryError = error
    } else {
      const { error } = await supabase.from("works").insert(payload)
      queryError = error
    }

    if (queryError) {
      setError(queryError.message)
      setIsLoading(false)
      return
    }

    router.push("/admin/works")
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
          placeholder="コーポレートサイト制作"
          required
        />
      </div>

      {/* Slug */}
      <div>
        <label className="block text-sm font-medium mb-2">
          スラッグ（URL用ID） <span className="text-destructive">*</span>
        </label>
        <div className="flex gap-2">
          <Input
            value={form.slug}
            onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
            placeholder="corporate-site"
            required
          />
          <Button type="button" variant="outline" onClick={generateSlug} className="flex-shrink-0">
            自動生成
          </Button>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          例: corporate-site（半角英数字・ハイフンのみ）
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

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-2">
          概要 <span className="text-destructive">*</span>
        </label>
        <Textarea
          value={form.description}
          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
          placeholder="プロジェクトの概要を入力してください"
          rows={3}
          required
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium mb-2">
          詳細内容（Markdown対応）
        </label>
        <Textarea
          value={form.content}
          onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
          placeholder="## 見出し&#10;&#10;詳細な説明文..."
          rows={10}
          className="font-mono text-sm"
        />
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

      {/* Client / Period */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">クライアント</label>
          <Input
            value={form.client}
            onChange={(e) => setForm((prev) => ({ ...prev, client: e.target.value }))}
            placeholder="株式会社サンプル"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">制作時期</label>
          <Input
            value={form.period}
            onChange={(e) => setForm((prev) => ({ ...prev, period: e.target.value }))}
            placeholder="2024年3月"
          />
        </div>
      </div>

      {/* Services */}
      <div>
        <label className="block text-sm font-medium mb-2">担当領域</label>
        <Input
          value={form.services}
          onChange={(e) => setForm((prev) => ({ ...prev, services: e.target.value }))}
          placeholder="Webデザイン, コーディング, SEO対策"
        />
        <p className="mt-1 text-xs text-muted-foreground">カンマ区切りで複数入力可能</p>
      </div>

      {/* URL */}
      <div>
        <label className="block text-sm font-medium mb-2">公開 URL</label>
        <Input
          type="url"
          value={form.url}
          onChange={(e) => setForm((prev) => ({ ...prev, url: e.target.value }))}
          placeholder="https://example.com"
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
          onClick={() => router.push("/admin/works")}
        >
          キャンセル
        </Button>
      </div>
    </form>
  )
}
