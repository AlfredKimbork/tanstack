import { createFileRoute, Outlet} from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayoutComponent,
})

function DashboardLayoutComponent() {
  return (
    <main className="p-4 flex flex-col gap-6 justify-start items-center bg-gray-100 sm:p-6 lg:p-8 w-full max-w-4xl mx-auto rounded-md shadow mt-6 mb-6">
      <Outlet />
    </main>
  )
}
