import { QueryClient } from '@tanstack/react-query'
import { useSyncExternalStore } from 'react'

export type LoggedInUser = {
  id: number | undefined
  username: string
  email: string
  password: string
  administrator: boolean
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

export function useLoggedInUser() {
  return useSyncExternalStore(subscribe, () => loggedInUser, () => null)
}

export function getContext() {
  const queryClient = new QueryClient()

  return {
    queryClient,
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
