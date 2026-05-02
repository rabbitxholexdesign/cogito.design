import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { CTASection } from "@/components/sections/cta-section"
import { WorksCategoryFilter } from "@/components/works/category-filter"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Works",
  description: "cogito.designの制作実績一覧です。Webサイト、Webアプリ、バナー、DTPなど、様々な制作事例をご紹介します。",
}

interface PageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function WorksPage({ searchParams }: PageProps) {
  const { category } = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from("works")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false })

  if (category && category !== "all") {
    query = query.eq("category_slug", category)
  }

  const { data: works } = await query

  return (
    <>
      {/* Hero Section */}
      <section className="bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <Breadcrumb items={[{ label: "Works" }]} />

          <div className="pb-16 lg:pb-24">
            <h1 className="text-4xl lg:text-5xl font-medium tracking-tight">
              Works
            </h1>
            <div className="mt-4 w-12 h-0.5 bg-foreground" />
            <p className="mt-6 text-muted-foreground max-w-2xl leading-relaxed">
              これまでに手がけた制作実績の一部をご紹介します。
              Web制作からDTPまで、様々な制作事例をご覧ください。
            </p>
          </div>
        </div>
      </section>

      {/* Works List */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Category Filter */}
          <Suspense fallback={<div className="h-10 mb-12" />}>
            <WorksCategoryFilter />
          </Suspense>

          {/* Works Grid */}
          {works && works.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {works.map((work) => (
                <Link
                  key={work.id}
                  href={`/works/${work.id}`}
                  className="group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                    {work.thumbnail_url && (
                      <Image
                        src={work.thumbnail_url}
                        alt={work.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <h3 className="mt-4 font-medium group-hover:text-foreground/80 transition-colors">
                    {work.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{work.category}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-16">
              該当する実績がありません。
            </p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </>
  )
}
