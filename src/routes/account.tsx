import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useLoggedInUser } from '#/integrations/tanstack-query/root-provider'

import { deleteServerUser } from '#/lib/utils/userServerFunctions'
import login from '#/lib/login'

import AccountDetails from '#/components/AccountDetails'
import CurrentCart from '#/components/CurrentCart'
import PrevList from '#/components/PrevList'

export const Route = createFileRoute('/account')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id, username, email, password, created_at } = useLoggedInUser() || {};

  const navigate = useNavigate()
  

  return (
    <main className="page-wrap px-4 pb-8 pt-4">
      <h1 className="text-2xl font-bold">Account Page</h1>
      {email && (<>
        <AccountDetails username={username!} email={email} password={password!} created_at={created_at!} />
        <CurrentCart />
        <PrevList />
        <button 
          onClick={() => {
            login(null);
            navigate({ to: '/' });
          }} 
          className="border border-red-500 text-red-500 py-2 px-4 rounded-md"
        >
          Logout
        </button>
        <button 
          onClick={() => {
            deleteServerUser({ data: { id } });
            login(null);
            navigate({ to: '/' });
          }} 
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 ml-4"
        >
          delete account
        </button>
      </>)}
    </main>
  )
}
