import './Main.css'
import { useLocation } from 'react-router-dom'

const Main = () => {
    const path = useLocation().pathname

    return (
        <header className={'header '}>
            <div className="container">
                <div className="header__container">
                    <p>заглушка сайта</p>
                </div>
            </div>
        </header>
    )
}

export default Main
