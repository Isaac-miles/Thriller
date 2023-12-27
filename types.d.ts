export type Movies = {
    adult: boolean,
    backdrop_path:string,
    genre_ids: [],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date?: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
    media_type:string
}

export type MovieProps = {
    page:number
    results: Moveis[]
    total_pages:number
    total_results:number
}

export type Element = {
    type:
       | 'Bloopers'
       | 'Features'
       | 'Behind the Scenes'
       | 'Clip'
       | 'Trailer'
       | 'Teaser'
}
export type Genre = {
    id:number
    name:'string'
}