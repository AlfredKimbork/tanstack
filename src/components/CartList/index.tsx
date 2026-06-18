import type { LoggedInUser } from '#/integrations/tanstack-query/root-provider'

import AddItem from './AddItem'
import SubtractItem from './SubtractItem'
import DeleteItem from './DeleteItem'


export default function CartList({ loggedInUser, cart }: { loggedInUser: LoggedInUser, cart: { productId: number, productName: string, quantity: number, price: string }[] }) {
  return (
    <ul className="grid grid-cols-[2fr_1fr_1fr] gap-4 border border-gray-300 rounded-md bg-white divide-y divide-gray-300 p-4 max-w-md mx-auto shadow sm :p-6 lg:p-8">
        {cart.length > 0 ? cart.map( ({ productId, productName, quantity, price }, index) => 
          <li className="col-span-3 grid grid-cols-subgrid border-gray-300 py-2 capitalize flex justify-between items-center" key={index}>
            {index + 1}. {productName}, <br /> Quantity: {quantity}
            <span>{price ? `$${(Number(price) * quantity).toFixed(2)}` : 'Price unavailable'}</span>
            <div className="flex items-center gap-2"> 
              <AddItem loggedInUser={loggedInUser} cart={cart} productId={productId} index={index} productName={productName} price={price} />
              <SubtractItem loggedInUser={loggedInUser} cart={cart} productId={productId} index={index} productName={productName} price={price} quantity={quantity} />
              <DeleteItem loggedInUser={loggedInUser} cart={cart} index={index} />
            </div>
          </li>
          ) : (
            <li className="border-gray-300 py-2">Your cart is empty.</li>
          )}
      </ul>
  )
}