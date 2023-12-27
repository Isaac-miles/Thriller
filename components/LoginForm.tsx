'use client'

import React, { useState } from 'react'
import SignUpForm from './SignUpForm'
import SignInForm from './SingInForm'

function LoginForm() {
    // const {loading,signIn,signUp,user} = useAuth()
    const [login, setLogin] = useState(false)

  return (
    <div>
     { login ? (<SignInForm/>) : (<SignUpForm/>)}
    </div>
  ) 
  
}

export default LoginForm

