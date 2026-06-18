export default function Summary({ totalPrice, cart }: { totalPrice: string, cart: { productId: number, productName: string, quantity: number, price: string }[] | [] }) {

  return (
    <div className="mt-4 flex flex-col items-center gap-4 border-b border-gray-300 pb-4 w-full">
      <ul className="w-full divide-y divide-gray-300 max-h-60 overflow-y-auto px-4 py-2 bg-gray-50 rounded shadow w-full max-w-md mx-auto grid grid-cols-[4fr_1fr_2fr]">
          {cart.map((item) => (
            <li key={item.productId} className="flex items-center gap-2 capitalize w-full col-span-3 grid grid-cols-subgrid py-2">
              <span>{item.productName}</span>
              <span>x{item.quantity}</span>
              <span>${(Number(item.price) * item.quantity).toFixed(2)}</span>
            </li>
          ))}
      </ul>
      <span className="text-lg font-semibold self-start">Total: ${totalPrice}</span>
    </div>
  )
}