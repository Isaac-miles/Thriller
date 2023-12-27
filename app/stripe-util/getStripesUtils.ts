import {addDoc, query, collection, where, getDocs,onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import app from '@/lib/firebase'
import {getFunctions,httpsCallable} from '@firebase/functions'
import toast from 'react-hot-toast';
import { toastStyle } from '@/utils/styles';
export async function getProduct() {
    // create a query object
const q = query(
    collection(db, 'products'), 
    where('active', '==', true)
);

const querySnapshot = await getDocs(q);

// for each product, get the product price info
const productsPromises = querySnapshot.docs.map(async (productDoc) => {
    let productInfo = productDoc.data();

    // fetch prices subcollection per product
    const pricesCollection = collection(productDoc.ref, 'prices');
    const priceQuerySnapshot = await getDocs(pricesCollection);

    // assume there is only one price per product
    const priceDoc = priceQuerySnapshot.docs[0];
    productInfo['priceId'] = priceDoc.id;
    productInfo['priceInfo'] = priceDoc.data();
    return productInfo;
});

// 'products' is an array of products (including price info)
 const products = await Promise.all(productsPromises);

       return products

}

export async function loadCheckoutSession(priceId:string, currentUser:string) {
    let checkOutSessionData ={
        price:priceId,
        success_url:window.location.origin,
        cancel_url:window.location.origin
    }
   
    
    const checkOutSessionRef = await addDoc(
        //current user is provided by firebase, via getAuth
        collection(db, `customers/${currentUser}/checkout_sessions`),
        checkOutSessionData
    )
    //the stripe extention creates a payment link for us
    onSnapshot(checkOutSessionRef, (snap)=>{
        const result = snap.data();
        if(result?.error){
           // handle error
        }
        if(result?.url){
            window.location.assign(result.url); //redirect to payment link
        }
    })
}

export async function getActiveSubscription(currentUser:string) {
    //create a query object to the current users active subscriptions 
    const q = query(
        //current user is provided by firebase via getAuth
        collection(db, 'customers', currentUser, 'subscriptions'),
        where('status','in',['trialing', 'active'])
    );
    //fetch the active subscription
    const querySnapshot = await getDocs(q);
    if(querySnapshot.empty){
         return null
    }
    const subscription = querySnapshot.docs[0].data();
    return subscription
}

export async function gotToBillingPage(){
    const instance = getFunctions(app, 'us-central1')
    const functionRef = httpsCallable(instance,'ext-firestore-stripe-payments-createPortalLink');
    await functionRef({
        returnUrl: `${window.location.origin}/account`
    })
    .then(({data}:any)=>window.location.assign(data.url))
    .catch((error)=>{
        toast.error(error.message,{
            duration:5000,
            style:toastStyle
        })
        alert(error.message)
    })
}
export type SubscriptionType = Awaited<ReturnType<typeof getActiveSubscription>>
export type ProductType = Awaited<ReturnType< typeof getProduct>>
export type ProductElementType = ProductType[0]
