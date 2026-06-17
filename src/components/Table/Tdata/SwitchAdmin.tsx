import { updateServerAdministrator } from '#/lib/utils/userServerFunctions'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Row } from '@tanstack/react-table'
import type { User } from '#/../generated/prisma/client'

export default function SwitchAdmin({row}: { row: Row<User> }) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
      mutationFn: (variables: { id: number; administrator: boolean }) =>
        updateServerAdministrator({ data: variables }),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["users"] })
        },
      })

  return (
    <button
              className="ml-4 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-xs"
              onClick={() =>
                mutation.mutate({
                  id: (row.original as User).id,
                  administrator: !(row.original as User).administrator,
                })
              }
            >
              Switch admin
            </button>
  )
}