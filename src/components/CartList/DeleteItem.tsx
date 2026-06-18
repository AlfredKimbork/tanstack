import { deleteServerCartItem } from "#/lib/utils/cartServerFunctions"
import { getContext } from "#/integrations/tanstack-query/root-provider"

import type { LoggedInUser } from '#/integrations/tanstack-query/root-provider'

import { FaRegTrashAlt } from 'react-icons/fa'

export default function DeleteItem({ loggedInUser, cart, index }: { loggedInUser: LoggedInUser, cart: { productId: number, productName: string, quantity: number, price: string }[], index: number }) {
  const setCart = getContext().cartContext.setCart;

  return (
    <button 
      className="text-red-500 hover:text-red-700 transition"
      onClick={() => {
        if(cart.length > 1) {
          const newCart = cart.filter((_, i) => i !== index)
          setCart(newCart)
          loggedInUser && deleteServerCartItem({ data: { email: loggedInUser.email, index } })
        } else {
          setCart(null)
          loggedInUser && deleteServerCartItem({ data: { email: loggedInUser.email, index } })
        }
      }}
    ><FaRegTrashAlt /></button>
  )
}