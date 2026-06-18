import { getContext, setNotice, useLoggedInUser } from '#/integrations/tanstack-query/root-provider'
import { useServerFn } from '@tanstack/react-start'
import { setServerCart } from '#/lib/utils/cartServerFunctions'
import { getServerProductById } from '#/lib/utils/productServerFunctions'

export default function CartButton({ productId, productName, amount, price, index, disabled }: { productId: number, productName: string, amount?: number, price: string, index?: number, disabled?: boolean }) {
  const getProductById = useServerFn(getServerProductById)
  const setCart = getContext().cartContext.setCart;
  const updateCart = useServerFn(setServerCart)
  const loggedInUser = useLoggedInUser()

  amount = amount ?? 1

  return (
    <button 
      disabled={disabled}
      className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm flex items-center gap-2 w-fit ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      onClick={async (e) => {
        e.preventDefault();
        const cart = getContext().cartContext.cart
        const prevCart = cart ?? [];
        const existingItem = cart?.find(item => item.productId === productId);
        if(cart && existingItem) {
          const product = await getProductById({ data: { id: productId } });
          if (product!.inventory >= existingItem.quantity + amount) {
            setCart(prevCart.map(item => item.productId === productId ? { ...item, quantity: item.quantity + amount } : item))
            loggedInUser && updateCart({ data: { productId, index, email: loggedInUser.email, quantity: existingItem.quantity + amount, productName, price: product!.price || 'Price unavailable' } })
          } else {
            setNotice({ title: 'Not enough inventory', message: `theres not more than ${product!.inventory} in stock and you have ${existingItem!.quantity} in your cart.` })
            setTimeout(() => {
              setNotice(null)
            }, 5000)
          }
        } else {
          setCart([...cart ?? [], { productId, productName, quantity: amount, price: price || 'Price unavailable' }])
          loggedInUser && updateCart({ data: { productId, index, email: loggedInUser.email, quantity: amount, productName, price: price || 'Price unavailable' } })
        }
      }}
    >
      Add to cart 
    </button>
  )
}