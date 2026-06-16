import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <h1>Dashboard</h1>
      
    </main>
  )
}
