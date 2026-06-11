import { createFileRoute } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import login from '#/lib/login'
import deleteUser from '#/lib/utils/deleteUser'
import { useLoggedInUser } from '#/integrations/tanstack-query/root-provider'

export const Route = createFileRoute('/account')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { id } = useLoggedInUser() || {};


  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <h1>Account Page</h1>
      <button 
        onClick={() => {
          login(null);
          navigate({ to: '/' });
        }} 
        className="border border-red-500 text-red-500 py-2 px-4 rounded-md">
        Logout
      </button>
      <button 
        onClick={() => {
          deleteUser({ data: { id } });
          login(null);
          navigate({ to: '/' });
        }} 
        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 ml-4">
        delete account
      </button>
    </main>
  )
}
