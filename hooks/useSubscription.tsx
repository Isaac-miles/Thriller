import { SubscriptionType,getActiveSubscription } from '@/app/stripe-util/getStripesUtils'
import { User } from 'firebase/auth'
import {useState,useEffect} from 'react'

export default function useSubscription(user:User | null) {
    const [subscription, setSubscription] = useState<SubscriptionType | null>(null)

    useEffect(()=>{
        if(!user) return
        const getSubs =async () => {
        const activeSub = await getActiveSubscription(user.uid)
        setSubscription(activeSub)
        }

        getSubs()
      
    },[user])


  return subscription
}
