import { createFileRoute } from '@tanstack/react-router'
import { useCart, useLoggedInUser } from '#/integrations/tanstack-query/root-provider'

import CartList from '#/components/CartList'
import CheckoutSummary from '#/components/CheckOutSummary'

export const Route = createFileRoute('/cart')({
  component: RouteComponent,
})

function RouteComponent() {
  
  const loggedInUser = useLoggedInUser()
  const cart = useCart()
  
  const existingCart = cart ?? [];

  const cartItemCount = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0
  const totalPrice = cart ? cart.reduce((total, item) => total + (Number(item.price) * item.quantity), 0).toFixed(2) : '0.00'
  return (
    <main className="p-4 flex flex-col gap-6 justify-start items-center bg-gray-100 sm:p-6 lg:p-8 w-full max-w-4xl mx-auto rounded-md shadow mt-6 mb-6">
      <h1 className="text-2xl font-bold">Cart: {cartItemCount} items</h1>
      <div className="w-full flex flex-col gap-6 lg:flex-row">
        <CartList loggedInUser={loggedInUser} cart={existingCart} />
        <CheckoutSummary totalPrice={totalPrice} cartItemCount={cartItemCount} loggedInUser={loggedInUser} cart={existingCart} />
      </div>
      </main>
  )
}