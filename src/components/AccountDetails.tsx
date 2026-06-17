import { useState } from 'react'

export default function AccountDetails({ username, email, password, created_at }: { username: string; email: string; password: string; created_at: Date }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
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
  )
}