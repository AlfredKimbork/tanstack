import {
  setLoggedInUser,
  type LoggedInUser,
} from '#/integrations/tanstack-query/root-provider'

const login = (user: LoggedInUser, remember: boolean = false) => {
  if (typeof window === 'undefined') {
    setLoggedInUser(user)
    return
  }

  if (!user) {
    window.localStorage.removeItem('user')
    window.sessionStorage.removeItem('user')
    setLoggedInUser(null)
    return
  }

  if (remember) {
    window.localStorage.setItem('user', JSON.stringify(user))
  } else {
    window.sessionStorage.setItem('user', JSON.stringify(user))
  }

  setLoggedInUser(user)
}

export default login;