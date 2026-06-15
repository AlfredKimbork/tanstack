import { QueryClient } from '@tanstack/react-query'
import { useSyncExternalStore } from 'react'

export type Cart = {
    productId: number
    productName: string
    quantity: number
  }[]| null

export type CartContext = {
  readonly cart: Cart
  setCart: (cart: Cart) => void
  syncFromUser: () => void
}

let currentCart: Cart = null

export type LoggedInUser = {
  id: number | undefined
  username: string
  email: string
  password: string
  administrator: boolean
  cart?: Cart
} | null

export type UserContext = {
  readonly user: LoggedInUser
  setUser: (user: LoggedInUser) => void
  syncFromStorage: () => void
}

let loggedInUser: LoggedInUser = null

const listeners = new Set<() => void>()

function notifyListeners() {
  listeners.forEach((listener) => listener())
}

function readLoggedInUserFromStorage(): LoggedInUser {
  const storedUser = localStorage.getItem('user') ?? sessionStorage.getItem('user')

  if (!storedUser) {
    return null
  }

  try {
    return JSON.parse(storedUser) as LoggedInUser
  } catch {
    return null
  }
}

export function setCurrentCart(cart: Cart) {
  currentCart = cart
  notifyListeners()
}

export function syncCartFromUser() {
  setCurrentCart(loggedInUser?.cart ?? null)
}

export function setLoggedInUser(user: LoggedInUser) {
  loggedInUser = user
  notifyListeners()
}

export function syncLoggedInUserFromStorage() {
  setLoggedInUser(readLoggedInUserFromStorage())
}

function subscribe(listener: () => void) {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}

export function useCart() {
  return useSyncExternalStore(subscribe, () => currentCart, () => null)
}

export function useLoggedInUser() {
  return useSyncExternalStore(subscribe, () => loggedInUser, () => null)
}

export function getContext() {
  const queryClient = new QueryClient()

  return {
    queryClient,
    cartContext: {
      get cart() {
        return currentCart
      },
      setCart: setCurrentCart,
      syncFromUser: syncCartFromUser,
    } as CartContext,
    userContext: {
      get user() {
        return loggedInUser
      },
      setUser: setLoggedInUser,
      syncFromStorage: syncLoggedInUserFromStorage,
    } as UserContext,
  }
}
export default function TanstackQueryProvider() {}
