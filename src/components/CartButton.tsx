import { getContext } from '#/integrations/tanstack-query/root-provider'

export default function Cart({ productId, productName }: { productId: number, productName: string }) {
  const setCart = getContext().cartContext.setCart

  return (
    <button 
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm flex items-center gap-2"
      onClick={() => {
        const cart = getContext().cartContext.cart
        const prevCart = cart ?? [];
        const existingItem = cart?.find(item => item.productId === productId);
        if(existingItem) {
          setCart(prevCart.map(item => item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item))
        } else {
          setCart([...cart ?? [], { productId, productName, quantity: 1 }])
        }
      }}
    >
      Add to cart 
    </button>
  )
}