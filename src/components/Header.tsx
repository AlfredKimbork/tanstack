import { Link } from '@tanstack/react-router'
import { useLoggedInUser } from '#/integrations/tanstack-query/root-provider'

export default function Header() {
  const loggedInUser = useLoggedInUser()

  return (
    <header className="sticky top-0 z-50 flex gap-16 items-center px-4 py-3 bg-white">
      <Link to="/" className="text-3xl font-bold w-fit">
        logo
      </Link>

      <nav className="flex items-center justify-between gap-4 w-full">
        <ul className="flex gap-4">
          <li><Link to="/" activeProps={{ className: "text-blue-500 font-bold" }}>Home</Link></li>
          <li><Link to="/products" activeProps={{ className: "text-blue-500 font-bold" }}>Products</Link></li>
          {loggedInUser?.administrator && (
            <li><Link to="/dashboard" activeProps={{ className: "text-blue-500 font-bold" }}>Dashboard</Link></li>
          )}
        </ul>
        <Link to={loggedInUser ? "/account" : "/login"} className="px-4 py-2 rounded-md bg-blue-500 text-white">
          {loggedInUser ? 'Profile' : 'Login'}
        </Link>
      </nav>
    </header>
  )
}
