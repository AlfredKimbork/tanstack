import type { Cart } from '#/integrations/tanstack-query/root-provider'
import Item from './Item'

export default function List({ currentCart }: { currentCart: Cart }) {
  return (
    <ul className="flex flex-col gap-4 w-full mx-auto text-sm text-gray-700 w-full max-w-2xl mx-auto border border-gray-300 rounded-md p-4 bg-gray-50 shadow">
      {currentCart 
        ? currentCart.map((item, index) => <Item item={item} index={index} />)
        : (<li className="border border-gray-300 rounded-md p-2 bg-gray-50">Your basket is empty</li>)
      }
    </ul>
  )
}