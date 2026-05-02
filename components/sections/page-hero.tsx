import Image from "next/image"
import { Breadcrumb } from "@/components/layout/breadcrumb"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeroProps {
  title: string
  subtitle?: string
  description?: string
  breadcrumbItems: BreadcrumbItem[]
  imageSrc?: string
  imageAlt?: string
}

export function PageHero({
  title,
  subtitle,
  description,
  breadcrumbItems,
  imageSrc,
  imageAlt = "",
}: PageHeroProps) {
  return (
    <section className="bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 pb-16 lg:pb-24">
          {/* Content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl lg:text-5xl font-medium tracking-tight">
              {title}
            </h1>
            <div className="mt-4 w-12 h-0.5 bg-foreground" />
            {subtitle && (
              <p className="mt-6 text-xl lg:text-2xl text-foreground leading-relaxed">
                {subtitle}
              </p>
            )}
            {description && (
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* Image */}
          {imageSrc && (
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[400px]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
