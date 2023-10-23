import './Movies.css'
import React, { useState, useEffect } from 'react'
import MoviesCardList from './MoviesCardList/MoviesCardList'
import SearchForm from './SearchForm/SearchForm'
import * as moviesApi from '../../utils/ApiMovies'
import { filterMovies, filterDuration } from '../../utils/utils'

const Movies = ({ handleLikeClick, savedMovies, onCardDelete }) => {
    const [isLoading, setIsLoading] = useState(false) // прелоадер
    const [initialMovies, setInitialMovies] = useState([]) // начальные фильмы
    const [filteredMovies, setFilteredMovies] = useState([]) // поиск фильмов
    const [isShortMovies, setIsShortMovies] = useState(false) // короткометражки
    const [isRequestErr, setRequestErr] = useState(false) // ошибка api
    const [isNotFound, setIsNotFound] = useState(false) // фильмы не найдены

    // поиск фильма
    const handleFilterMovies = (movies, query, short) => {
        const moviesList = filterMovies(movies, query, short)
        setInitialMovies(moviesList)
        setFilteredMovies(short ? filterDuration(moviesList) : moviesList)
        localStorage.setItem('movies', JSON.stringify(moviesList))
        localStorage.setItem('allMovies', JSON.stringify(movies))
    }

    // поиск коротких фильмов
    const handleShortMovies = () => {
        setIsShortMovies(!isShortMovies)
        if (!isShortMovies) {
            setFilteredMovies(filterDuration(initialMovies))
        } else {
            setFilteredMovies(initialMovies)
        }
        localStorage.setItem('shortMovies', !isShortMovies)
    }

    // сохраняем фильмы
    const onSearchMovies = (query) => {
        localStorage.setItem('movieSearch', query)
        localStorage.setItem('shortMovies', isShortMovies)

        if (localStorage.getItem('allMovies')) {
            const movies = JSON.parse(localStorage.getItem('allMovies'))
            handleFilterMovies(movies, query, isShortMovies)
        } else {
            setIsLoading(true)
            moviesApi
                .getFilms()
                .then((cardsData) => {
                    handleFilterMovies(cardsData, query, isShortMovies)
                    setRequestErr(false)
                })
                .catch((err) => {
                    setRequestErr(true)
                    console.error(err)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }

    useEffect(() => {
        setIsShortMovies(localStorage.getItem('shortMovies') === 'true')
    }, [])

    useEffect(() => {
        if (localStorage.getItem('movies')) {
            const movies = JSON.parse(localStorage.getItem('movies'))
            setInitialMovies(movies)
            setFilteredMovies(
                localStorage.getItem('shortMovies') === 'true'
                    ? filterDuration(movies)
                    : movies
            )
        }
    }, [])

    useEffect(() => {
        setIsNotFound(filteredMovies.length === 0)
    }, [filteredMovies])

    return (
        <main className="movies">
            <div className="container">
                <SearchForm
                    onSearchMovies={onSearchMovies}
                    onFilter={handleShortMovies}
                    isShortMovies={isShortMovies}
                />
                <MoviesCardList
                    savedMovies={savedMovies}
                    cards={filteredMovies}
                    isSavedFilms={false}
                    isLoading={isLoading}
                    isRequestErr={isRequestErr}
                    isNotFound={isNotFound}
                    handleLikeClick={handleLikeClick}
                    onCardDelete={onCardDelete}
                />
            </div>
        </main>
    )
}

export default Movies
