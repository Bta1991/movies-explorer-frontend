import './Portfolio.css'

const Portfolio = () => {
    return (
        <section className="portfolio" id="portfolio">
            <div className="container">
                <h2 className="portfolio__title">Портфолио</h2>
                <ul className="portfolio__links">
                    <li className="portfolio__item">
                        <a
                            className="portfolio__link-wrapper"
                            href="https://bta1991.github.io/how-to-learn/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <p className="portfolio__link">Статичный сайт</p>
                            <p className="portfolio__arrow">&#8599;</p>
                        </a>
                    </li>
                    <li className="portfolio__item">
                        <a
                            className="portfolio__link-wrapper"
                            href="https://bta1991.github.io/russian-travel/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <p className="portfolio__link">Адаптивный сайт</p>
                            <p className="portfolio__arrow">&#8599;</p>
                        </a>
                    </li>
                    <li className="portfolio__item">
                        <a
                            className="portfolio__link-wrapper"
                            href="https://aaa.nomoredomainsicu.ru/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <p className="portfolio__link">
                                Одностраничное приложение
                            </p>
                            <p className="portfolio__arrow">&#8599;</p>
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Portfolio
