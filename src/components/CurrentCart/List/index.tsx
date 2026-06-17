import type { Cart } from '#/integrations/tanstack-query/root-provider'
import Item from './Item'

export default function List({ currentCart }: { currentCart: Cart }) {
  return (
    <ul className="flex gap-4 overflow-x-auto py-2 whitespace-nowrap">
      {currentCart 
        ? currentCart.map((item, index) => <Item item={item} index={index} />)
        : (<li className="border border-gray-300 rounded-md p-2 bg-gray-50">Your basket is empty</li>)
      }
    </ul>
  )
}