import { createClientOnlyFn } from "@tanstack/react-start"

const setLoggedInUser = createClientOnlyFn(() => {
  return localStorage.getItem("user") 
    ? JSON.parse(localStorage.getItem("user")!)
    : sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user")!)
      : null
});

export default setLoggedInUser