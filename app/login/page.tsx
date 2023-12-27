import LoginForm from '@/components/LoginForm'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Thriller',
}

function login() {
  const loginImage = new URL('../../public/img/login.jpg', import.meta.url).href
  const logoImage = new URL(`/public/img/thriller.png`, import.meta.url).href
  return (
      <>
    <div className='relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent'>
     <Image 
         src={loginImage} 
         alt="thumbnail"
         fill={true} 
         sizes="100%"
         className="-z-10 !hidden opacity-60 sm:!inline object-cover md:rounded "/>

      <Image 
        src={logoImage}
        alt="thriller"
        width={100}
        height={100}
        priority
        className="absolute left-4 top-1 cursor-pointer object-contain md:left-10 md:top-6 w-auto h-auto"/>

      <LoginForm/>
      

      
    </div>

    </>
    
  )
}

export default login