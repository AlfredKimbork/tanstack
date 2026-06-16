import { getContext, useLoggedInUser } from '#/integrations/tanstack-query/root-provider'
import { useServerFn } from '@tanstack/react-start'
import { setServerCart } from '#/lib/utils/cartServerFn'

export default function CartButton({ productId, productName, amount, index, disabled }: { productId: number, productName: string, amount?: number, index?: number, disabled?: boolean }) {
  const setCart = getContext().cartContext.setCart;
  const updateCart = useServerFn(setServerCart)
  const loggedInUser = useLoggedInUser()

  amount = amount ?? 1

  return (
    <button 
      disabled={disabled}
      className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm flex items-center gap-2 ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      onClick={(e) => {
        e.preventDefault();
        console.log(index)
        const cart = getContext().cartContext.cart
        const prevCart = cart ?? [];
        const existingItem = cart?.find(item => item.productId === productId);
        if(existingItem) {
          setCart(prevCart.map(item => item.productId === productId ? { ...item, quantity: item.quantity + amount } : item))
          loggedInUser && updateCart({ data: { productId, index, email: loggedInUser.email, quantity: existingItem.quantity + amount, productName } })
        } else {
          setCart([...cart ?? [], { productId, productName, quantity: amount }])
          loggedInUser && updateCart({ data: { productId, index, email: loggedInUser.email, quantity: amount, productName } })
        }
      }}
    >
      Add to cart 
    </button>
  )
}