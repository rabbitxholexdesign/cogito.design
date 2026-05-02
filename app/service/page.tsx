import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { CTASection } from "@/components/sections/cta-section"
import { servicesList } from "@/lib/data/services"

export const metadata: Metadata = {
  title: "Service",
  description: "Web制作、Webアプリ制作、バナー制作、DTP制作など、お客様のビジネスの成長をサポートする幅広いサービスを提供しています。",
}

export default function ServicePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <Breadcrumb items={[{ label: "Service" }]} />
          
          <div className="pb-16 lg:pb-24">
            <h1 className="text-4xl lg:text-5xl font-medium tracking-tight">
              Service
            </h1>
            <div className="mt-4 w-12 h-0.5 bg-foreground" />
            <p className="mt-6 text-muted-foreground max-w-2xl leading-relaxed">
              Web制作、Webアプリ制作、バナー制作、DTP制作など、
              お客様のビジネスの成長をサポートする幅広いサービスを提供しています。
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-8 lg:gap-12">
            {servicesList.map((service) => (
              <Link
                key={service.slug}
                href={`/service/${service.slug}`}
                className="group p-8 lg:p-10 border border-border rounded-lg hover:border-foreground/20 transition-colors"
              >
                <div className="w-20 h-20 rounded-full border border-border flex items-center justify-center">
                  <service.icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h2 className="mt-6 text-2xl font-medium">{service.title}</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm font-medium">
                  詳しく見る
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </>
  )
}
