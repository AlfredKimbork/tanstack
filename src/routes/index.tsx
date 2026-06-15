import { createFileRoute } from '@tanstack/react-router'
import { useLoggedInUser } from '#/integrations/tanstack-query/root-provider'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const loggedInUser = useLoggedInUser()
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      {loggedInUser ? <p>Welcome, {loggedInUser.username}!</p> : <p>Welcome, Guest!</p>}
    </main>
  )
}
