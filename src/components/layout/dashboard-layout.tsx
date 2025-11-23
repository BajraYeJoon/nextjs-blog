import Header from "./header"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
      <div className="max-w-7xl mx-auto bg-background max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        <main className="">
            {children}
        </main>
      </div>
  )
}