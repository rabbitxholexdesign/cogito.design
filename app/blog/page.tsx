import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { BlogCategoryFilter } from "@/components/blog/category-filter"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Blog",
  description: "Web制作やデザインに関する情報を発信しています。トレンド、ノウハウ、制作事例など、役立つ情報をお届けします。",
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

interface PageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function BlogPage({ searchParams }: PageProps) {
  const { category } = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false })

  if (category && category !== "all") {
    query = query.eq("category_slug", category)
  }

  const { data: posts } = await query

  return (
    <>
      {/* Hero Section */}
      <section className="bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <Breadcrumb items={[{ label: "Blog" }]} />

          <div className="pb-16 lg:pb-24">
            <h1 className="text-4xl lg:text-5xl font-medium tracking-tight">
              Blog
            </h1>
            <div className="mt-4 w-12 h-0.5 bg-foreground" />
            <p className="mt-6 text-muted-foreground max-w-2xl leading-relaxed">
              Web制作やデザインに関する情報を発信しています。
              トレンド、ノウハウ、制作事例など、役立つ情報をお届けします。
            </p>
          </div>
        </div>
      </section>

      {/* Blog List */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Category Filter */}
          <Suspense fallback={<div className="h-10 mb-12" />}>
            <BlogCategoryFilter />
          </Suspense>

          {/* Blog Grid */}
          {posts && posts.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group"
                >
                  <article className="flex flex-col sm:flex-row gap-6">
                    <div className="relative w-full sm:w-48 aspect-[4/3] sm:aspect-square flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                      {post.thumbnail_url && (
                        <Image
                          src={post.thumbnail_url}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{post.category}</span>
                        <span>|</span>
                        <time dateTime={post.published_at}>
                          {formatDate(post.published_at)}
                        </time>
                      </div>
                      <h2 className="mt-2 text-lg font-medium group-hover:text-foreground/80 transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-16">
              該当する記事がありません。
            </p>
          )}
        </div>
      </section>
    </>
  )
}
