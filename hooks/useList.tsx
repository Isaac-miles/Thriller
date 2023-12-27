import { Movies } from '@/types'
import {useState, useEffect} from 'react'
import {DocumentData,onSnapshot,collection} from 'firebase/firestore'
import { db } from '@/lib/firebase'

function useList(uid:string | undefined) {
    const [list, setList] = useState<Movies[] | DocumentData[]>([])

    useEffect(()=>{
        if(!uid) return

        return onSnapshot(
            collection(db, 'customers', uid, 'myList'),
            (snapshot) => {
              setList(
                snapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
                }))
              )
            }
          )
        }, [uid])
      
  return list
  
}

export default useList