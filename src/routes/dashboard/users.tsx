import { createFileRoute } from '@tanstack/react-router'
import getServerUsers from '#/lib/utils/getServerUsers'
import { useServerFn } from '@tanstack/react-start'
import { useQuery } from '@tanstack/react-query'
import UserTable from '#/components/tables/UserTable'

export const Route = createFileRoute('/dashboard/users')({
  component: RouteComponent,
  loader: () => getServerUsers(),
})

function RouteComponent() {
  const getUsers = useServerFn(getServerUsers)

  const { data: users } = useQuery({ 
    queryKey: ["users"], 
    queryFn: () => getUsers() ,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
  console.log(users)

  // username, email, admin status, delete button
  return (
    <UserTable />
    
  )
}
