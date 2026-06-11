import { createFileRoute } from '@tanstack/react-router'
import getProductById from '#/lib/utils/getProductById'

type Product = {
  name: string
  price: string
}

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
  const { name, price } = product
  return (
    <div>
      <h2>Name: {name}</h2>
      <p>Price: {price}</p>
    </div>
  )
}
