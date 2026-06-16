import { QueryClient } from '@tanstack/react-query'
import { useSyncExternalStore } from 'react'

export type Cart = {
    productId: number
    created_at?: Date
    productName: string
    quantity: number
    cartId?: number
  }[] | null

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
  created_at?: Date
  cart?: Cart
} | null

export type UserContext = {
  readonly user: LoggedInUser
  setUser: (user: LoggedInUser) => void
  syncFromStorage: () => void
}

let loggedInUser: LoggedInUser = null
type StoredUserSource = 'local' | 'session' | null
let activeUserStorage: StoredUserSource = null

const listeners = new Set<() => void>()

function notifyListeners() {
  listeners.forEach((listener) => listener())
}

function readLoggedInUserFromStorage(): { user: LoggedInUser; source: StoredUserSource } {
  const localUser = localStorage.getItem('user')
  if (localUser) {
    try {
      return { user: JSON.parse(localUser) as LoggedInUser, source: 'local' }
    } catch {
      return { user: null, source: null }
    }
  }

  const sessionUser = sessionStorage.getItem('user')
  if (!sessionUser) {
    return { user: null, source: null }
  }

  try {
    return { user: JSON.parse(sessionUser) as LoggedInUser, source: 'session' }
  } catch {
    return { user: null, source: null }
  }
}

function persistLoggedInUser(user: LoggedInUser) {
  if (!user) {
    localStorage.removeItem('user')
    sessionStorage.removeItem('user')
    activeUserStorage = null
    return
  }

  const serializedUser = JSON.stringify(user)

  if (activeUserStorage === 'local') {
    localStorage.setItem('user', serializedUser)
    sessionStorage.removeItem('user')
    return
  }

  if (activeUserStorage === 'session') {
    sessionStorage.setItem('user', serializedUser)
    localStorage.removeItem('user')
    return
  }

  sessionStorage.setItem('user', serializedUser)
}

export function setCurrentCart(cart: Cart) {
  currentCart = cart

  if (loggedInUser) {
    loggedInUser = { ...loggedInUser, cart }
    persistLoggedInUser(loggedInUser)
  }

  notifyListeners()
}

export function syncCartFromUser() {
  setCurrentCart(loggedInUser?.cart ?? null)
}

export function setLoggedInUser(user: LoggedInUser) {
  loggedInUser = user
  currentCart = user?.cart ?? null
  if (!user) {
    activeUserStorage = null
  } else if (localStorage.getItem('user')) {
    activeUserStorage = 'local'
  } else if (sessionStorage.getItem('user')) {
    activeUserStorage = 'session'
  }
  notifyListeners()
}

export function syncLoggedInUserFromStorage() {
  const stored = readLoggedInUserFromStorage()
  activeUserStorage = stored.source
  setLoggedInUser(stored.user)
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
    },
    userContext: {
      get user() {
        return loggedInUser
      },
      setUser: setLoggedInUser,
      syncFromStorage: syncLoggedInUserFromStorage,
    },
  }
}
export default function TanstackQueryProvider() {}
