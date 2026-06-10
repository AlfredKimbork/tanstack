import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

import SignUpForm from '#/components/forms/SignUpForm'

export const Route = createFileRoute('/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="flex flex-col items-center gap-4 bg-slate-100 justify-center grow-1">
      <SignUpForm />
      <Link to="/login" className="text-sm inline-block">
        Already have an account? Login
      </Link>
    </main>
  )
}
