"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

const categories = [
  { slug: "all", label: "すべて" },
  { slug: "web", label: "Webサイト" },
  { slug: "webapp", label: "Webアプリ" },
  { slug: "banner", label: "バナー" },
  { slug: "dtp", label: "DTP" },
]

export function WorksCategoryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const current = searchParams.get("category") || "all"

  const handleClick = useCallback(
    (slug: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (slug === "all") {
        params.delete("category")
      } else {
        params.set("category", slug)
      }
      router.push(`/works?${params.toString()}`)
    },
    [router, searchParams]
  )

  return (
    <div className="flex flex-wrap gap-3 mb-12">
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => handleClick(cat.slug)}
          className={`px-4 py-2 text-sm rounded-full border transition-colors ${
            current === cat.slug
              ? "bg-foreground text-background border-foreground"
              : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
