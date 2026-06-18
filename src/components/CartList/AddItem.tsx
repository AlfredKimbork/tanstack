import { getContext } from "#/integrations/tanstack-query/root-provider";

import { getServerProductById } from "#/lib/utils/productServerFunctions";
import { setServerCart } from "#/lib/utils/cartServerFunctions";

import { setNotice } from "#/integrations/tanstack-query/root-provider";
import type { LoggedInUser } from '#/integrations/tanstack-query/root-provider'

export default function AddItem({ loggedInUser, cart, productId, index, productName, price } : { loggedInUser: LoggedInUser, cart: { productId: number, productName: string, quantity: number, price: string }[] , productId: number, index: number, productName: string, price: string }) {
  const setCart = getContext().cartContext.setCart;
  
  return (
    <button 
      className="px-3 py-0.5 bg-green-500 text-white rounded hover:bg-green-600 transition"
      onClick={async () => {
        const product = await getServerProductById({ data: { id: productId } });
        const prevCart = cart ?? [];
        const existingItem = cart?.find(item => item.productId === productId);
        if (product!.inventory >= existingItem!.quantity + 1) {
          setCart(prevCart.map(item => item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item))
          loggedInUser && setServerCart({ data: { productId, index, email: loggedInUser.email, quantity: existingItem!.quantity + 1, productName, price } })
        } else {
          setNotice({ title: 'Not enough inventory', message: `theres not more than ${product!.inventory} in stock.` })
          setTimeout(() => {
            setNotice(null)
          }, 5000)
        }
      }}
    >+</button>
  )
}