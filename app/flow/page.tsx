import type { Metadata } from "next"
import { MessageSquare, ClipboardList, PenTool, Code, CheckCircle, Settings } from "lucide-react"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { CTASection } from "@/components/sections/cta-section"

export const metadata: Metadata = {
  title: "Flow",
  description: "cogito.designの制作の流れをご紹介します。お問い合わせから納品まで、各ステップを丁寧にサポートします。",
}

const flowSteps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "お問い合わせ・ヒアリング",
    description: "まずはお気軽にお問い合わせください。ご要望やお悩み、目的などをヒアリングし、最適なご提案に向けた情報を整理します。オンラインでのお打ち合わせも可能です。",
    details: [
      "課題やご要望のヒアリング",
      "目的・ターゲットの整理",
      "スケジュール・予算の確認",
    ],
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "ご提案・お見積り",
    description: "ヒアリング内容をもとに、最適なプランとお見積りをご提案します。ご不明点があればお気軽にご相談ください。ご納得いただけましたらご契約となります。",
    details: [
      "企画・構成のご提案",
      "お見積りの作成",
      "契約・発注",
    ],
  },
  {
    number: "03",
    icon: PenTool,
    title: "設計・デザイン",
    description: "サイト構成やワイヤーフレームの設計、ビジュアルデザインの制作を行います。お客様と確認・修正を重ねながら、理想のデザインを形にしていきます。",
    details: [
      "サイトマップ・ワイヤーフレーム作成",
      "デザインカンプの制作",
      "デザインの確認・修正",
    ],
  },
  {
    number: "04",
    icon: Code,
    title: "開発・制作",
    description: "デザインをもとに、コーディングやシステム開発を進めます。レスポンシブ対応、SEO対策、各種機能の実装を行い、品質を確保します。",
    details: [
      "コーディング・システム開発",
      "レスポンシブ対応",
      "動作確認・品質チェック",
    ],
  },
  {
    number: "05",
    icon: CheckCircle,
    title: "テスト・確認",
    description: "完成したサイトやアプリを様々な環境でテストし、動作確認を行います。お客様にもご確認いただき、必要に応じて修正・調整を行います。",
    details: [
      "各種ブラウザ・デバイスでの動作確認",
      "お客様によるチェック",
      "修正・最終調整",
    ],
  },
  {
    number: "06",
    icon: Settings,
    title: "公開・運用サポート",
    description: "サーバー設定、ドメイン設定などを行い、サイトを公開します。公開後も運用サポートや改善提案など、継続的にサポートいたします。",
    details: [
      "サーバー・ドメイン設定",
      "サイト公開",
      "運用サポート・保守",
    ],
  },
]

export default function FlowPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <Breadcrumb items={[{ label: "Flow" }]} />
          
          <div className="pb-16 lg:pb-24">
            <h1 className="text-4xl lg:text-5xl font-medium tracking-tight">
              Flow
            </h1>
            <div className="mt-4 w-12 h-0.5 bg-foreground" />
            <p className="mt-6 text-muted-foreground max-w-2xl leading-relaxed">
              お問い合わせから納品まで、各ステップを丁寧にサポートします。
              不明点やご要望があれば、いつでもお気軽にご相談ください。
            </p>
          </div>
        </div>
      </section>

      {/* Flow Steps */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {flowSteps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Connector Line */}
                {index < flowSteps.length - 1 && (
                  <div className="absolute left-8 top-20 w-px h-full bg-border hidden md:block" />
                )}
                
                <div className="flex gap-6 md:gap-10 pb-16 last:pb-0">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                        {step.number}
                      </span>
                      <div className="w-16 h-16 rounded-full border-2 border-foreground flex items-center justify-center bg-background">
                        <step.icon className="w-6 h-6" strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <h2 className="text-xl lg:text-2xl font-medium">{step.title}</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex items-center gap-2 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Note Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl font-medium">制作期間について</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              制作期間はプロジェクトの規模や内容によって異なります。
              小規模なWebサイトで1〜2ヶ月程度、大規模なWebアプリで3〜6ヶ月程度が目安です。
              詳しくはお見積り時にご案内いたします。
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </>
  )
}
