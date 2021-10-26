const logout = async() => {
  await sessionStorage.clear()
  await sessionStorage.setItem('is_loggedin', false)
  window.location.reload()
}

export default logout;