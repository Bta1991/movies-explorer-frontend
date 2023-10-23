import './ErrorPage.css'

const ErrorPage = ({ goBack }) => {
    return (
        <main className="error-page">
            <section className="error-page__container">
                <h1 className="error-page__title">404</h1>
                <p className="error-page__text">Страница не найдена</p>
            </section>
            <button className="error-page__button" onClick={goBack}>
                Назад
            </button>
        </main>
    )
}

export default ErrorPage
