import { Link } from '@tanstack/react-router'
import { CgProfile } from "react-icons/cg";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex gap-16 items-center px-4 py-3 bg-white">
      <Link to="/" className="text-3xl font-bold w-fit">
        logo
      </Link>

      <nav className="flex items-center justify-between gap-4 w-full">
        <ul className="flex gap-4">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
        </ul>
        <Link to="/login" className="flex flex-col items-center">
          <CgProfile size={24} />
          Login
        </Link>
      </nav>
    </header>
  )
}
