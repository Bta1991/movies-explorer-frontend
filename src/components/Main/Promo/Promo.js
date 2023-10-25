import './Promo.css'
import promoPic from '../../../images/promo.svg'

const Promo = () => {
    return (
        <section className="promo">
            <div className="container">
                <div className="promo__container">
                    <div>
                        <h1 className="promo__title">
                            Учебный проект студента факультета
                            Веб&zwj;-&zwj;разработки.
                        </h1>
                        <p className="promo__text">
                            Листайте ниже, чтобы узнать больше про этот проект и
                            его создателя.
                        </p>
                        <a href="#project" className="promo__button">
                            Узнать больше
                        </a>
                    </div>
                    <img className="promo__image" src={promoPic} alt="Земля" />
                </div>
            </div>
        </section>
    )
}

export default Promo
