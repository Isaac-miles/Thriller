'use client'
import { Metadata } from 'next'
import {useState,useEffect} from 'react'
import { getProduct,ProductType } from '../stripe-util/getStripesUtils'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Membership from '@/components/Membership'
import useAuth from '@/hooks/useAuth'
import useSubscription from '@/hooks/useSubscription'
import moment from  "moment"

function Account() {
  const [products, setProducts] = useState<ProductType>([])
  const { user,logOut } = useAuth()
  let formattedDate;
  const subscription = useSubscription(user)

  useEffect(()=>{

    async function fetchData() {
      const products =  await getProduct()
        setProducts(products)
      }
    
      fetchData()
     
},[])

    if(subscription){
        const millisecondsTimestamp = subscription?.created.seconds * 1000;
        formattedDate = moment(millisecondsTimestamp).format('YYYY-MM-DD HH:mm:ss');
    }


  return (
    <div>
      <Head>
        <title>Thriller</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={`bg-[#141414]`}>
        <Link href="/">
        <Image 
        src="/img/thriller.png"
        alt="thriller"
        width={65}
        height={65}
        priority
        className="cursor-pointer object-contain w-auto h-auto"/>
        </Link>
        <Link href="/account">
        <Image 
        onClick={()=>logOut()}
        src="/img/acc-logo.png"
        alt="account"
        width={30}
        height={30}
        className="cursor-pointer rounded w-auto h-auto"/>
        </Link>
      </header>

      <main className="mx-auto max-w-6xl px-5 pt-24 pb-12 transition-all md:px-10">
        <div className="flex flex-col gap-x-4 md:flex-row md:items-center">
          <h1 className="text-3xl md:text-4xl">Account</h1>
          <div className="-ml-0.5 flex items-center gap-x-1.5">
            <img src="https://rb.gy/4vfk4r" alt="" className="h-7 w-7" />
            <p className="text-xs font-semibold text-[#555]">
              Member since {formattedDate}
            </p>
          </div>
        </div>

        <Membership />

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0">
          <h4 className="text-lg text-[gray]">Plan Details</h4>
          {/* Find the current plan */}
          <div className="col-span-2 font-medium">
            {
           products.filter((product) => product.priceId === subscription?.items[0]?.price?.product.default_price
          )[0]?.name
            }
          </div>
          <p className="cursor-pointer text-blue-500 hover:underline md:text-right">
            Change plan
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
          <h4 className="text-lg text-[gray]">Settings</h4>
          <p
            className="col-span-3 cursor-pointer text-[#c31432] hover:underline"
            onClick={logOut}
          >
            Sign out of all devices
          </p>
        </div>
      </main>
    </div>
  )
}

export default Account
