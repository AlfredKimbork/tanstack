import { createFileRoute } from '@tanstack/react-router'
import { FaCheck } from 'react-icons/fa'

export const Route = createFileRoute('/approved')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
  <main className="page-wrap px-4 pb-8 pt-14 text-center bg-green-100 rounded shadow w-full max-w-2xl mx-auto">
    <h1 className="text-2xl font-bold">Payment Approved!</h1>
    <div className="mt-4 text-green-600 text-6xl animate-pulse inline-block rounded-full bg-green-200 p-4">
      <span 
        role="img" 
        aria-label="checkmark" 
        className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500 text-white"
      >
        <FaCheck />
      </span>
    </div>
    <p className="mt-4 text-lg">Thank you for your purchase. Your payment has been approved.</p>
  </main>
  )
}
