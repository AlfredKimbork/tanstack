import { useForm } from '@tanstack/react-form'
import { useState } from 'react'
import { Link } from '@tanstack/react-router'

import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

import addUser from '../../../lib/addUser'

interface signUpFormValues {
  username: string
  email: string
  password: string
  confirmPassword: string
  administrator: boolean
}

export default function SignUpForm() {
  const [userExists, setUserExists] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      administrator: false,
    } as signUpFormValues,
    onSubmit: async ({ value }) => {
      if(!await addUser({ data: value })) {
        setUserExists(true);
        setSubmitting(false);
      }
        else {
          setUserExists(false);
          setSubmitting(false);
          form.reset();
        }
    },
  });

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
          name="username"
          validators={{
            onBlur: ({ value }) => 
              !value 
                ? 'username is required' 
                : undefined,
          }}
          children={(field) => {
            return (
              <>
                <label htmlFor={field.name}>Username:</label>
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
          name="email"
          validators={{
            onBlur: ({ value }) => 
              !value 
                ? 'Email is required' 
                : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) 
                  ? 'Invalid email address'
                  : undefined,
            onChangeAsyncDebounceMs: 500,
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
            onBlur: ({ value }) => 
              !value 
                ? 'Password is required' 
                : value.length < 8 
                  ? 'Invalid password, must be at least 8 characters'
                  : undefined,
            onChangeAsyncDebounceMs: 500,
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
                    type={showPassword ? "text" : "password"}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <button 
                    className="absolute right-2 top-[50%] translate-y-[-50%] text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
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
          name="confirmPassword"
          validators={{
            onBlur: ({ value, fieldApi }) => 
              value !== fieldApi.form.getFieldValue("password")
                ? "Passwords do not match"
                : undefined,
            onChangeAsyncDebounceMs: 500,
            onChangeAsync: async ({ value }) => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return (
                value.includes("error") && 'no "error" allowed in password'
              )
            },
          }}
          children={(field) => {
            return (
              <>
                <label htmlFor={field.name}>Confirm Password:</label>
                <div className="relative">
                  <input 
                    className={`w-full border rounded-md p-2 ${field.state.meta.errors.length > 0 ? 'border-red-500' : 'border-slate-300'}`}
                    id={field.name}
                    type={showConfirmPassword ? "text" : "password"}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <button 
                    className="absolute right-2 top-[50%] translate-y-[-50%] text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
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
          name="administrator"
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
                  Administrator
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

        {userExists && (
          <div  >
            <em className="text-red-500">User already exists in our system, please login or use a different email.</em>
            <Link to="/login" className="ml-1 hover:underline">
              Login here
            </Link>
          </div>
          )}
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Sign up</button>
    </form>
  )
}