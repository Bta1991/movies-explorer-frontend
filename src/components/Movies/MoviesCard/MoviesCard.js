import './MoviesCard.css'
import { formatDuration } from '../../../utils/utils'

const MoviesCard = ({
    card,
    isSavedFilms,
    onCardLike,
    onCardDelete,
    saved,
    savedMovies,
}) => {
    const onCardClick = () => {
        if (saved) {
            onCardDelete(
                savedMovies.filter((m) => m.movieId === card.movieId)[0]
            )
        } else {
            onCardLike(card)
        }
    }

    const cardSaveClassName = `${
        !saved
            ? 'card__button card__button_type_save'
            : 'card__button card__button_type_saved'
    }`

    return (
        <article className="card">
            <div className="card__description">
                <h3 className="card__title">{card.nameRU}</h3>
                <p className="card__duration">
                    {formatDuration(card.duration)}
                </p>
            </div>
            <a href={card.trailerLink} target="_blank" rel="noreferrer">
                <img
                    className="card__poster"
                    src={card.image}
                    alt={card.nameRU}
                />
            </a>
            {isSavedFilms ? (
                <button
                    type="button"
                    className="card__button card__button_type_unsaved"
                    onClick={() => onCardDelete(card)}
                />
            ) : (
                <button
                    type="button"
                    className={cardSaveClassName}
                    onClick={onCardClick}
                >
                    {!saved ? 'Сохранить' : ''}
                </button>
            )}
        </article>
    )
}

export default MoviesCard
