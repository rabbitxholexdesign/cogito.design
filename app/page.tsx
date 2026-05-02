import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Monitor, Code, Image as ImageIcon, FileText, MessageSquare, ClipboardList, PenTool, Settings, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CTASection } from "@/components/sections/cta-section"
import { createClient } from "@/lib/supabase/server"

const services = [
  {
    icon: Monitor,
    title: "Web制作",
    description: "コーポレートサイト、サービスサイト、LPなど、目的に合わせたWebサイトを制作します。",
    href: "/service/web",
  },
  {
    icon: Code,
    title: "Webアプリ制作",
    description: "業務効率化やサービス価値を高めるWebアプリケーションを設計・開発します。",
    href: "/service/webapp",
  },
  {
    icon: ImageIcon,
    title: "バナー制作",
    description: "広告バナーやSNS画像など、目的に合わせて効果的に伝わるデザインを制作します。",
    href: "/service/banner",
  },
  {
    icon: FileText,
    title: "DTP制作",
    description: "名刺・パンフレット・チラシ・カタログなど、紙媒体のデザイン・印刷物を制作します。",
    href: "/service/dtp",
  },
]

const flowSteps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "ヒアリング",
    description: "課題や目的、ご要望をご丁寧にお伺いします。",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "企画・提案",
    description: "ヒアリング内容をもとに、最適なプランをご提案します。",
  },
  {
    number: "03",
    icon: PenTool,
    title: "設計・デザイン",
    description: "情報設計・デザインを行い、形にしていきます。",
  },
  {
    number: "04",
    icon: Settings,
    title: "開発・制作",
    description: "コーディングやシステム開発など、実装を進めます。",
  },
  {
    number: "05",
    icon: Heart,
    title: "公開・運用サポート",
    description: "公開後も改善や運用のサポートを行います。",
  },
]

export default async function HomePage() {
  const supabase = await createClient()
  const { data: works } = await supabase
    .from("works")
    .select("id, title, category, thumbnail_url")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(4)
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-muted/30 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 py-16 lg:py-24">
            {/* Content */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight leading-tight">
                cogito.design
              </h1>
              <p className="mt-6 text-xl lg:text-2xl text-foreground">
                考える。その先の、かたちへ。
              </p>
              <div className="mt-4 w-12 h-0.5 bg-foreground" />
              <p className="mt-8 text-muted-foreground leading-relaxed max-w-lg">
                Web制作、Webアプリ制作、その他バナー、DTP制作まで、
                課題を丁寧に整理し、伝わるデザインと確かな技術で
                ビジネスの成長をサポートします。
              </p>
              <div className="mt-8">
                <span className="text-sm text-muted-foreground tracking-wider">SCROLL</span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[500px]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2012_58_19-bdzlgfrIBqXOYLF1s4pdHKgoxzqD0S.png"
                alt="cogito.design - Web制作事務所"
                fill
                className="object-cover object-top rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-medium">About</h2>
              <p className="text-sm text-muted-foreground mt-1">私たちについて</p>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                cogito.designは、Web制作・Webアプリ制作を中心に、
                バナー制作やDTP制作まで幅広く対応するWeb制作事務所です。
                丁寧なヒアリングと設計を大切にし、ユーザー視点で考えた
                シンプルで美しく、成果につながる制作を行います。
              </p>
              <div className="mt-8">
                <Button variant="outline" asChild className="group">
                  <Link href="/about" className="flex items-center gap-2">
                    詳しく見る
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="relative aspect-[4/3]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2012_58_19-bdzlgfrIBqXOYLF1s4pdHKgoxzqD0S.png"
                alt="私たちについて"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-medium">Service</h2>
            <p className="text-sm text-muted-foreground mt-1">サービス</p>
          </div>

          <div className="mt-12 lg:mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group p-6 lg:p-8 border border-border rounded-lg hover:border-foreground/20 transition-colors"
              >
                <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center mx-auto">
                  <service.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 text-center font-medium">{service.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground text-center leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-4 flex justify-center">
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl lg:text-4xl font-medium">Works</h2>
              <p className="text-sm text-muted-foreground mt-1">制作実績</p>
            </div>
            <Link
              href="/works"
              className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              すべて見る
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {works?.map((work) => (
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
                <h3 className="mt-4 font-medium">{work.title}</h3>
                <p className="text-sm text-muted-foreground">{work.category}</p>
              </Link>
            ))}
          </div>

          <div className="mt-8 sm:hidden text-center">
            <Link
              href="/works"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              すべて見る
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Flow Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-medium">Flow</h2>
            <p className="text-sm text-muted-foreground mt-1">制作の流れ</p>
          </div>

          <div className="mt-12 lg:mt-16">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
              {flowSteps.map((step, index) => (
                <div key={step.number} className="flex lg:flex-col items-start lg:items-center gap-4 lg:gap-0 flex-1">
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-muted-foreground mb-2">{step.number}</span>
                    <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center">
                      <step.icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                  </div>
                  {index < flowSteps.length - 1 && (
                    <div className="hidden lg:block w-full h-px border-t border-dashed border-border mt-8 mx-4" />
                  )}
                  <div className="lg:mt-4 lg:text-center">
                    <h3 className="font-medium">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection 
        title="まずはお気軽にご相談ください"
        description="お見積りやご相談は無料です。小さなことでも、どうぞお気軽にお問い合わせください。"
      />
    </>
  )
}
