'use client'

import React, { useState } from 'react'
import {useForm,SubmitHandler} from 'react-hook-form'
import useAuth from '@/hooks/useAuth'
// import { useSelector } from 'react-redux'


interface Inputs {
    email:string,
    password:string
}

function LoginForm() {
    const {loading,signIn,signUp,user} = useAuth()
    const [login, setLogin] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Inputs>()

      const onSubmit: SubmitHandler<Inputs> =async ({email,password}:Inputs) => {
        if(login){
            await signIn(email,password)
        }else {
            await signUp(email,password)
         
        }
      }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14' name='loginForm' id='login'> 
        <h1 className='text-4xl font-semibold'>Sign In</h1>
        <div className='space-y-4'>
            <label htmlFor="mail"  className='inline-block w-full '>
                <input type='email' id='mail' autoComplete='of' placeholder='Email Address' className='input' {...register("email", { required: true })}/>
                {errors.email && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Please enter a valid email.
              </p>
            )}
            </label>

            <label htmlFor="pass" className='inline-block w-full '>
                <input type='password' id='pass' placeholder='Password' className='input' {...register("password", { required: true })}/>
                {errors.password && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
            </label>

        </div>
            <button className='w-full rounded bg-[#c31432] py-3 font-semibold' onClick={()=>setLogin(true)}>Sign In</button>

            <div className='text-[grey]'>
               <span>New to Thriller? </span> 
                <button type="submit" className='text-white hover:underline' onClick={()=>setLogin(false)}>Sign up</button>
            </div>
    </form>
  )
}

export default LoginForm

