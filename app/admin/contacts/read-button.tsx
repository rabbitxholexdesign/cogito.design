"use client"

import { useRouter } from "next/navigation"
import { Check } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Props {
  contactId: string
}

export function ContactReadButton({ contactId }: Props) {
  const router = useRouter()

  const handleMarkRead = async () => {
    const supabase = createClient()
    const { error } = await supabase
      .from("contacts")
      .update({ is_read: true })
      .eq("id", contactId)

    if (error) {
      alert("更新に失敗しました: " + error.message)
      return
    }

    router.refresh()
  }

  return (
    <button
      onClick={handleMarkRead}
      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border border-border hover:bg-muted transition-colors text-muted-foreground"
      title="既読にする"
    >
      <Check className="w-3.5 h-3.5" />
      既読にする
    </button>
  )
}
