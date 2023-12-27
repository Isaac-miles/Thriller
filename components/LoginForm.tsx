'use client'

import React, { useState } from 'react'
import SignUpForm from './SignUpForm'
import SignInForm from './SingInForm'

function LoginForm() {
    // const {loading,signIn,signUp,user} = useAuth()
    const [login, setLogin] = useState(true)

  return (
    <div>
     { login ? (<SignInForm setLogin={setLogin}/>) : (<SignUpForm setLogin={setLogin}/>)}
    </div>
  ) 
  
}

export default LoginForm

