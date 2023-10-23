import {
    CARDS_DESKTOP,
    CARDS_TABLET,
    CARDS_MOBILE,
    SHORTS_DURATION,
} from './constants'

export const calcQuantity = () => {
    const pageWidth = document.documentElement.clientWidth
    if (pageWidth > 1270) {
        return CARDS_DESKTOP
    }
    if (pageWidth > 700) {
        return CARDS_TABLET
    }
    return CARDS_MOBILE
}

export const formatDuration = (duration) => {
    const min = duration % 60
    const hours = (duration - min) / 60
    return hours ? `${hours}ч ${min}м` : `${min}м`
}

export const filterDuration = (movies) => {
    return movies.filter((movie) => movie.duration < SHORTS_DURATION)
}

export const filterMovies = (movies, query) => {
    const moviesByQuery = movies.filter((movie) => {
        const movieRu = String(movie.nameRU).toLowerCase().trim()
        const movieEn = String(movie.nameEN).toLowerCase().trim()
        const movieQuery = query.toLowerCase().trim()
        return (
            movieRu.indexOf(movieQuery) !== -1 ||
            movieEn.indexOf(movieQuery) !== -1
        )
    })
    return moviesByQuery
}
