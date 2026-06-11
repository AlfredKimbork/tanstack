import getServerProducts from '#/lib/utils/getServerProducts'
import { createFileRoute } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/dashboard/products')({
  component: RouteComponent,
  loader: () => getServerProducts(),
})

function RouteComponent() {
  const getProducts = useServerFn(getServerProducts)
  const {data: products} = useQuery({ 
    queryKey: ["products"], 
    queryFn: () => getProducts() ,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
  console.log(products)
  // product name, price, inventory, edit button, delete button
  return <div>Hello "/dashboard/products"!</div>
}
