'use client'
import {useState, useEffect} from 'react'
import Banner from '@/components/Banner'
import Header from '@/components/Header'
import getMoviesData from '@/utils/getData'
import Row from '@/components/Row'
import { MovieProps } from '@/types'
import {  useSelector } from 'react-redux/es/hooks/useSelector'
import {modalState} from '@/features/modalSlice'
import {moviesState,statusState,errorState,fetchMovies} from '@/features/movieSlice'
import Modal from '@/components/Modal'
import Plans from '@/components/Plans'
import { ProductType } from './stripe-util/getStripesUtils'
import {getProduct} from './stripe-util/getStripesUtils'
import { useAppDispatch } from '@/store/store' 
import useSubscription from '@/hooks/useSubscription'
import useAuth from '@/hooks/useAuth'
import useList from '@/hooks/useList'
interface HomeProps {
    netflixOriginals:MovieProps
        trendingNow: MovieProps
        topRated:MovieProps
        actionMovies:MovieProps
        comedyMovies:MovieProps
        horrorMovies:MovieProps
        romanceMovies:MovieProps
        documentaries:MovieProps
}

export default  function Home({
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,

  }: HomeProps) {
    const {user} = useAuth()
    const subscription = useSubscription(user)
    const dispatch = useAppDispatch()
    const modal = useSelector(modalState)
    const status = useSelector(statusState)
    const movies = useSelector(moviesState)
    const errorMessage = useSelector(errorState)
    const [products, setProducts] = useState<ProductType>([])
    const list = useList(user?.uid)

    useEffect(()=>{
      if(status ==='idle'){
        dispatch(fetchMovies())
       
      }
      async function fetchData() {
        const products =  await getProduct()
          setProducts(products)
        }
      
        fetchData()
       
  },[status,dispatch])
    if(subscription === null && products.length > 0) return <Plans products ={products} />
    
  return (
    <div className={`relative h-screen bg-gradient-to-b  lg:h-[140vh] ${modal && '!h-screen overflow-hidden'}`}>

    <Header /> 

    <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
      <Banner netflixOriginals={netflixOriginals} />
      <section className='md:space-y-24'>
        <Row title="Netflix Originals" movies={netflixOriginals.results}/>
        <Row title="Trending Now" movies={trendingNow.results}/>
        <Row title="TopRated" movies={topRated.results}/>
        {list.length > 0 && <Row title='My List' movies={list}/>}
        <Row title="Documentaries" movies={documentaries.results}/>
        <Row title="Action Movies" movies={actionMovies.results}/>
        <Row title="Comedy Movies" movies={comedyMovies.results}/>
        <Row title="Horror Movies" movies={horrorMovies.results}/>
        <Row title="Romance Movies" movies={romanceMovies.results}/>
      </section>
    </main>
    {modal && <Modal/>} 
    </div>
  )
}
