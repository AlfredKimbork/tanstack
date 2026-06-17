import type { Product } from "../../../../generated/prisma/client"
import { updateServerProduct } from '#/lib/utils/productServerFunctions'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Row } from '@tanstack/react-table'

export default function AdjustPrice({ cell, row }: { cell: any, row: Row<any> }) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (variables: { id: number; inventory?: number; price?: string }) =>
      updateServerProduct({ data: variables }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] })
      },
    })

  return (
    <button
      tabIndex={1}
      className={`ml-4 px-2 py-1  text-white rounded  transition-colors text-xs 
        ${(cell.row.original as Product).inventory === 0 
          ? 'bg-red-500 hover:bg-red-600' 
          : 'bg-green-500 hover:bg-green-600'
        }
      `}
      onClick={() => {
        if (cell.column.id === 'price') {
          const newPrice = Number(prompt('Adjust price for ' + (row.original as Product).name)?.trim())
          if (!isNaN(newPrice) && newPrice >= 0) mutation.mutate({ id: (row.original as Product).id, price: newPrice.toString(), })
        } else {
          const newInventory = Number(prompt('Adjust inventory for ' + (row.original as Product).name)?.trim())
          if (!isNaN(newInventory) && newInventory >= 0) mutation.mutate({ id: (row.original as Product).id, inventory: newInventory, })
        }
      }}
    >
      Adjust
    </button>
  )
}