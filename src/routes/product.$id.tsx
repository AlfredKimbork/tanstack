import { createFileRoute, useNavigate } from '@tanstack/react-router'
import getProductById from '#/lib/utils/ProductFn/getServerProductById'
import type { Product } from '#/../generated/prisma/client'
import updateServerInventory from '#/lib/utils/ProductFn/updateServerInventory'
import { useServerFn } from '@tanstack/react-start'

export const Route = createFileRoute('/product/$id')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const { id } = params
    const product = await getProductById({ data: { id: Number(id) } })
    return { product }
  }
})

function RouteComponent() {
  const { product }: { product: Product } = Route.useLoaderData()
  const { id,name, price, inventory } = product
  const updateInventory = useServerFn(updateServerInventory)

  const Navigate = useNavigate()
  

  return (
    <main className="p-4">
    <div className="p-4 border border-gray-300 rounded">
      <h2>Name: {name}</h2>
      <p>Price: {price}</p>
      <p>In stock: {inventory}</p>
    </div>
    <button
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded w-fit"
      onClick={async () => {
        if( await updateInventory({ data: { id, inventory: inventory - 1 } }) ) {
          Navigate({ to: '/products' })
          alert('Purchase successful!')
        } else alert('Purchase failed. Please try again.')
      }}
    >
      buy
    </button>
    </main>
  )
}
