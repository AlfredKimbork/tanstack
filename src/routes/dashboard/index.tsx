import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-lg text-gray-700">Welcome to the dashboard! This is a protected route that only logged-in administrators can access.</p>
      <p className="text-lg text-gray-700">From here, you can manage user accounts and view system information.</p>
    </>
  )
}
