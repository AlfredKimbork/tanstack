import { createFileRoute, Link } from '@tanstack/react-router'
import getServerProducts from '#/lib/utils/ProductFn/getServerProducts'
import type { Product } from '#/../generated/prisma/client'
import CartButton from '#/components/CartButton'

export const Route = createFileRoute('/products')({
  component: RouteComponent,
  loader: async () => {
    const products = await getServerProducts({data: { sortby: 'id', direction: 'asc' }})
    return { products }
  }
})

function RouteComponent() {
  const { products }: { products: Product[] } = Route.useLoaderData()

  return (
    <div className="p-4 space-y-4 bg-gray-100 rounded shadow w-full max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">Products</h1>
      <ul className="space-y-2">
        {products.map(({ id, name, price, inventory }, index) => (
          <li key={id}>
            <Link to='/product/$id' params={{ id: String(id) }} className={`p-4 border border-gray-300 rounded bg-white hover:bg-gray-50 transition flex justify-between items-center ${inventory === 0 ? 'cursor-not-allowed opacity-50' : ''}`}>
              {name} - ${price} {inventory === 0 && <span className="text-red-500 italic">Out of stock</span>}
              <CartButton productId={id} productName={name} index={index} disabled={inventory === 0} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
