import './MoviesCardList.css'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'
import {
    ERROR_SEARCH_MESSAGE,
    NOT_FOUND_MESSAGE,
} from '../../../utils/constants'
import { calcQuantity } from '../../../utils/utils'

const MoviesCardList = (props) => {
    const {
        cards,
        isSavedFilms,
        isLoading,
        isRequestErr,
        isNotFound,
        onCardLike,
        savedMovies,
        onCardDelete,
    } = props

    const path = useLocation().pathname
    const [shownMovies, setShownMovies] = useState(0)

    const shownCount = () => {
        setShownMovies(calcQuantity().initial)
    }

    useEffect(() => {
        shownCount()
        window.addEventListener('resize', shownCount)
        return () => window.removeEventListener('resize', shownCount)
    }, [cards.length])

    const showMore = () => {
        setShownMovies(shownMovies + calcQuantity().add)
    }

    const getSavedMovieCard = (savedMovies, card) => {
        return savedMovies.find(
            (savedMovie) => savedMovie.movieId === card.movieId
        )
    }

    return (
        <section className="cards" aria-label="Список карт фильмов">
            {<Preloader isOpen={isLoading} />}
            {isNotFound && (
                <p className="cards__search-error">{NOT_FOUND_MESSAGE}</p>
            )}
            {isRequestErr && (
                <p className="cards__search-error">{ERROR_SEARCH_MESSAGE}</p>
            )}

            {!isLoading && !isRequestErr && !isNotFound && (
                <>
                    {path === '/movies' ? (
                        <>
                            <div className="cards__grid">
                                {cards.slice(0, shownMovies).map((card) => (
                                    <MoviesCard
                                        key={
                                            isSavedFilms
                                                ? card._id
                                                : card.movieId
                                        }
                                        saved={getSavedMovieCard(
                                            savedMovies,
                                            card
                                        )}
                                        cards={cards}
                                        card={card}
                                        isSavedFilms={isSavedFilms}
                                        onCardLike={onCardLike}
                                        onCardDelete={onCardDelete}
                                        savedMovies={savedMovies}
                                    />
                                ))}
                            </div>
                            {cards.length > shownMovies && (
                                <div className="cards__button-container">
                                    <button
                                        className="cards__button"
                                        type="button"
                                        name="more"
                                        onClick={showMore}
                                    >
                                        Ещё
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="cards__grid">
                            {cards.map((card) => (
                                <MoviesCard
                                    key={isSavedFilms ? card._id : card.movieId}
                                    saved={getSavedMovieCard(savedMovies, card)}
                                    cards={cards}
                                    card={card}
                                    isSavedFilms={isSavedFilms}
                                    onCardLike={onCardLike}
                                    onCardDelete={onCardDelete}
                                    savedMovies={savedMovies}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </section>
    )
}

export default MoviesCardList
