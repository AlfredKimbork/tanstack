const login = (remember: boolean, user: { username: string; email: string; password: string, administrator: boolean }) => {
  console.log(user);
  if (remember) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    sessionStorage.setItem("user", JSON.stringify(user));
  }
}

export default login;