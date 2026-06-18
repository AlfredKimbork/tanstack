import { getContext, setNotice } from "#/integrations/tanstack-query/root-provider"

import { getServerProductById, updateServerProduct } from "#/lib/utils/productServerFunctions"
import { setServerUserPrevCart } from "#/lib/utils/userServerFunctions"

import { useNavigate } from "@tanstack/react-router"

import type { LoggedInUser } from '#/integrations/tanstack-query/root-provider'
import Summary from "./Summary"

export default function CheckoutSummary({totalPrice, cartItemCount, loggedInUser, cart }: {totalPrice: string, cartItemCount: number, loggedInUser: LoggedInUser, cart: { productId: number, productName: string, quantity: number, price: string }[] | null }) {
  const navigate = useNavigate()

  const setCart = getContext().cartContext.setCart
  
  return (
    <section className="p-4 border border-gray-300 rounded-md bg-white max-w-md mx-auto shadow sm:p-6 lg:p-8 w-full gap-4">
        <Summary totalPrice={totalPrice} cart={cart || []} />
        <button
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition w-full sm:w-auto self-end text-sm flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={cartItemCount === 0}
          onClick={() => {
            if(!cart || cart.length === 0) {
              setNotice({ title: 'Cart is empty', message: 'Please add items to your cart before checking out.' })
              setTimeout(() => {
                setNotice(null)
              }, 3000)
              return;
            }
            if(loggedInUser) setServerUserPrevCart({ data: { email: loggedInUser.email, cart } })
              cart.forEach(async ({ productId, quantity }) => {
            const product = await getServerProductById({ data: { id: productId } })
            
            if(!product) return;
            const newInventory = product.inventory - quantity
            await updateServerProduct({ data: { id: productId, inventory: newInventory } })
          })
          setCart(null)
          navigate({ to: '/approved' })
        }}
        >
          Checkout
        </button>
        </section>
  )
}