import { Link } from '@tanstack/react-router'

import { useCart } from '#/integrations/tanstack-query/root-provider'
import Header from './Header'
import List from './List'

export default function CurrentCart() {
  const currentCart = useCart()

  return (
    <section className="my-4 p-4 border border-gray-300 rounded-md bg-white shadow w-full mx-auto sm:p-6 lg:p-8 flex flex-col gap-4 justify-start items-start">
      <Header />
      <List currentCart={currentCart} />
      <Link 
        to='/cart' 
        className={`text-sm text-white py-1 px-3 rounded mx-auto ${currentCart && currentCart.length > 0 ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`}
        onClick={(e) => {
          if (!currentCart || currentCart.length === 0) {
            e.preventDefault();
          }
        }}
      >
        Proceed to checkout
      </Link>
    </section>
  )
}