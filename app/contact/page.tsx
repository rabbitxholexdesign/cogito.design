import type { Metadata } from "next"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { ContactForm } from "@/components/contact/contact-form"

export const metadata: Metadata = {
  title: "Contact",
  description: "お問い合わせはこちらから。Web制作、Webアプリ制作、バナー制作、DTP制作のご相談・お見積りは無料です。",
}

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <Breadcrumb items={[{ label: "Contact" }]} />
          
          <div className="pb-16 lg:pb-24">
            <h1 className="text-4xl lg:text-5xl font-medium tracking-tight">
              Contact
            </h1>
            <div className="mt-4 w-12 h-0.5 bg-foreground" />
            <p className="mt-6 text-muted-foreground max-w-2xl leading-relaxed">
              Web制作、Webアプリ制作、バナー制作、DTP制作のご相談・お見積りは無料です。
              お気軽にお問い合わせください。
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="mb-12">
              <h2 className="text-2xl font-medium">お問い合わせフォーム</h2>
              <p className="mt-4 text-muted-foreground">
                以下のフォームに必要事項をご入力の上、送信してください。
                通常2〜3営業日以内にご返信いたします。
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl font-medium">お急ぎの場合</h2>
            <p className="mt-4 text-muted-foreground">
              お急ぎの場合は、下記メールアドレスまで直接ご連絡ください。
            </p>
            <p className="mt-2">
              <a 
                href="mailto:info@cogito.design" 
                className="text-foreground hover:text-foreground/80 transition-colors underline underline-offset-4"
              >
                info@cogito.design
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
