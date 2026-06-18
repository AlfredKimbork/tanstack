import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { deleteServerUser } from '#/lib/utils/userServerFunctions'
import login from '#/lib/login'

export default function AccountDetails({ username, email, password, created_at, id }: { username: string; email: string; password: string; created_at: Date; id: number }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  return (
    <section className="my-4 p-4 border border-gray-300 rounded-md bg-white shadow w-full max-w-2xl mx-auto sm:p-6 lg:p-8">
      <h2 className="text-lg font-semibold">Account details</h2>
      <ul className="mt-4 text-sm text-gray-700 flex flex-col gap-2 justify-start items-start w-full max-w-md mx-auto ">
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
        </li>
        <li>Member since: {created_at!.toString().slice(0, 10)}</li>
      </ul>

      <button 
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 hover:text-white transition"
        onClick={() => {
          login(null);
          navigate({ to: '/' });
        }} 
      >
        Logout
      </button>
      <button 
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 hover:text-white transition ml-4"
        onClick={async () => {
          const deletedUser = await deleteServerUser({ data: { id } });

          if (deletedUser) {
            login(null);
            navigate({ to: '/' });
          }
        }} 
      >
        delete account
      </button>
    </section>
  )
}