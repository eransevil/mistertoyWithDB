import {httpService} from './http.service.js'



function login(credentials) {
    return httpService.post('auth/login',credentials)
  }
  
  function signup(signupCredentials){
    return httpService.post('auth/signup',signupCredentials)

  }

  function logout(){
      return httpService.post('auth/logout')
  }

export const userService = {
    login,
    signup,
    logout,
    // getLoggedinUser,
    // signup,
    // query
} 