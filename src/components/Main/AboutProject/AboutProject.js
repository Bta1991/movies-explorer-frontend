import './AboutProject.css'

const AboutProject = () => {
    return (
        <section className="project" id="project">
            <div className="container">
                <h2 className="project__title">О проекте</h2>
                <div className="project__info">
                    <div>
                        <h3 className="project__info-title">
                            Дипломный проект включал 5 этапов
                        </h3>
                        <p className="project__info-text">
                            Составление плана, работу над бэкендом, вёрстку,
                            добавление функциональности и финальные доработки.
                        </p>
                    </div>
                    <div>
                        <h3 className="project__info-title">
                            На выполнение диплома ушло 5 недель
                        </h3>
                        <p className="project__info-text">
                            У каждого этапа был мягкий и жёсткий дедлайн,
                            которые нужно было соблюдать, чтобы успешно
                            защититься.
                        </p>
                    </div>
                </div>
                <div className="project__timeline">
                    <p className="project__timeline-header project__timeline-header_green">
                        1 неделя
                    </p>
                    <p className="project__timeline-header">4 недели</p>
                    <p className="project__timeline-underline">Back-end</p>
                    <p className="project__timeline-underline">Front-end</p>
                </div>
            </div>
        </section>
    )
}

export default AboutProject
