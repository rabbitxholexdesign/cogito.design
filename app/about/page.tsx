import type { Metadata } from "next"
import Image from "next/image"
import { Users, Lightbulb, TrendingUp } from "lucide-react"
import { PageHero } from "@/components/sections/page-hero"
import { CTASection } from "@/components/sections/cta-section"

export const metadata: Metadata = {
  title: "About",
  description: "cogito.designは、デザイナー・エンジニアを中心とした少人数のチームで活動しています。一人ひとりがプロフェッショナルとして責任を持ち、企画から制作、公開後のサポートまで一貫して対応します。",
}

const missions = [
  {
    icon: Users,
    title: "顧客に寄り添う",
    description: "丁寧なヒアリングを通して本質的な課題を見つけ、最適なご提案をします。",
  },
  {
    icon: Lightbulb,
    title: "価値をデザインする",
    description: "見た目の美しさだけでなく、目的や成果につながるデザインを追求します。",
  },
  {
    icon: TrendingUp,
    title: "ともに成長する",
    description: "制作して終わりではなく、公開後も継続的にサポートし、長く信頼されるパートナーを目指します。",
  },
]

const teamMembers = [
  {
    role: "代表 / ディレクター",
    description: "企画・設計から進行管理まで担当。お客様のビジネスに寄り添い、最適な提案を行います。",
  },
  {
    role: "デザイナー",
    description: "WebデザインやDTPデザインを担当。伝わりやすく、印象に残るデザインをつくります。",
  },
  {
    role: "フロントエンドエンジニア",
    description: "HTML / CSS / JavaScriptを中心に、使いやすく高品質な実装を行います。",
  },
  {
    role: "バックエンドエンジニア",
    description: "システム設計・開発、データベース構築など、Webアプリの機能を支える開発を担当します。",
  },
]

const companyInfo = [
  { label: "屋号", value: "cogito.design（コギト・デザイン）" },
  { label: "所在地", value: "〒150-0001 東京都渋谷区神宮前1丁目1-1" },
  { label: "設立", value: "2020年4月" },
  { label: "事業内容", value: "Web制作 / Webアプリ制作 / バナー制作 / DTP制作" },
  { label: "取引銀行", value: "みずほ銀行 / 三井住友銀行" },
  { label: "適格請求書発行事業者登録番号", value: "T1234567890123" },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <PageHero
        title="About"
        subtitle="考える。その先の、かたちへ。"
        description="cogito.designは、お客様の課題や想いにじっくりと向き合い、最適なデザインと技術で、ビジネスの成長をサポートするWeb制作事務所です。"
        breadcrumbItems={[{ label: "About" }]}
        imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2014_31_59-6pFtCFJkfU5iYpx06XXTFtTsO7oWIj.png"
        imageAlt="cogito.design オフィス"
      />

      {/* Mission Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl lg:text-3xl font-medium">Mission</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              デザインと技術の力で、伝わる体験をつくり、ビジネスの可能性をひらきます。
            </p>
          </div>

          <div className="mt-12 lg:mt-16 grid sm:grid-cols-3 gap-8 lg:gap-12">
            {missions.map((mission) => (
              <div key={mission.title} className="text-center">
                <div className="w-20 h-20 rounded-full border border-border flex items-center justify-center mx-auto">
                  <mission.icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 font-medium text-lg">{mission.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {mission.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative aspect-[4/3] order-2 lg:order-1">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2014_31_59-6pFtCFJkfU5iYpx06XXTFtTsO7oWIj.png"
                alt="チームの様子"
                fill
                className="object-cover rounded-lg"
              />
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl lg:text-3xl font-medium">About Us</h2>
              <p className="mt-2 text-xl lg:text-2xl font-medium leading-relaxed">
                小さなチームだからこそできる、<br />
                柔軟で誠実なものづくり。
              </p>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                cogito.designは、デザイナー・エンジニアを中心とした
                少人数のチームで活動しています。
                一人ひとりがプロフェッショナルとして責任を持ち、
                企画から制作、公開後のサポートまで一貫して対応。
                コミュニケーションを大切にしながら、スピード感のある
                柔軟な制作体制で、お客様の想いをかたちにします。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Profile & Company Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Profile */}
            <div>
              <h2 className="text-2xl font-medium">Profile</h2>
              <div className="mt-8 space-y-6">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-16 h-16 rounded-full bg-muted flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">{member.role}</h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        {member.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <h2 className="text-2xl font-medium">Company</h2>
              <dl className="mt-8 space-y-4">
                {companyInfo.map((item) => (
                  <div key={item.label} className="flex flex-col sm:flex-row sm:gap-8">
                    <dt className="text-sm text-muted-foreground w-48 flex-shrink-0">
                      {item.label}
                    </dt>
                    <dd className="text-sm">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </>
  )
}
