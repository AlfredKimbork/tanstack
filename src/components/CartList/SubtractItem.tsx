import { getContext } from '#/integrations/tanstack-query/root-provider';
import { setServerCart } from '#/lib/utils/cartServerFunctions';

import type { LoggedInUser } from '#/integrations/tanstack-query/root-provider'

export default function subtractItem({ loggedInUser, cart, productId, index, productName, price, quantity }: { loggedInUser: LoggedInUser, cart: { productId: number, productName: string, quantity: number, price: string }[], productId: number, index: number, productName: string, price: string, quantity: number }) {
  const setCart = getContext().cartContext.setCart;
  return (
    <button
      className="px-3 py-0.5 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
      onClick={() => {
        if(quantity > 1) {
          setCart(cart.map(item => item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item))
          const existingItem = cart.find(item => item.productId === productId);
          loggedInUser && setServerCart({ data: { productId, index, email: loggedInUser.email, quantity: existingItem!.quantity - 1, productName, price } })
        } else if(cart.length > 1) setCart(cart.filter(item => item.productId !== productId))
          else setCart(null)
      }}
    >-</button>
  )
}