import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Mail, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { CTASection } from "@/components/sections/cta-section"
import { servicesData } from "@/lib/data/services"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const service = servicesData[slug]
  
  if (!service) {
    return { title: "Not Found" }
  }
  
  return {
    title: service.title,
    description: service.description,
  }
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const service = servicesData[slug]
  
  if (!service) {
    notFound()
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <Breadcrumb 
            items={[
              { label: "Service", href: "/service" },
              { label: service.title }
            ]} 
          />
          
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 pb-16 lg:pb-24">
            {/* Content */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl lg:text-5xl font-medium tracking-tight">
                {service.title}
              </h1>
              <div className="mt-4 w-12 h-0.5 bg-foreground" />
              <p className="mt-6 text-xl lg:text-2xl text-foreground leading-relaxed">
                {service.subtitle}
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {service.longDescription}
              </p>
              <div className="mt-8">
                <Button asChild className="bg-foreground text-background hover:bg-foreground/90">
                  <Link href="/contact" className="flex items-center gap-2">
                    お問い合わせする
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[400px]">
              <Image
                src={service.heroImage}
                alt={service.title}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl lg:text-3xl font-medium">特徴・強み</h2>
          </div>

          <div className="mt-12 lg:mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {service.features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-20 h-20 rounded-full border border-border flex items-center justify-center mx-auto">
                  <feature.icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 font-medium">{feature.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scope Section */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl lg:text-3xl font-medium">{service.scope.title}</h2>
          </div>

          <div className="mt-10 max-w-3xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-4">
              {service.scope.items.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-foreground flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Flow Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl lg:text-3xl font-medium">制作の流れ</h2>
          </div>

          <div className="mt-12 lg:mt-16">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
              {service.flow.map((step, index) => (
                <div key={step.number} className="flex lg:flex-col items-start lg:items-center gap-4 lg:gap-0 flex-1">
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-muted-foreground mb-2">{step.number}</span>
                    <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center">
                      <step.icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                  </div>
                  {index < service.flow.length - 1 && (
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

      {/* Works Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl lg:text-3xl font-medium">制作実績</h2>
            <Link
              href="/works"
              className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              すべて見る
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.works.slice(0, 4).map((work) => (
              <Link
                key={work.id}
                href={`/works/${work.id}`}
                className="group"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
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

      {/* CTA Section */}
      <CTASection 
        title={`${service.title}のご相談・お見積りはこちら`}
        description="目的やご予算に合わせて、最適なプランをご提案します。"
      />
    </>
  )
}
