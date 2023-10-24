import './SearchForm.css'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { EMPTY_SEARCH_MESSAGE } from '../../../utils/constants'

const SearchForm = ({ onSearchMovies, onFilter, isShortMovies }) => {
    const [query, setQuery] = useState('')
    const path = useLocation().pathname

    const handleChangeQuery = (e) => {
        setQuery(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (query.trim().length === 0) {
            setQuery(EMPTY_SEARCH_MESSAGE)
        } else {
            onSearchMovies(query)
        }
    }

    useEffect(() => {
        if (path === '/movies' && localStorage.getItem('movieSearch')) {
            const localQuery = localStorage.getItem('movieSearch')
            setQuery(localQuery)
        }
    }, [path])

    return (
        <section className="search-form" aria-label="Форма поиска">
            <form
                className="search-form__form"
                noValidate
                onSubmit={handleSubmit}
            >
                <div className="search-form__input-container">
                    <input
                        required
                        className="search-form__input"
                        name="query"
                        id="search-input"
                        type="text"
                        placeholder="Фильм"
                        onChange={handleChangeQuery}
                        value={query || ''}
                    />
                    <button className="search-form__button" type="submit">
                        Поиск
                    </button>
                </div>
                <label
                    htmlFor="search-form__short-films"
                    className="search-form__short-films"
                >
                    <input
                        className="search-form__short-films-checkbox"
                        type="checkbox"
                        id="search-form__short-films"
                        onChange={onFilter}
                        checked={isShortMovies}
                    />
                    <div className="search-form__thumb-wrapper">
                        <div className="search-form__thumb-inner" />
                    </div>
                    <span className="search-form__short-films-text">
                        Короткометражки
                    </span>
                </label>
            </form>
        </section>
    )
}

export default SearchForm
