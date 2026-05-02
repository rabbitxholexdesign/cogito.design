import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import './globals.css'

const notoSansJP = Noto_Sans_JP({ 
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: {
    default: 'cogito.design | Web制作・Webアプリ制作事務所',
    template: '%s | cogito.design'
  },
  description: 'cogito.designは、Web制作、Webアプリ制作、バナー、DTP制作まで、課題を丁寧に整理し、伝わるデザインと確かな技術でビジネスの成長をサポートするWeb制作事務所です。',
  keywords: ['Web制作', 'Webアプリ制作', 'バナー制作', 'DTP制作', 'ホームページ制作', 'デザイン'],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'cogito.design',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
