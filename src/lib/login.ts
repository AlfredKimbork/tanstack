import {
  setCurrentCart,
  setLoggedInUser,
  type LoggedInUser,
} from '#/integrations/tanstack-query/root-provider'

const login = (user: LoggedInUser, remember: boolean = false) => {
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

  setCurrentCart(user.cart ?? null)
  setLoggedInUser(user)
}

export default login;