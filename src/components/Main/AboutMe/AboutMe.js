import './AboutMe.css'
import photo from '../../../images/photo.jpg'

const AboutMe = () => {
    return (
        <section className="about" id="about">
            <div className="container">
                <h2 className="about__title">Студентка</h2>
                <div className="about__info">
                    <div>
                        <h3 className="about__info-title">Татьяна</h3>
                        <h4 className="about__info-subtitle">
                            Фронтенд-разработчик
                        </h4>
                        <p className="about__info-text">
                            Я начинающий фронтенд-разработчик. По образованию
                            экономст. Решила попробовать себя в сфере ИТ и
                            зарегистрировалась в программе "Цифровые профессии".
                            После прохождения курса Яндекс.Практикум планирую
                            заняться работой в сфере веб-разработки.
                        </p>
                    </div>
                    <div>
                        <img
                            className="about__photo"
                            src={photo}
                            alt="Фото студента"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutMe
