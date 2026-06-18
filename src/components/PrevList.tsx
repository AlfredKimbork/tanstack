import { useQuery } from '@tanstack/react-query'
import { useLoggedInUser } from '#/integrations/tanstack-query/root-provider'
import { getServerUserPrevCart } from '#/lib/utils/userServerFunctions';

export default function PrevList() {
  const { email } = useLoggedInUser() || {};

  const {data: prevCart} = useQuery({
    queryKey: ['prevCart', email],
    queryFn: () => getServerUserPrevCart({ data: { email: email! } }),
  })

  return (
    <section className="my-4 p-4 border border-gray-300 rounded-md bg-white shadow w-full mx-auto sm:p-6 lg:p-8 flex flex-col gap-4 justify-start items-start col-span-2">
      <header className="flex items-center justify-between mb-4 w-full">
          <h2 className="text-lg font-semibold">Latest purchases</h2>
          <span className="text-sm text-gray-500">{prevCart ? `You have ${prevCart.length} previous purchases.` : 'You have no previous purchases.'}</span>
      </header>
      <ul className="flex gap-4 overflow-x-auto py-2 whitespace-nowrap w-full w-full mx-auto">
        {
          prevCart && prevCart.length > 0
            ? prevCart.map((cart, index) => (
              <li key={index} >
                <ul className="border border-gray-200 rounded-md p-4 bg-gray-50 w-full shadow flex flex-col gap-2 justify-start items-start text-sm text-gray-700">
                  {cart.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="pb-2">
                      {item.productName} - Quantity: {item.quantity}
                    </li>
                  ))}
                </ul>
              </li>
            )).reverse() 
            : email 
              ? (<li>Make a purchase to see your purchase history</li>)
              : (<li>Please log in to see your purchase history</li>)
        }  
      </ul>
    </section>
  )
}