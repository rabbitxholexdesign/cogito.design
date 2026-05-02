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
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  const { data: work } = await supabase
    .from("works")
    .select("title, description")
    .eq("id", id)
    .eq("is_published", true)
    .single()

  if (!work) return { title: "Not Found" }

  return {
    title: work.title,
    description: work.description,
  }
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: work } = await supabase
    .from("works")
    .select("*")
    .eq("id", id)
    .eq("is_published", true)
    .single()

  if (!work) notFound()

  // 関連実績（同カテゴリ、自分以外）
  const { data: relatedWorks } = await supabase
    .from("works")
    .select("id, title, category, thumbnail_url")
    .eq("category_slug", work.category_slug)
    .eq("is_published", true)
    .neq("id", work.id)
    .limit(3)

  return (
    <>
      {/* Hero Section */}
      <section className="bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Works", href: "/works" },
              { label: work.title },
            ]}
          />

          <div className="pb-16 lg:pb-24">
            <div className="max-w-4xl">
              <span className="text-sm text-muted-foreground">{work.category}</span>
              <h1 className="mt-2 text-3xl lg:text-4xl font-medium tracking-tight">
                {work.title}
              </h1>
              <div className="mt-4 w-12 h-0.5 bg-foreground" />
            </div>
          </div>
        </div>
      </section>

      {/* Work Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Main Image */}
            {work.thumbnail_url && (
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-muted">
                <Image
                  src={work.thumbnail_url}
                  alt={work.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Details */}
            <div className="mt-12 grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-xl font-medium">プロジェクト概要</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {work.description}
                </p>
                {work.content && (
                  <div className="mt-8 prose max-w-none">
                    {work.content.split('\n').map((line, index) => {
                      if (line.startsWith('## ')) {
                        return <h2 key={index} className="text-xl font-medium mt-8 mb-3">{line.replace('## ', '')}</h2>
                      }
                      if (line.startsWith('- ')) {
                        return <li key={index} className="text-muted-foreground ml-4">{line.replace('- ', '')}</li>
                      }
                      if (line.trim() === '') return null
                      return <p key={index} className="text-muted-foreground leading-relaxed mb-3">{line}</p>
                    })}
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {work.client && (
                  <div>
                    <h3 className="text-sm text-muted-foreground">クライアント</h3>
                    <p className="mt-1">{work.client}</p>
                  </div>
                )}
                {work.period && (
                  <div>
                    <h3 className="text-sm text-muted-foreground">制作時期</h3>
                    <p className="mt-1">{work.period}</p>
                  </div>
                )}
                {work.services && work.services.length > 0 && (
                  <div>
                    <h3 className="text-sm text-muted-foreground">担当領域</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {work.services.map((service) => (
                        <span
                          key={service}
                          className="px-3 py-1 text-xs bg-muted rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {work.url && (
                  <div>
                    <h3 className="text-sm text-muted-foreground">URL</h3>
                    <a
                      href={work.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-sm hover:underline break-all"
                    >
                      {work.url}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-16 text-center">
              <Button variant="outline" asChild>
                <Link href="/works" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  実績一覧に戻る
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Works */}
      {relatedWorks && relatedWorks.length > 0 && (
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-2xl font-medium text-center">関連する実績</h2>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {relatedWorks.map((relWork) => (
                <Link
                  key={relWork.id}
                  href={`/works/${relWork.id}`}
                  className="group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                    {relWork.thumbnail_url && (
                      <Image
                        src={relWork.thumbnail_url}
                        alt={relWork.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <h3 className="mt-4 font-medium">{relWork.title}</h3>
                  <p className="text-sm text-muted-foreground">{relWork.category}</p>
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
