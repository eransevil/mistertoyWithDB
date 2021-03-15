import {httpService} from './http.service.js'

 

async function login(credentials) {
    const user = await httpService.post('auth/login',credentials)
    console.log("🚀 ~ file: user.service.js ~ line 7 ~ login ~ user", user)
    
    if (user) return _saveLocalUser(user)
  }
  
  async function signup(signupCredentials){
    const user = await httpService.post('auth/signup',signupCredentials)
    return _saveLocalUser(user)

  }

  function logout(){
    sessionStorage.clear()
      return httpService.post('auth/logout')
  }

  function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('loggedinUser'))
}

function _saveLocalUser(user) {
  sessionStorage.setItem('loggedinUser', JSON.stringify(user))
  return user
}

export const userService = {
    login,
    signup,
    logout,
    getLoggedinUser, 

    // getLoggedinUser,
    // signup,
    // query
} 