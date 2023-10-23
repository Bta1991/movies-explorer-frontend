import { MOVIES_URL } from './constants'

const getMovies = (movies) => {
    return movies.map((movie) => {
        return {
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            trailerLink: movie.trailerLink,
            movieId: movie.id,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
            thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
            image: `https://api.nomoreparties.co${movie.image.url}`,
        }
    })
}

const handleResponse = async (res) => {
    if (res.ok) {
        const movies = await res.json()
        return getMovies(movies)
    }
    const err = await res.json()
    return Promise.reject(err)
}

export const getFilms = async () => {
    const movies = await fetch(MOVIES_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return await handleResponse(movies)
}
