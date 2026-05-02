import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { WorkForm } from "../../work-form"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function AdminWorksEditPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: work } = await supabase
    .from("works")
    .select("*")
    .eq("id", id)
    .single()

  if (!work) notFound()

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/admin/works"
            className="p-1.5 rounded hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-muted-foreground" />
          </Link>
          <h1 className="text-2xl font-medium">実績を編集</h1>
        </div>

        <div className="bg-background rounded-lg border p-6">
          <WorkForm initialData={work} />
        </div>
      </div>
    </div>
  )
}
