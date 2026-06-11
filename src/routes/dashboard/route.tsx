import { createFileRoute, Outlet} from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayoutComponent,
})

function DashboardLayoutComponent() {
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <Outlet />
    </main>
  )
}
