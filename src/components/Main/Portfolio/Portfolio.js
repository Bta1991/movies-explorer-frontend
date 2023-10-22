import './Portfolio.css'

const Portfolio = () => {
    return (
        <section className="portfolio" id="portfolio">
            <div className="container">
                <article className="portfolio__title">Портфолио</article>
                <ul className="portfolio__links">
                    <li className="portfolio__item">
                        <a
                            className="portfolio__link"
                            href="https://bta1991.github.io/how-to-learn/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Статичный сайт
                        </a>
                        <p className="portfolio__arrow">&#8599;</p>
                    </li>
                    <li className="portfolio__item">
                        <a
                            className="portfolio__link"
                            href="https://bta1991.github.io/russian-travel/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Адаптивный сайт
                        </a>
                        <p className="portfolio__arrow">&#8599;</p>
                    </li>
                    <li className="portfolio__item">
                        <a
                            className="portfolio__link"
                            href="https://aaa.nomoredomainsicu.ru/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Одностраничное приложение
                        </a>
                        <p className="portfolio__arrow">&#8599;</p>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Portfolio
