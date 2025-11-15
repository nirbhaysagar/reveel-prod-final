import { Sidebar } from "@/components/ui/dashboard/sidebar"
import { Header } from "@/components/ui/dashboard/header"
import { Providers } from "@/components/providers/session-provider"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-8 bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </Providers>
  )
}

