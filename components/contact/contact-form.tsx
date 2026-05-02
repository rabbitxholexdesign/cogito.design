"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle } from "lucide-react"

const contactSchema = z.object({
  name: z.string().min(1, "お名前を入力してください"),
  company: z.string().optional(),
  email: z.string().email("有効なメールアドレスを入力してください"),
  phone: z.string().optional(),
  service: z.string().min(1, "ご相談内容を選択してください"),
  message: z.string().min(10, "お問い合わせ内容を10文字以上で入力してください"),
})

type ContactFormData = z.infer<typeof contactSchema>

const serviceOptions = [
  { value: "", label: "選択してください" },
  { value: "web", label: "Web制作" },
  { value: "webapp", label: "Webアプリ制作" },
  { value: "banner", label: "バナー制作" },
  { value: "dtp", label: "DTP制作" },
  { value: "other", label: "その他" },
]

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error || '送信に失敗しました')
      }

      setIsSubmitted(true)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : '送信に失敗しました。もう一度お試しください。')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-foreground/10 flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-foreground" />
        </div>
        <h3 className="mt-6 text-xl font-medium">送信完了</h3>
        <p className="mt-4 text-muted-foreground">
          お問い合わせいただきありがとうございます。<br />
          内容を確認の上、2〜3営業日以内にご連絡いたします。
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          お名前 <span className="text-destructive">*</span>
        </label>
        <Input
          id="name"
          type="text"
          placeholder="山田 太郎"
          {...register("name")}
          className={errors.name ? "border-destructive" : ""}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium mb-2">
          会社名・団体名
        </label>
        <Input
          id="company"
          type="text"
          placeholder="株式会社サンプル"
          {...register("company")}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          メールアドレス <span className="text-destructive">*</span>
        </label>
        <Input
          id="email"
          type="email"
          placeholder="example@email.com"
          {...register("email")}
          className={errors.email ? "border-destructive" : ""}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          電話番号
        </label>
        <Input
          id="phone"
          type="tel"
          placeholder="03-1234-5678"
          {...register("phone")}
        />
      </div>

      {/* Service */}
      <div>
        <label htmlFor="service" className="block text-sm font-medium mb-2">
          ご相談内容 <span className="text-destructive">*</span>
        </label>
        <select
          id="service"
          {...register("service")}
          className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
            errors.service ? "border-destructive" : ""
          }`}
        >
          {serviceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.service && (
          <p className="mt-1 text-sm text-destructive">{errors.service.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          お問い合わせ内容 <span className="text-destructive">*</span>
        </label>
        <Textarea
          id="message"
          placeholder="ご相談内容やご質問をお書きください"
          rows={6}
          {...register("message")}
          className={errors.message ? "border-destructive" : ""}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      {/* Privacy Note */}
      <div className="text-sm text-muted-foreground">
        <p>
          お預かりした個人情報は、お問い合わせへの対応にのみ使用いたします。
        </p>
      </div>

      {/* Error Message */}
      {submitError && (
        <div className="rounded-md bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
          {submitError}
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          type="submit"
          size="lg"
          className="w-full bg-foreground text-background hover:bg-foreground/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? "送信中..." : "送信する"}
        </Button>
      </div>
    </form>
  )
}
