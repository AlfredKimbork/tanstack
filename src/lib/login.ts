import {
  setCurrentCart,
  setLoggedInUser,
} from '#/integrations/tanstack-query/root-provider'
import type { LoggedInUser } from '#/integrations/tanstack-query/root-provider'


const login = (user: LoggedInUser, remember: boolean = false) => {
  console.log('Logging in user:', user, 'Remember:', remember)
  if (!user) {
    localStorage.removeItem('user')
    sessionStorage.removeItem('user')
    setLoggedInUser(null)
    setCurrentCart(null)
    return
  }

  if (remember) {
    localStorage.setItem('user', JSON.stringify(user))
  } else {
    sessionStorage.setItem('user', JSON.stringify(user))
  }

  setLoggedInUser(user)
}

export default login;