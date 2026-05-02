import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { CTASection } from "@/components/sections/cta-section"
import { createClient } from "@/lib/supabase/server"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("is_published", true)
    .single()

  if (!post) return { title: "Not Found" }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single()

  if (!post) notFound()

  // 関連記事（同カテゴリ、自分以外）
  const { data: relatedPosts } = await supabase
    .from("blog_posts")
    .select("id, slug, title, thumbnail_url, published_at")
    .eq("category_slug", post.category_slug)
    .eq("is_published", true)
    .neq("id", post.id)
    .limit(2)

  return (
    <>
      {/* Hero Section */}
      <section className="bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
          />

          <div className="pb-16 lg:pb-24 max-w-3xl">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>{post.category}</span>
              <span>|</span>
              <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
            </div>
            <h1 className="mt-4 text-3xl lg:text-4xl font-medium tracking-tight leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Featured Image */}
            {post.thumbnail_url && (
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-muted">
                <Image
                  src={post.thumbnail_url}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Content */}
            <div className="mt-12 prose prose-lg max-w-none">
              {post.content.split('\n').map((line, index) => {
                if (line.startsWith('## ')) {
                  return <h2 key={index} className="text-2xl font-medium mt-10 mb-4">{line.replace('## ', '')}</h2>
                }
                if (line.startsWith('- ')) {
                  return <li key={index} className="text-muted-foreground">{line.replace('- ', '')}</li>
                }
                if (line.trim() === '') {
                  return null
                }
                return <p key={index} className="text-muted-foreground leading-relaxed mb-4">{line}</p>
              })}
            </div>

            {/* Back Button */}
            <div className="mt-16 text-center">
              <Button variant="outline" asChild>
                <Link href="/blog" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  ブログ一覧に戻る
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-2xl font-medium text-center">関連記事</h2>
            <div className="mt-10 grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {relatedPosts.map((relPost) => (
                <Link
                  key={relPost.id}
                  href={`/blog/${relPost.slug}`}
                  className="group"
                >
                  <article className="flex gap-4">
                    <div className="relative w-24 aspect-square flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                      {relPost.thumbnail_url && (
                        <Image
                          src={relPost.thumbnail_url}
                          alt={relPost.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <time className="text-sm text-muted-foreground">
                        {formatDate(relPost.published_at)}
                      </time>
                      <h3 className="mt-1 font-medium line-clamp-2 group-hover:text-foreground/80 transition-colors">
                        {relPost.title}
                      </h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <CTASection />
    </>
  )
}
