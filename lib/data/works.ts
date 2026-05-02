export interface WorkItem {
  id: number
  title: string
  category: string
  categorySlug: string
  description: string
  image: string
  client?: string
  period?: string
  services: string[]
}

export const worksData: WorkItem[] = [
  {
    id: 1,
    title: "コーポレートサイト制作",
    category: "Webサイト",
    categorySlug: "web",
    description: "企業の魅力を最大限に引き出すコーポレートサイトを制作しました。レスポンシブ対応、SEO最適化を行い、集客につながるサイトを構築。",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2012_58_19-bdzlgfrIBqXOYLF1s4pdHKgoxzqD0S.png",
    client: "株式会社サンプル",
    period: "2024年3月",
    services: ["Webデザイン", "コーディング", "SEO対策"],
  },
  {
    id: 2,
    title: "Webアプリ制作",
    category: "Webアプリ",
    categorySlug: "webapp",
    description: "業務効率化を実現する社内管理システムを開発。直感的なUIと高速なパフォーマンスで、日々の業務をサポートします。",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2013_10_13-Jm88eOSLX7vd63nk6O35UK5GZ5tj1E.png",
    client: "株式会社テック",
    period: "2024年2月",
    services: ["要件定義", "UI/UXデザイン", "フロントエンド開発", "バックエンド開発"],
  },
  {
    id: 3,
    title: "バナー制作",
    category: "バナー",
    categorySlug: "banner",
    description: "Web広告用のバナーを複数サイズで制作。訴求力のあるデザインで、高いクリック率を実現しました。",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2014_36_36-NfB9IynBoY4K1cbp7JfixWYMur2teB.png",
    client: "株式会社アド",
    period: "2024年1月",
    services: ["バナーデザイン", "リサイズ対応"],
  },
  {
    id: 4,
    title: "パンフレット制作（DTP）",
    category: "DTP",
    categorySlug: "dtp",
    description: "会社案内パンフレットを企画からデザイン、印刷手配まで一貫して対応。企業の信頼感を高めるデザインに仕上げました。",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2013_33_05-GcxZ2feGSfQHt5JdafbFv1SH5uFn4Q.png",
    client: "株式会社プリント",
    period: "2023年12月",
    services: ["企画構成", "デザイン制作", "印刷手配"],
  },
  {
    id: 5,
    title: "サービスサイト制作",
    category: "Webサイト",
    categorySlug: "web",
    description: "新規サービスのローンチに合わせたサービスサイトを制作。コンバージョンを意識した導線設計で成果につなげました。",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2013_03_27-Hu6voFEGNkS2b3L0M3var1k8yrQafB.png",
    client: "株式会社サービス",
    period: "2023年11月",
    services: ["Webデザイン", "コーディング", "LP制作"],
  },
  {
    id: 6,
    title: "予約管理システム開発",
    category: "Webアプリ",
    categorySlug: "webapp",
    description: "サロン向けの予約管理システムを開発。顧客管理、予約管理、売上管理を一元化し、業務効率を大幅に改善。",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2013_10_13-Jm88eOSLX7vd63nk6O35UK5GZ5tj1E.png",
    client: "サロンA",
    period: "2023年10月",
    services: ["要件定義", "システム設計", "開発", "運用サポート"],
  },
  {
    id: 7,
    title: "キャンペーンバナー",
    category: "バナー",
    categorySlug: "banner",
    description: "季節キャンペーン用のバナーを各種サイズで制作。統一感のあるデザインでブランドイメージを強化。",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2014_36_36-NfB9IynBoY4K1cbp7JfixWYMur2teB.png",
    client: "株式会社ショップ",
    period: "2023年9月",
    services: ["バナーデザイン", "キャンペーン提案"],
  },
  {
    id: 8,
    title: "商品カタログ制作",
    category: "DTP",
    categorySlug: "dtp",
    description: "商品カタログを企画からデザイン、印刷まで対応。商品の魅力を最大限に引き出す紙面構成を実現。",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%202026%E5%B9%B45%E6%9C%882%E6%97%A5%2013_33_05-GcxZ2feGSfQHt5JdafbFv1SH5uFn4Q.png",
    client: "株式会社製造",
    period: "2023年8月",
    services: ["企画構成", "撮影ディレクション", "デザイン", "印刷"],
  },
]

export const categories = [
  { slug: "all", label: "すべて" },
  { slug: "web", label: "Webサイト" },
  { slug: "webapp", label: "Webアプリ" },
  { slug: "banner", label: "バナー" },
  { slug: "dtp", label: "DTP" },
]
