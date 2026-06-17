import { Link } from '@tanstack/react-router'
import type { Cart } from '#/integrations/tanstack-query/root-provider'

export default function Header({ currentCart }: { currentCart: Cart }) {
  return (
    <header className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold">Current basket</h2>
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link to='/products' className="text-sm text-blue-500 hover:underline">Browse products</Link>
          </li>
          <li>
            <Link 
              to='/cart' 
              className={`text-sm text-white py-1 px-3 rounded ${currentCart && currentCart.length > 0 ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`}
              onClick={(e) => {
                if (!currentCart || currentCart.length === 0) {
                  e.preventDefault();
                  }
                }}
            >
              Proceed to checkout
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}