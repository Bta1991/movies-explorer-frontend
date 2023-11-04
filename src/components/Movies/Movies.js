import './Movies.css'
import React, { useState, useEffect, useCallback } from 'react'
import MoviesCardList from './MoviesCardList/MoviesCardList'
import SearchForm from './SearchForm/SearchForm'
import * as moviesApi from '../../utils/MoviesApi'
import { filterMovies, filterDuration } from '../../utils/utils'

const Movies = ({ onCardLike, savedMovies, onCardDelete }) => {
    // Состояния компонента
    const [isLoading, setIsLoading] = useState(false) // Показывать прелоадер
    const [initialMovies, setInitialMovies] = useState([]) // Начальные фильмы
    const [filteredMovies, setFilteredMovies] = useState([]) // Отфильтрованные фильмы
    const [isShortMovies, setIsShortMovies] = useState(false) // Флаг короткометражных фильмов
    const [isRequestErr, setRequestErr] = useState(false) // Ошибка API
    const [isNotFound, setIsNotFound] = useState(false) // Фильмы не найдены

    // Фильтрация фильмов
    const handleFilterMovies = useCallback((movies, query, short) => {
        const moviesList = filterMovies(movies, query, short)
        setInitialMovies(moviesList)
        setFilteredMovies(short ? filterDuration(moviesList) : moviesList)
        localStorage.setItem('movies', JSON.stringify(moviesList))
        localStorage.setItem('allMovies', JSON.stringify(movies))
    }, [])

    // Переключение короткометражных фильмов
    const handleShortMovies = useCallback(() => {
        setIsShortMovies(!isShortMovies)
        setFilteredMovies(
            isShortMovies ? initialMovies : filterDuration(initialMovies)
        )
        localStorage.setItem('shortMovies', !isShortMovies)
    }, [isShortMovies, initialMovies])

    // Поиск фильмов
    const onSearchMovies = useCallback(
        (query) => {
            localStorage.setItem('searchMovies', query)
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
                    .catch(() => {
                        setRequestErr(true)
                    })
                    .finally(() => {
                        setIsLoading(false)
                    })
            }
        },
        [isShortMovies, handleFilterMovies]
    )

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
        if (localStorage.getItem('searchMovies')) {
            if (filteredMovies.length === 0) {
                setIsNotFound(true)
            } else {
                setIsNotFound(false)
            }
        } else {
            setIsNotFound(false)
        }
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
                    onCardLike={onCardLike}
                    onCardDelete={onCardDelete}
                />
            </div>
        </main>
    )
}

export default Movies
