import { createFileRoute, Link } from '@tanstack/react-router'
import { useLoggedInUser } from '#/integrations/tanstack-query/root-provider'

import AccountDetails from '#/components/AccountDetails'
import CurrentCart from '#/components/CurrentCartSection'
import PrevList from '#/components/PrevList'

export const Route = createFileRoute('/account')({
  component: RouteComponent,
})

function RouteComponent() {
  const loggedInUser = useLoggedInUser()
  const { id, username, email, password, created_at } = loggedInUser || {};
  
  return (
    <main className="min-h-screen p-4 md:flex md:flex-col gap-6 justify-start items-center bg-gray-100 sm:p-6 lg:p-8 w-full max-w-4xl mx-auto rounded-md shadow mt-6 mb-6">
      {
        email && id !== undefined ? (
          <>
            <h1 className="text-2xl font-bold">Account Page</h1>
            <div className="lg:grid lg:grid-cols-2 lg:gap-6 w-full">
                <AccountDetails username={username!} email={email!} password={password!} created_at={created_at!} id={id!} />
                <CurrentCart />
                <PrevList />
            </div>
          </>
        ) : (
          <>
            <p className="text-center text-gray-700">You need to log in again before viewing account details or deleting the account.</p>
            <Link to="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </>
        )
      }
    </main>
  )
}
