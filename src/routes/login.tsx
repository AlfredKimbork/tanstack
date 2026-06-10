import { createFileRoute, Link } from '@tanstack/react-router'
import LoginForm from '#/components/forms/LoginForm'
// import { FieldInfo } from './FieldInfo.tsx'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="flex flex-col items-center gap-4 bg-slate-100 justify-center grow-1">
      <LoginForm />
      <Link to="/sign-up" className="text-sm inline-block">
        Don't have an account? Sign up
      </Link>
    </main>
  )
}
