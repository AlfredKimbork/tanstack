import { createFileRoute } from '@tanstack/react-router'
import { getServerProductById } from '#/lib/utils/productServerFunctions'
import type { Product } from '#/../generated/prisma/client'
import CartButton from '#/components/CartButton'
import { useState } from 'react'

export const Route = createFileRoute('/product/$id')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const { id } = params
    const product = await getServerProductById({ data: { id: Number(id) } })
    return { product, id }
  }
})

function RouteComponent() {
  const { product, id: index }: { product: Product; id: String } = Route.useLoaderData()
  const { id, name, price, inventory } = product  

  const [amount, setAmount] = useState(1)

  return (
    <main className="p-4 bg-gray-100 rounded shadow w-full max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{name}</h1>
      <p className="text-lg mb-2">Price: ${price}</p>
      <p className="text-lg mb-4">Inventory: {inventory}</p>
      <div className="flex items-center gap-4 mb-4">
        <label htmlFor="amount" className="text-lg font-medium">
          Amount:
        </label>
        <input
          id="amount"
          type="number"
          min="1"
          max={inventory}
          value={amount}
          onChange={(e) => setAmount(Math.max(1, Math.min(inventory, Number(e.target.value))))}
          className={`border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-24 text-center text-lg font-medium text-gray-700 hover:border-gray-400 transition duration-200 ${inventory === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
        />
      </div>
      <CartButton productId={id} productName={name} amount={amount} price={price} index={Number(index) - 1} disabled={inventory === 0} />
    </main>
  )
}
