"use client"

import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Props {
  postId: string
  postTitle: string
}

export function BlogDeleteButton({ postId, postTitle }: Props) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm(`「${postTitle}」を削除しますか？この操作は元に戻せません。`)) return

    const supabase = createClient()
    const { error } = await supabase.from("blog_posts").delete().eq("id", postId)

    if (error) {
      alert("削除に失敗しました: " + error.message)
      return
    }

    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      className="p-1.5 rounded hover:bg-muted transition-colors"
      title="削除"
    >
      <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
    </button>
  )
}
