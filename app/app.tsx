import getMoviesData from "@/utils/getData"
import { Toaster } from "react-hot-toast"
import Home from "./home"
import {getProduct} from "./stripe-util/getStripesUtils"



async function getData() {
  const products = await getProduct()

  if (!products) {
    throw new Error('Failed to fetch data')
  }
 
  return products
}
 

export default async function App() {

  const {
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries
  
  } = await getMoviesData()

  return (
    <>
    <Toaster position="top-center"/>
    <Home 
    netflixOriginals={netflixOriginals}
    trendingNow={trendingNow}
    topRated={topRated}
    actionMovies={actionMovies}
    comedyMovies={comedyMovies}
    horrorMovies={horrorMovies}
    romanceMovies={romanceMovies}
    documentaries={documentaries} 
    />
    </>


  )
}

