import DashboardLayout from '@/components/layout/dashboard-layout'

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
        <p className="text-gray-500">Blog posts will go here...</p>
      </div>
    </DashboardLayout>
  )
}