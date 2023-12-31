import './Techs.css'

const Techs = () => {
    return (
        <section className="techs" id="techs">
            <div className="container">
                <h2 className="techs__title">Технологии</h2>
                <div className="techs__info">
                    <div>
                        <h3 className="techs__info-title">7 технологий</h3>
                        <p className="techs__info-text">
                            На курсе веб-разработки мы освоили технологии,
                            которые применили в дипломном проекте.
                        </p>
                    </div>
                </div>
                <ul className="techs__list">
                    <li className="techs__list-header">HTML</li>
                    <li className="techs__list-header">CSS</li>
                    <li className="techs__list-header">JS</li>
                    <li className="techs__list-header">React</li>
                    <li className="techs__list-header">Git</li>
                    <li className="techs__list-header">Express.js</li>
                    <li className="techs__list-header">mongoDB</li>
                </ul>
            </div>
        </section>
    )
}

export default Techs
