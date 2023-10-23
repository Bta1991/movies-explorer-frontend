import './Footer.css'
import { useLocation } from 'react-router-dom'

const Footer = () => {
    const path = useLocation().pathname
    const classPath =
        path === '/' || path === '/movies' || path === '/saved-movies'
            ? ''
            : 'footer_hidden'

    return (
        <footer className={'footer ' + classPath}>
            <div className="container">
                <p className="footer__info">
                    Учебный проект Яндекс.Практикум х BeatFilm.
                </p>
                <div className="footer__bottom">
                    <p className="footer__copyright">&copy;2023</p>
                    <ul className="footer__list">
                        <li>
                            <a
                                className="footer__link"
                                target="_blank"
                                rel="noreferrer"
                                href="https://practicum.yandex.ru"
                            >
                                Яндекс.Практикум
                            </a>
                        </li>
                        <li>
                            <a
                                className="footer__link"
                                target="_blank"
                                rel="noreferrer"
                                href="https://github.com/Bta1991"
                            >
                                Github
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer
