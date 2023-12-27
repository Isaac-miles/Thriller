import { useCallback } from "react"
import requests from "./request"
import {MovieProps } from "@/types"

interface  ReturnedMovieProps {
    netflixOriginals:MovieProps
        trendingNow:MovieProps
        topRated:MovieProps
        actionMovies:MovieProps
        comedyMovies:MovieProps
        horrorMovies:MovieProps
        romanceMovies:MovieProps
        documentaries:MovieProps
}

const getMoviesData = async():Promise<ReturnedMovieProps> => {

       const [
        netflixOriginals,
        trendingNow,
        topRated,
        actionMovies,
        comedyMovies,
        horrorMovies,
        romanceMovies,
        documentaries,
      ] = await Promise.all([
        fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
        fetch(requests.fetchTrending).then((res) => res.json()),
        fetch(requests.fetchTopRated).then((res) => res.json()),
        fetch(requests.fetchActionMovies).then((res) => res.json()),
        fetch(requests.fetchComedyMovies).then((res) => res.json()),
        fetch(requests.fetchHorrorMovies).then((res) => res.json()),
        fetch(requests.fetchRomanceMovies).then((res) => res.json()),
        fetch(requests.fetchDocumentaries).then((res) => res.json()),
      ])


         return {
           netflixOriginals,
           trendingNow,
           topRated,
           actionMovies,
           comedyMovies,
           horrorMovies,
           romanceMovies,
           documentaries
         }
}

export type GetReturnedMovieType = Awaited<ReturnType<typeof getMoviesData>>

export default getMoviesData
