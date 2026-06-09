import { createFileRoute, Link } from '@tanstack/react-router'
import { getProducts } from '../utils'

type Product = {
  id: string
  name: string
}

export const Route = createFileRoute('/products')({
  component: RouteComponent,
  loader: async () => {
    const products = await getProducts()
    return { products }
  }
})

function RouteComponent() {
  const { products }: { products: Product[] } = Route.useLoaderData()

  return (
    <section>
      <h2>Products</h2>
      <ul>
        {products.map(({ id, name }) => (
          <li key={id}>
            <Link to="/product/$id" params={{ id }}>
              { name }
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
