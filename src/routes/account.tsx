import { createFileRoute, Link } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import login from '#/lib/login'
import deleteUser from '#/lib/utils/UserFn/deleteServerUser'
import { useState } from 'react'
import { useCart, useLoggedInUser } from '#/integrations/tanstack-query/root-provider'
import { getServerUserPrevCart } from '#/lib/utils/userServerFn'
import { useServerFn } from '@tanstack/react-start'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/account')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id, username, email, password, created_at } = useLoggedInUser() || {};
  const getPrevCart = useServerFn(getServerUserPrevCart)

  const navigate = useNavigate()
  const currentCart = useCart()
  const [showPassword, setShowPassword] = useState(false);

  const {data: prevCart} = useQuery({
    queryKey: ['prevCart', email],
    queryFn: () => getPrevCart({ data: { email: email! } }),
  })

  console.log('Previous cart data:', prevCart)


  return (
    <main className="page-wrap px-4 pb-8 pt-4">
      <h1 className="text-2xl font-bold">Account Page</h1>
      {email && (<>
        <section className="my-4 p-4 border border-gray-300 rounded-md bg-white">
          <h2 className="text-lg font-semibold">Account details</h2>
          <ul>
            <li>Username: {username}</li>
            <li>Email: {email}</li>
            <li>
              password:
              <span>{showPassword ? ` ${password}` : ' ••••••••'}</span>
              <button 
              className="ml-2 px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 transition"
              onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
              <button
                className="ml-2 px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Change (not implemented)
              </button>
            </li>
            <li>Member since: {created_at!.toString().slice(0, 10)}</li>
          </ul>
        </section>
        <section className="my-4 p-4 border border-gray-300 rounded-md bg-white">
          <header className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Current basket</h2>
            <nav>
              <ul className="flex gap-4">
                <li>
                  <Link to='/products' className="text-sm text-blue-500 hover:underline">
                    Browse products
                  </Link>
                </li>
                <li>
                  <Link to='/cart' className={`text-sm text-white py-1 px-3 rounded ${currentCart && currentCart.length > 0 ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`}
                    onClick={(e) => {
                      if (!currentCart || currentCart.length === 0) {
                        e.preventDefault();
                      }
                    }}
                    >
                    Checkout
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          <ul className="flex gap-4 overflow-x-auto py-2 whitespace-nowrap">
            {currentCart ? currentCart.map((item, index) => (
              <li key={index} className="border border-gray-300 rounded-md p-2 bg-gray-50">
                {index + 1}. {item.productName} - Quantity: {item.quantity}
              </li>
            ))
            : (
              <li className="border border-gray-300 rounded-md p-2 bg-gray-50">
                Your basket is empty
              </li>
            )}
          </ul>
        </section>
        <section className="my-4 p-4 border border-gray-300 rounded-md bg-white">
          <h2 className="text-lg font-semibold">Latest purchases</h2>
          <ul className="flex gap-4 overflow-x-auto py-2 whitespace-nowrap">
            {
              prevCart && prevCart.length > 0
                ? prevCart.map((cart, index) => {
                    console.log('Rendering previous cart:', cart)
                    return (
                      <li key={index} >
                        <ul className="border border-gray-300 rounded-md p-2 bg-gray-50 divide-y divide-gray-200">
                          {cart.items.map((item, itemIndex) => {
                            console.log('Rendering previous cart item:', item)
                            return (
                              <li key={itemIndex} className="pb-2">
                                {item.productName} - Quantity: {item.quantity}
                              </li>
                            )
                          })}
                        </ul>
                      </li>
                    )
                  }).reverse() 
                : (
                  <li>Make an account to see your purchase history</li>
                )
            }  
          </ul>
        </section>
        <button 
        onClick={() => {
          console.log('Logging out user:', { id, username, email })
          login(null);
          navigate({ to: '/' });
        }} 
        className="border border-red-500 text-red-500 py-2 px-4 rounded-md">
          Logout
        </button>
        <button 
        onClick={() => {
          deleteUser({ data: { id } });
          login(null);
          navigate({ to: '/' });
        }} 
        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 ml-4">
          delete account
        </button>
      </>)}
    </main>
  )
}
