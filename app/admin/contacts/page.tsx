import { createClient } from "@/lib/supabase/server"
import { ContactReadButton } from "./read-button"

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

const serviceLabels: Record<string, string> = {
  web: "Web制作",
  webapp: "Webアプリ制作",
  banner: "バナー制作",
  dtp: "DTP制作",
  other: "その他",
}

export default async function AdminContactsPage() {
  const supabase = await createClient()
  const { data: contacts } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false })

  const unreadCount = contacts?.filter((c) => !c.is_read).length ?? 0

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <h1 className="text-2xl font-medium">お問い合わせ管理</h1>
          {unreadCount > 0 && (
            <span className="text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
              未読 {unreadCount} 件
            </span>
          )}
        </div>

        <div className="space-y-4">
          {contacts && contacts.length > 0 ? (
            contacts.map((contact) => (
              <div
                key={contact.id}
                className={`bg-background rounded-lg border p-6 ${
                  !contact.is_read ? "border-orange-200 bg-orange-50/30" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-3">
                      {!contact.is_read && (
                        <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                          未読
                        </span>
                      )}
                      <h3 className="font-medium">{contact.name}</h3>
                      {contact.company && (
                        <span className="text-sm text-muted-foreground">{contact.company}</span>
                      )}
                      <span className="text-xs text-muted-foreground ml-auto">
                        {formatDate(contact.created_at)}
                      </span>
                    </div>

                    {/* Contact Info */}
                    <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
                      <a href={`mailto:${contact.email}`} className="hover:text-foreground">
                        {contact.email}
                      </a>
                      {contact.phone && <span>{contact.phone}</span>}
                      <span className="font-medium text-foreground">
                        {serviceLabels[contact.service] ?? contact.service}
                      </span>
                    </div>

                    {/* Message */}
                    <div className="mt-3 text-sm leading-relaxed whitespace-pre-wrap text-foreground/80 bg-muted/50 rounded-md p-3">
                      {contact.message}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex-shrink-0">
                    {!contact.is_read && (
                      <ContactReadButton contactId={contact.id} />
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-background rounded-lg border text-center py-16">
              <p className="text-muted-foreground text-sm">お問い合わせはまだありません</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
