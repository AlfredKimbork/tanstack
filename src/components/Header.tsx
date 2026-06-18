import { Link, useLocation } from '@tanstack/react-router'
import { useCart, useLoggedInUser } from '#/integrations/tanstack-query/root-provider'

import { GrCart } from 'react-icons/gr'

export default function Header() {
  const location = useLocation()
  const loggedInUser = useLoggedInUser()
  const cart = useCart()

  const cartItemCount = cart ? cart.reduce((total, item) => total + item.quantity, 0) : null

  return (
    <header className="sticky top-0 z-50 flex gap-16 items-center px-4 py-3 border-b border-gray-300 shadow-sm justify-between w-full max-w-7xl mx-auto backdrop-blur bg-opacity-30 rounded-md bg-white-transparent">
      <Link to="/" className="text-3xl font-bold w-fit text-blue-500 hover:text-blue-600 transition">
        logo
      </Link>

      <nav className="flex items-center gap-4 justify-center w-full max-w-3xl">
        <ul className="flex gap-4">
          <li><Link to="/" activeProps={{ className: "text-blue-500 font-bold" }}>Home</Link></li>
          <li><Link to="/products" activeProps={{ className: "text-blue-500 font-bold" }}>Products</Link></li>
          {loggedInUser?.administrator && (
            <li><Link to="/dashboard" activeProps={{ className: "text-blue-500 font-bold" }}>Dashboard</Link></li>
          )}
          {location.pathname.startsWith('/dashboard') && (
            <>
                <li className="select-none">-</li>
                <li><Link to="/dashboard/users" activeProps={{ className: "text-blue-500 font-bold" }}>Users</Link></li>
                <li><Link to="/dashboard/products" activeProps={{ className: "text-blue-500 font-bold" }}>Products</Link></li>
              </>
          )}
        </ul>
      </nav>

        <ul className="flex items-center gap-4 justify-end">
          <li className="flex items-center gap-1 relative">
            <Link to="/cart" ><GrCart size={20}/></Link>
            {cartItemCount && <span className="absolute -top-3.5 -right-3.5 bg-red-500 text-white text-[12px] rounded-full h-5 w-5 flex items-center justify-center">{cartItemCount}</span>}
          </li>
          <li>
            <Link to={loggedInUser ? "/account" : "/login"} className="px-4 py-2 rounded-md bg-blue-500 text-white">
              {loggedInUser ? 'Profile' : 'Login'}
            </Link>
          </li>
        </ul>
    </header>
  )
}

export function MobileHeader() {
  const loggedInUser = useLoggedInUser()
  const cart = useCart()

  const cartItemCount = cart ? cart.reduce((total, item) => total + item.quantity, 0) : null
  return (
    <header className="sticky top-0 z-50 flex items-center gap-4 px-4 py-3 border-b border-gray-300 shadow-sm justify-between w-full max-w-7xl mx-auto backdrop-blur bg-opacity-30 rounded-md bg-white-transparent">
      <Link to="/" className="text-3xl font-bold w-fit text-blue-500 hover:text-blue-600 transition">
        logo
      </Link>

      <nav className="flex items-center gap-4 justify-between w-full max-w-3xl">
        <ul className="flex gap-4">
          <li><Link to="/" activeProps={{ className: "text-blue-500 font-bold" }}>Home</Link></li>
          <li><Link to="/products" activeProps={{ className: "text-blue-500 font-bold" }}>Products</Link></li>
        </ul>

        <ul className="flex items-center gap-4 justify-end">
          <li className="flex items-center gap-1 relative">
            <Link to="/cart" ><GrCart size={20}/></Link>
            {cartItemCount && <span className="absolute -top-3.5 -right-3.5 bg-red-500 text-white text-[12px] rounded-full h-5 w-5 flex items-center justify-center">{cartItemCount}</span>}
          </li>
          <li>
            <Link to={loggedInUser ? "/account" : "/login"} className="px-4 py-2 rounded-md bg-blue-500 text-white">
              {loggedInUser ? 'Profile' : 'Login'}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
