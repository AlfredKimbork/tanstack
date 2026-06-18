import { Link } from '@tanstack/react-router'

export default function Header() {

  return (
    <header className="flex items-center justify-between mb-4 w-full max-w-2xl mx-auto w-full mx-auto">
      <h2 className="text-lg font-semibold">Current basket</h2>
      <Link to='/products' className="text-sm text-blue-500 hover:underline">Browse products</Link>
    </header>
  )
}