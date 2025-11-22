import Header from "./header"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto">
          <div>
            {children}
          </div>
        </main>
      </div>
  )
}