import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { WorkForm } from "../work-form"

export default function AdminWorksNewPage() {
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
          <h1 className="text-2xl font-medium">新しい実績を追加</h1>
        </div>

        <div className="bg-background rounded-lg border p-6">
          <WorkForm />
        </div>
      </div>
    </div>
  )
}
