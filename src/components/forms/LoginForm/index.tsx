import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

import getByEmail from '#/lib/utils/getByEmail'
import login from '#/lib/login'

import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

interface LoginFormValues {
  email: string
  password: string
  remember: boolean
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const checkPassword = (email: string) => getByEmail({ data: { email } })
    .then(user => user?.password)
  const checkEmail = (email: string) => getByEmail({ data: { email } })

  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    } as LoginFormValues,
    onSubmit: async ({ value }) => {
      login(value.remember, await getByEmail({ data: { email: value.email } }));
      navigate({ to: '/' });
    },
  })


  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="max-w-120 bg-white p-8 rounded-md w-full flex flex-col gap-4"
    >
      <div>
        <form.Field 
          name="email"
          validators={{
            onBlur: ({ value }) => 
              !value 
                ? 'Email is required' 
                : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) 
                  ? 'Invalid email address'
                  : undefined,
            onBlurAsync: async ({ value }) =>
              !await checkEmail(value) 
                ? 'Email not found' 
                : undefined,
            onBlurAsyncDebounceMs: 500,
            onChangeAsync: async ({ value }) => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return (
                value.includes('error') && 'no "error" allowed in email'
              )
            },
          }}
          children={(field) => {
            return (
              <>
                <label htmlFor={field.name}>Email:</label>
                <input 
                  className={`w-full border rounded-md p-2 ${field.state.meta.errors.length > 0 ? 'border-red-500' : 'border-slate-300'}`}
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.length > 0 && <em className="text-red-500">{field.state.meta.errors.join(", ")}</em>}
              </>
            )
          }}
        />
      </div>
      <div>
        <form.Field 
          name="password"
          validators={{
            onBlur: ({ fieldApi }) =>
              !fieldApi.form.getFieldValue("email")
                ? 'Please enter email first'
                : undefined,
            onBlurAsync: async ({ value, fieldApi }) => 
              value !== await checkPassword(fieldApi.form.getFieldValue("email"))
                ? 'Incorrect password' 
                : undefined,
            onBlurAsyncDebounceMs: 500,
            onChangeAsync: async ({ value }) => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return (
                value.includes('error') && 'no "error" allowed in password'
              )
            },
          }}
          children={(field) => {
            return (
              <>
                <label htmlFor={field.name}>Password:</label>
                <div className="relative">
                  <input 
                    className={`w-full border rounded-md p-2 ${field.state.meta.errors.length > 0 ? 'border-red-500' : 'border-slate-300'}`}
                    id={field.name}
                    name={field.name}
                    type={showPassword ? "text" : "password"}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    />
                  <button 
                    className="absolute right-2 top-[50%] translate-y-[-50%] text-gray-500"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPassword(!showPassword)}
                    }
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
                {field.state.meta.errors.length > 0 && <em className="text-red-500">{field.state.meta.errors.join(", ")}</em>}
              </>
            )
          }}
        />
      </div>
      <div>
        <form.Field
          name="remember"
          validators={{
            onChange: () => 
              undefined,
          }}
          children={(field) => {
            return (
              <>
                <label 
                  htmlFor={field.name}
                  className="flex items-center gap-2"
                >
                  Remember me
                  <input
                    id={field.name}
                    className="order-first"
                    type="checkbox"
                    name={field.name}
                    checked={field.state.value}
                    onChange={(e) => field.handleChange(e.target.checked)}
                  />
                </label>
              </>
            )
          }}
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Login</button>
    </form>
  )
}