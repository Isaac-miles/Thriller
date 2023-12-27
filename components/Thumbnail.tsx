import Image from "next/image"
import { BASE_URL_THUMBNAIL } from "@/constants/movie"
import { Movies } from "@/types"
import { openMovie} from "@/features/movieSlice"
import { openCloseModal } from '@/features/modalSlice'
import { useAppDispatch } from "@/store/store"
import { DocumentData } from "firebase/firestore"

type ThumbnailProps ={
    // movie:Movies
    movie:Movies | DocumentData
}

const Thumbnail = ({movie}:ThumbnailProps) => {
  const dispatch = useAppDispatch()
    const thumbImage = new URL(`${BASE_URL_THUMBNAIL}${movie?.backdrop_path || movie?.poster_path}`, import.meta.url).href

      const handleDispatch = ()=>{
        dispatch(openMovie(movie))
        dispatch(openCloseModal({type:'open', action:true}))
      }

      
  return (
    <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105" onClick={handleDispatch}>
      
        <Image 
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
         alt="thumbnail"
         fill={true} 
         sizes="100%"
         className="rounded-sm object-cover md:rounded"/>
         
    </div>
  )
}

export default Thumbnail