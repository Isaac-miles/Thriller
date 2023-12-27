"use client"
import { Metadata } from 'next'
import Link from 'next/link'
import {useState} from 'react'
import Image from 'next/image'
import useAuth from '@/hooks/useAuth'
import { CheckIcon } from '@heroicons/react/24/outline'
import  {ProductType, ProductElementType ,loadCheckoutSession} from '@/app/stripe-util/getStripesUtils'
import Table from './Table'
import Loader from './Loader'


export const metadata: Metadata = {
    title: 'Thriller',
  }
function Plans({products}:{products:ProductType}) {
    const imgUrl = new URL(`/public/img/thriller.png`, import.meta.url).href
    const {logOut,user} = useAuth()
    const [selectedPlan, setSelectedPlan] = useState< ProductElementType>(products[2])
    const [billingLoading, setBillingLoading] = useState(false)
    

    const subscribeToPlan = ()=>{
        if(!user) return

       loadCheckoutSession(selectedPlan.priceId, user.uid)
        setBillingLoading(true)
    }

  return (
    <div>

        <header className='border-b border-white/10 bg-[#141414] '>
            <Link href='/' as ={'image'}>
            <Image 
            src={imgUrl}
            alt="thriller"
            width={65}
            height={65}
            priority
            className="cursor-pointer object-contain w-auto h-auto"/>
            </Link>
            <button className='text-lg font-medium hover:underline' onClick={logOut}>Sign Out</button>
        </header>
        
        <main className='mx-auto pt-28 max-w-5xl  px-5 pb-12  transition-all md:px-10'>
            <h1 className='mb-3 text-3xl font-medium'>Choose a plan</h1>
            <ul>
                <li className='flex items-center gap-x-2 text-lg'>
                    <CheckIcon className='h-7 w-7 text-[#c31432]'/>
                    Watch all you want. Ad-free.
                </li>
                <li className='flex items-center gap-x-2 text-lg'>
                    <CheckIcon className='h-7 w-7 text-[#c31432]'/>
                    Recommendations just for you
                </li>
                <li className='flex items-center gap-x-2 text-lg'>
                    <CheckIcon className='h-7 w-7 text-[#c31432]'/>
                    change or cancel your plan anytime
                </li>
            </ul>
            
            <div className='flex mt-4 flex-col space-y-4'>
                <div className='flex w-full items-center justify-end self-end md:w-3/5 '>
                    {products?.map((product)=>(
                         <div className={`planBox ${selectedPlan?.priceId===product.priceId? 'opacity-100' :'opacity-60'}`} key={product.priceId} onClick={()=>setSelectedPlan(product)}>
                            {product.name}
                         </div>
                    ))}
                </div>
                {/* <Table /> */}
                <Table products={products} selectedPlan ={selectedPlan}/>

                <button
            disabled={!selectedPlan || billingLoading}
            className={`mx-auto w-11/12 rounded bg-[#c31432] py-4 text-xl shadow hover:bg-[#240b36] md:w-[420px] ${
                billingLoading && 'opacity-60'
            }`}
            onClick={subscribeToPlan}
          >
            {billingLoading ? (
              <Loader color="dark:fill-gray-300" />
            ) : (
              'Subscribe'
            )}
          </button>
         <p> copy any of these stripe test cards no with any future 3 digits and future date: 
            <span className='text-[#c31432] mr-4'>4242424242424242</span> 
            <span className=''>5555555555554444</span>
            </p>
            </div>
        </main>
    </div>
  )
}

export default Plans