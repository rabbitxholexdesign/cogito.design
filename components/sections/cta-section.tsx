import Link from "next/link"
import { Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CTASectionProps {
  title?: string
  description?: string
}

export function CTASection({ 
  title = "私たちと一緒に、\nあなたのビジネスの可能性を広げませんか？",
  description = "ご相談・お見積りは無料です。お気軽にお問い合わせください。"
}: CTASectionProps) {
  return (
    <section className="bg-muted py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-medium whitespace-pre-line leading-relaxed">
              {title}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {description}
            </p>
          </div>
          <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/90 min-w-[240px]">
            <Link href="/contact" className="flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              お問い合わせする
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
