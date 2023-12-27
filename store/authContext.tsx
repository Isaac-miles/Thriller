'use client'

import { useState, useEffect, createContext,useMemo, Children, ReactElement, useCallback } from "react"
import { useRouter } from "next/navigation"
import { auth } from "../lib/firebase"
import toast from "react-hot-toast"
import { toastStyle } from "@/utils/styles"
import {
     createUserWithEmailAndPassword,
     onAuthStateChanged,
     signInWithEmailAndPassword,
     signOut,
     User
     } from "@firebase/auth"

interface IAuthContext {
    user:User | null
    signUp:(email:string, password:string)=>Promise<void>
    signIn:(email:string, password:string)=>Promise<void>
    logOut:()=>Promise<void>
    loading:boolean
    // error:string | null
}

type Children = {
    children?: ReactElement | ReactElement[]
}
const initialValue = {
user: null,
error:null,
loading:false,
signIn:async ()=>{},
signUp:async ()=>{},
logOut:async ()=>{}
}

export function useAuth(){
    const [loading, setLoading] = useState(false)
    const [initialLoading, setInitialLoading] = useState(true)
    // const [error, setError] = useState<string | null>(null)
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter()

    useEffect(()=>
        onAuthStateChanged(auth,(user)=>{
            if(user){
                //Logged in...
                setUser(user)
                setLoading(false)
            }else{
                //Not Logged in..
                router.push('/login')
                setUser(null)
                setLoading(true)
            }
            setInitialLoading(false)
        })
    ,[router])

    const signUp = useCallback(async (email:string, password:string):Promise<void> => {
        setLoading(true)
        // setError(null)
        await createUserWithEmailAndPassword(auth,email, password)
        .then((userCredentials):void =>{
            setUser(userCredentials.user)
            alert('SignUp successful, kindly login')
            toast.success('SignUp successful, kindly login',{
                duration:5000,
                style:toastStyle
              })
            router.push('/')
            setLoading(false)
        }).catch((err)=>{
                //   setError(err)
                if(err instanceof Error){
                alert(err.message)

                    toast.error(err.message,{
                        duration:5000,
                        style:toastStyle
                    })
                  }
        }).finally(()=>setLoading(false))
   },[router])

   const signIn = useCallback(async (email:string, password:string):Promise<void> => {
    setLoading(true)
    await signInWithEmailAndPassword(auth,email, password)
    .then((userCredentials):void =>{
        setUser(userCredentials.user)
        if(userCredentials.user){
            router.push('/')
            setLoading(false)
        }
       
    }).catch((err)=>{        
        if(err instanceof Error){
            alert(err.message)
            toast.error(err.message,{
                duration:5000,
                style:toastStyle
            })
        }
            // return new NextResponse(err.message)
        
    }).finally(()=>setLoading(false))
}
,[router])

   const logOut = useCallback(async ():Promise<void>  =>{
    setLoading(true)

    signOut(auth)
    .then(()=>{
        setUser(null)
        router.replace('/login')
    })
    .catch((err)=>{
        if(err instanceof Error){
            alert(err.message)
            toast.error(err.message,{
                duration:5000,
                style:toastStyle
            })
          }
    }).finally(()=>setLoading(false))
},[router])

    const memoedValues =  useMemo(()=>({
        loading, user, signIn,signUp,logOut
   }),[user, loading,signIn,signUp, logOut])

  return memoedValues
}

 export const AuthContext = createContext<IAuthContext>(initialValue)

export default function AuthProvider({children}:Children) {
  return <AuthContext.Provider value={useAuth()}>
    {children} 
  </AuthContext.Provider>
}


// export default 