import { useCart } from '#/integrations/tanstack-query/root-provider'
import Header from './Header'
import List from './List'

export default function CurrentCart() {
  const currentCart = useCart()

  return (
    <section className="my-4 p-4 border border-gray-300 rounded-md bg-white">
      <Header currentCart={currentCart} />
      <List currentCart={currentCart} />
    </section>
  )
}