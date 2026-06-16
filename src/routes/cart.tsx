import { createFileRoute } from '@tanstack/react-router'
import { getContext, useCart, useLoggedInUser } from '#/integrations/tanstack-query/root-provider'

import { useServerFn } from '@tanstack/react-start'
import updateServerInventory from '#/lib/utils/ProductFn/updateServerProduct'
import getServerProductById from '#/lib/utils/ProductFn/getServerProductById'


import { FaRegTrashAlt } from 'react-icons/fa'
import { deleteServerCartItem, setServerCart } from '#/lib/utils/cartServerFn'
import { setServerUserPrevCart } from '#/lib/utils/userServerFn'

export const Route = createFileRoute('/cart')({
  component: RouteComponent,
})

function RouteComponent() {
  const updateInventory = useServerFn(updateServerInventory)
  const getProductById = useServerFn(getServerProductById)
  const updateCart = useServerFn(setServerCart)
  const deleteProductById = useServerFn(deleteServerCartItem)
  const updatePrevCart = useServerFn(setServerUserPrevCart)
  
  const loggedInUser = useLoggedInUser()
  
  const cart = useCart()
  const setCart = getContext().cartContext.setCart
  
  const existingCart = cart ?? [];

  const cartItemCount = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <h1 className="text-2xl font-bold">Cart: {cartItemCount} items</h1>
      <ul className="mt-4 border border-gray-300 rounded-md bg-white divide-y divide-gray-300 p-4">
        {cart && cart.map(({ productId, productName, quantity }, index) => (
          <li className="border-gray-300 py-2 capitalize flex justify-between items-center" key={index}>
            {index + 1} - {productName}, Quantity: {quantity}
            <div className="flex items-center gap-2"> 
              <button 
                className="px-3 py-0.5 bg-green-500 text-white rounded hover:bg-green-600 transition"
                onClick={() => {
                  setCart(existingCart.map(item => item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item))
                  const existingItem = existingCart.find(item => item.productId === productId);
                  loggedInUser && updateCart({ data: { productId, index, email: loggedInUser.email, quantity: existingItem!.quantity + 1, productName } })
                }}
              >+</button>
              <button
                className="px-3 py-0.5 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                onClick={() => {
                  if(quantity > 1) {
                    setCart(existingCart.map(item => item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item))
                    const existingItem = existingCart.find(item => item.productId === productId);
                    loggedInUser && updateCart({ data: { productId, index, email: loggedInUser.email, quantity: existingItem!.quantity - 1, productName } })
                  } else if(existingCart.length > 1) setCart(existingCart.filter(item => item.productId !== productId))
                      else setCart(null)
                }}
              >-</button>
              <button 
                className="text-red-500 hover:text-red-700 transition"
                onClick={() => {
                  if(existingCart.length > 1) {
                    const newCart = existingCart.filter((_, i) => i !== index)
                    setCart(newCart)
                    loggedInUser && deleteProductById({ data: { email: loggedInUser.email, index } })
                  } else {
                    setCart(null)
                    loggedInUser && deleteProductById({ data: { email: loggedInUser.email, index } })
                  }
                }
                }
              ><FaRegTrashAlt /></button>
            </div>
          </li>
        ))}
      </ul>

      <button
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        onClick={() => {
          if(loggedInUser) updatePrevCart({ data: { email: loggedInUser.email, cart: existingCart } })
          existingCart.forEach(async ({ productId, quantity }) => {
            const product = await getProductById({ data: { id: productId } })
            
            if(!product) return;
            const newInventory = product.inventory - quantity
            await updateInventory({ data: { id: productId, inventory: newInventory } })
          })
          
          setCart(null)
        }}
      >
        Checkout
      </button>
      </main>
  )
}
