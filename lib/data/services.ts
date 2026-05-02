import { Monitor, Code, Image as ImageIcon, FileText, Target, Smartphone, Palette, Zap, Settings, Shield, TrendingUp, Boxes, MessageSquare, ClipboardList, PenTool, CheckCircle, Truck, Eye, Layout, Printer, Award } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface ServiceFeature {
  icon: LucideIcon
  title: string
  description: string
}

export interface ServiceScope {
  title: string
  items: string[]
}

export interface FlowStep {
  number: string
  icon: LucideIcon
  title: string
  description: string
}

export interface WorkItem {
  id: number
  title: string
  category: string
  image: string
}

export interface ServiceData {
  slug: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  heroImage: string
  icon: LucideIcon
  features: ServiceFeature[]
  scope: ServiceScope
  flow: FlowStep[]
  works: WorkItem[]
}

export const servicesData: Record<string, ServiceData> = {
  web: {
    slug: "web",
    title: "Web制作",
    subtitle: "目的に合わせた、成果につながるWebサイトを制作します。",
    description: "コーポレートサイト、サービスサイト、LPなど、目的やターゲットに合わせて、デザイン・設計・構築まで一貫して対応。使いやすく、伝わりやすく、成果につながるWebサイトをご提供します。",
    longDescription: "コーポレートサイト、サービスサイト、LPなど、目的やターゲットに合わせて、デザイン・設計・構築まで一貫して対応。使いやすく、伝わりやすく、成果につながるWebサイトをご提供します。",
    heroImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2013_03_27-Hu6voFEGNkS2b3L0M3var1k8yrQafB.png",
    icon: Monitor,
    features: [
      {
        icon: Target,
        title: "目的に合わせた設計",
        description: "ビジネスの目的や課題を丁寧にヒアリングし、成果につながるサイト設計を行います。",
      },
      {
        icon: Smartphone,
        title: "スマホ対応・レスポンシブ",
        description: "すべてのデバイスで快適に閲覧できる、レスポンシブデザインに対応します。",
      },
      {
        icon: Palette,
        title: "伝わるデザイン",
        description: "ブランドやサービスの魅力を引き出し、ユーザーに伝わるデザインを追求します。",
      },
      {
        icon: Zap,
        title: "SEO・表示速度にも配慮",
        description: "SEO内部対策や表示速度の最適化など、集客・運用面まで考えた構築を行います。",
      },
    ],
    scope: {
      title: "対応内容",
      items: [
        "コーポレートサイト制作",
        "サービスサイト制作",
        "採用サイト制作",
        "LP（ランディングページ）制作",
        "既存サイトのリニューアル",
        "保守・運用サポート",
      ],
    },
    flow: [
      { number: "01", icon: MessageSquare, title: "ヒアリング", description: "目的や課題、ご要望を丁寧にお伺いします。" },
      { number: "02", icon: ClipboardList, title: "企画・設計", description: "サイトの構成や設計、ワイヤーフレームをご提案します。" },
      { number: "03", icon: PenTool, title: "デザイン", description: "ビジュアルデザインを作成し、世界観を形にします。" },
      { number: "04", icon: Code, title: "コーディング・実装", description: "レスポンシブ対応のコーディングと各種機能の実装を行います。" },
      { number: "05", icon: Settings, title: "公開・運用サポート", description: "公開後の運用や改善もしっかりサポートします。" },
    ],
    works: [
      { id: 1, title: "コーポレートサイト制作", category: "#コーポレートサイト", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2012_58_19-bdzlgfrIBqXOYLF1s4pdHKgoxzqD0S.png" },
      { id: 2, title: "サービスサイト制作", category: "#サービスサイト", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2013_03_27-Hu6voFEGNkS2b3L0M3var1k8yrQafB.png" },
      { id: 3, title: "採用サイト制作", category: "#採用サイト", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2014_31_59-6pFtCFJkfU5iYpx06XXTFtTsO7oWIj.png" },
      { id: 4, title: "LP制作", category: "#LP・ランディングページ", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2012_58_19-bdzlgfrIBqXOYLF1s4pdHKgoxzqD0S.png" },
    ],
  },
  webapp: {
    slug: "webapp",
    title: "Webアプリ制作",
    subtitle: "課題解決を叶える、使いやすく価値のあるWebアプリケーションを開発します。",
    description: "業務効率化や新しいサービスの立ち上げなど、目的に合わせた最適なWebアプリケーションを企画・設計から開発・運用まで一貫してサポートします。ユーザーにとって使いやすく、事業の成長につながるプロダクトを提供します。",
    longDescription: "業務効率化や新しいサービスの立ち上げなど、目的に合わせた最適なWebアプリケーションを企画・設計から開発・運用まで一貫してサポートします。ユーザーにとって使いやすく、事業の成長につながるプロダクトを提供します。",
    heroImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2013_10_13-Jm88eOSLX7vd63nk6O35UK5GZ5tj1E.png",
    icon: Code,
    features: [
      {
        icon: Target,
        title: "課題解決にフォーカスした設計",
        description: "ビジネスの目的や課題を丁寧にヒアリングし、最適な機能・体験を設計します。",
      },
      {
        icon: Settings,
        title: "柔軟なカスタマイズ開発",
        description: "スクラッチ開発による柔軟な対応で、業務やサービスにフィットする機能を実現します。",
      },
      {
        icon: Shield,
        title: "セキュリティ・パフォーマンス重視",
        description: "安全性と快適な操作性を両立した、信頼性の高いアプリを構築します。",
      },
      {
        icon: TrendingUp,
        title: "将来を見据えた拡張性",
        description: "事業の成長や変化に合わせて機能追加や改善がしやすい設計を行います。",
      },
    ],
    scope: {
      title: "対応領域",
      items: [
        "業務システム開発（社内システム・管理システムなど）",
        "会員制サービス・マッチングサービス開発",
        "予約・スケジュール管理システム",
        "EC・決済機能を含むWebアプリ開発",
        "API連携・外部サービス連携",
        "既存システムのリプレイス・機能追加",
      ],
    },
    flow: [
      { number: "01", icon: MessageSquare, title: "ヒアリング・要件定義", description: "目的や課題を整理し、必要な機能や要件を明確にします。" },
      { number: "02", icon: ClipboardList, title: "設計・企画", description: "業務フローや画面構成、データ設計などを行います。" },
      { number: "03", icon: Code, title: "開発・実装", description: "設計に基づき、品質を意識して開発を進めます。" },
      { number: "04", icon: CheckCircle, title: "テスト・検証", description: "動作確認やセキュリティチェックを行い、品質を担保します。" },
      { number: "05", icon: Settings, title: "リリース・運用サポート", description: "リリース後も安定運用や機能改善を継続的にサポートします。" },
    ],
    works: [
      { id: 5, title: "業務管理システム開発", category: "#業務システム", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2013_10_13-Jm88eOSLX7vd63nk6O35UK5GZ5tj1E.png" },
      { id: 6, title: "マッチングサービス開発", category: "#マッチングサービス", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2013_10_13-Jm88eOSLX7vd63nk6O35UK5GZ5tj1E.png" },
      { id: 7, title: "予約管理システム開発", category: "#予約システム", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2013_10_13-Jm88eOSLX7vd63nk6O35UK5GZ5tj1E.png" },
      { id: 8, title: "ECサイト構築（カスタム開発）", category: "#EC・決済", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2013_10_13-Jm88eOSLX7vd63nk6O35UK5GZ5tj1E.png" },
    ],
  },
  banner: {
    slug: "banner",
    title: "バナー制作",
    subtitle: "目を惹き、伝わるデザインで成果につながるバナーを制作します。",
    description: "Web広告やキャンペーン、SNS、商品・サービスの告知など、目的やターゲットに合わせて、視認性の高いバナーをデザインします。サイズや媒体に最適化し、クリックしたくなるクリエイティブをお届けします。",
    longDescription: "Web広告やキャンペーン、SNS、商品・サービスの告知など、目的やターゲットに合わせて、視認性の高いバナーをデザインします。サイズや媒体に最適化し、クリックしたくなるクリエイティブをお届けします。",
    heroImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2014_36_36-NfB9IynBoY4K1cbp7JfixWYMur2teB.png",
    icon: ImageIcon,
    features: [
      {
        icon: Eye,
        title: "視認性の高いデザイン",
        description: "ターゲットの目を惹くレイアウトと配色で、伝えたい情報を的確に届けます。",
      },
      {
        icon: Target,
        title: "目的に合わせた構成設計",
        description: "バナーの目的（認知拡大・誘導・販促促進など）に合わせて、最適な構成をご提案します。",
      },
      {
        icon: Layout,
        title: "各種サイズに柔軟対応",
        description: "Web広告・SNS・LP・メールなど、各媒体に最適なサイズで制作します。",
      },
      {
        icon: Zap,
        title: "短納期・高品質",
        description: "スピーディーな対応を心がけながら、クオリティの高いデザインを提供します。",
      },
    ],
    scope: {
      title: "こんな用途におすすめです",
      items: [
        "Web広告（Google / Yahoo! / SNSなど）",
        "キャンペーン・セールの告知",
        "SNS投稿画像・ヘッダー",
        "イベント・セミナーの集客",
        "新商品・サービスのプロモーション",
        "サイト誘導・会員登録の促進",
      ],
    },
    flow: [
      { number: "01", icon: MessageSquare, title: "ヒアリング", description: "目的やターゲット、掲載媒体、ご希望のイメージをお伺いします。" },
      { number: "02", icon: ClipboardList, title: "ご提案・お見積り", description: "内容に基づき、最適なプランとお見積りをご提案します。" },
      { number: "03", icon: PenTool, title: "デザイン制作", description: "訴求力のあるデザインを制作し、初稿をご提出します。" },
      { number: "04", icon: CheckCircle, title: "ご確認・修正", description: "ご要望に応じて修正を行い、完成度を高めます。" },
      { number: "05", icon: Truck, title: "納品", description: "各種サイズ・形式で納品いたします。すぐにご利用いただけます。" },
    ],
    works: [
      { id: 9, title: "セールバナー（Web広告）", category: "#アパレル", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2014_36_36-NfB9IynBoY4K1cbp7JfixWYMur2teB.png" },
      { id: 10, title: "クーポンバナー（SNS）", category: "#飲食店", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2014_36_36-NfB9IynBoY4K1cbp7JfixWYMur2teB.png" },
      { id: 11, title: "セミナーバナー（Web広告）", category: "#金融・サービス", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2014_36_36-NfB9IynBoY4K1cbp7JfixWYMur2teB.png" },
      { id: 12, title: "キャンペーンバナー（LP用）", category: "#コスメ・美容", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2014_36_36-NfB9IynBoY4K1cbp7JfixWYMur2teB.png" },
      { id: 13, title: "告知バナー（Webサイト）", category: "#ECサイト", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2014_36_36-NfB9IynBoY4K1cbp7JfixWYMur2teB.png" },
    ],
  },
  dtp: {
    slug: "dtp",
    title: "DTP制作",
    subtitle: "紙の魅力を最大限に引き出す、伝わるデザインをカタチにします。",
    description: "パンフレットやチラシ、カタログ、名刺、ポスターなど、目的やターゲットに合わせた紙媒体のデザイン・印刷物を制作します。企画からデザイン、印刷手配まで一貫して対応し、高品質で効果的なプロモーションをサポートします。",
    longDescription: "パンフレットやチラシ、カタログ、名刺、ポスターなど、目的やターゲットに合わせた紙媒体のデザイン・印刷物を制作します。企画からデザイン、印刷手配まで一貫して対応し、高品質で効果的なプロモーションをサポートします。",
    heroImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2013_33_05-GcxZ2feGSfQHt5JdafbFv1SH5uFn4Q.png",
    icon: FileText,
    features: [
      {
        icon: PenTool,
        title: "目的に合わせたデザイン",
        description: "伝えたい情報を整理し、読みやすく訴求力のあるデザインをご提案します。",
      },
      {
        icon: Boxes,
        title: "多様な印刷物に対応",
        description: "パンフレット・チラシ・名刺・ポスターなど、幅広い印刷物の制作に対応します。",
      },
      {
        icon: Printer,
        title: "印刷までトータルサポート",
        description: "デザインから印刷手配まで一貫対応。高品質な仕上がりをお届けします。",
      },
      {
        icon: Award,
        title: "効果を高めるご提案",
        description: "用途やターゲットに合わせて、最適な仕様・用紙・加工をご提案します。",
      },
    ],
    scope: {
      title: "対応できる印刷物",
      items: [
        "パンフレット・会社案内",
        "チラシ・フライヤー",
        "カタログ・リーフレット",
        "名刺・ショップカード",
        "ポスター・告知物",
        "DM・はがき・封筒",
        "メニュー・POP・パネル",
        "冊子・報告書・会社資料",
        "その他各種印刷物",
      ],
    },
    flow: [
      { number: "01", icon: MessageSquare, title: "ヒアリング・お見積り", description: "目的やご要望をお伺いし、概算のプランとお見積りをご提案します。" },
      { number: "02", icon: ClipboardList, title: "企画・構成", description: "内容や構成を整理し、デザインの方向性を決定します。" },
      { number: "03", icon: PenTool, title: "デザイン制作", description: "情報をわかりやすく整理し、魅力的なデザインを制作します。" },
      { number: "04", icon: CheckCircle, title: "ご確認・修正", description: "デザインをご確認いただき、修正・調整を行います。" },
      { number: "05", icon: Printer, title: "印刷・納品", description: "高品質な印刷を行い、ご希望の方法で納品します。" },
    ],
    works: [
      { id: 14, title: "会社案内パンフレット", category: "#会社案内", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2013_33_05-GcxZ2feGSfQHt5JdafbFv1SH5uFn4Q.png" },
      { id: 15, title: "サービス紹介リーフレット", category: "#リーフレット", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2013_33_05-GcxZ2feGSfQHt5JdafbFv1SH5uFn4Q.png" },
      { id: 16, title: "イベントチラシ", category: "#チラシ", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2013_33_05-GcxZ2feGSfQHt5JdafbFv1SH5uFn4Q.png" },
      { id: 17, title: "商品カタログ", category: "#カタログ", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2013_33_05-GcxZ2feGSfQHt5JdafbFv1SH5uFn4Q.png" },
      { id: 18, title: "名刺デザイン", category: "#名刺", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2013_33_05-GcxZ2feGSfQHt5JdafbFv1SH5uFn4Q.png" },
    ],
  },
}

export const servicesList = Object.values(servicesData)
