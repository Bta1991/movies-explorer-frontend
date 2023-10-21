import './App.css'

import React, { useState, useEffect, useCallback } from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Main from '../Main/Main'
import Movies from '../Movies'
import Login from '../Login'
import Register from '../Register/Register'
import ProtectedRoute from '../ProtectedRoute'
import InfoTooltip from '../InfoTooltip'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import api from '../../utils/Api'
import { verifyToken, logout } from '../../utils/Auth'

function App() {
    const [currentUser, setCurrentUser] = useState({})
    const [cards, setCards] = useState([])
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [userEmail, setUserEmail] = useState('')
    const [isTooltipOpen, setTooltipOpen] = useState(false)
    const [statusTooltip, setStatusTooltip] = useState(false)
    const [textTooltip, setTextTooltip] = useState('')

    const closeAllPopups = useCallback(() => {
        setTooltipOpen(false)
    }, [])

    const fetchData = async () => {
        try {
            const [userData, cardsData] = await Promise.all([
                api.getUserInfo(),
                api.getInitialsCards(),
            ])
            console.log(userData)
            setCurrentUser(userData)
            setCards(cardsData)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            fetchData()
        }
    }, [isLoggedIn])

    const navigate = useNavigate()
    const checkToken = () => {
        verifyToken()
            .then((res) => {
                setUserEmail(res.data?.email)
                setLoggedIn(true)
                navigate('/')
            })
            .catch((err) => {
                setLoggedIn(false)
                console.log(err)
            })
    }

    const handleSignout = () => {
        logout()
            .then(() => {
                setLoggedIn(false)
                navigate('/')
                setUserEmail('')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        checkToken()
    }, [])

    const handleCardLike = useCallback(
        (card) => {
            // Снова проверяем, есть ли уже лайк на этой карточке
            // const isLiked = card.likes.some((i) => i._id === currentUser._id)
            const isLiked = card.likes.some((i) => i === currentUser._id)

            // Отправляем запрос в API и получаем обновлённые данные карточки
            api.changeLikeCardStatus(card._id, isLiked)
                .then((newCard) => {
                    setCards((state) =>
                        state.map((c) => (c._id === card._id ? newCard : c))
                    )
                })
                .catch((err) => {
                    console.error(err)
                })
        },
        [currentUser]
    )

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header isLoggedIn={isLoggedIn} />
                {/* <Header isLoggedIn={isLoggedIn} handleSignout={handleSignout} /> */}
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route
                        path="/movies"
                        element={
                            <ProtectedRoute
                                isLoggedIn={isLoggedIn}
                                Component={Movies}
                                cards={cards}
                                onCardLike={handleCardLike}
                            />
                        }
                    />
                    <Route
                        path="/signin"
                        element={
                            <Login
                                handleLogin={setLoggedIn}
                                handleTooltip={setTooltipOpen}
                                handleStatus={setStatusTooltip}
                                handeTextTooltip={setTextTooltip}
                                setUserEmail={setUserEmail}
                            />
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <Register
                                handleTooltip={setTooltipOpen}
                                handleStatus={setStatusTooltip}
                                handeTextTooltip={setTextTooltip}
                            />
                        }
                    />
                    <Route
                        path="*"
                        element={
                            isLoggedIn ? (
                                <Navigate to="/movies" replace />
                            ) : (
                                <Navigate to="/" replace />
                            )
                        }
                    />
                </Routes>
                <Footer />
                <InfoTooltip
                    isOpen={isTooltipOpen}
                    status={statusTooltip}
                    text={textTooltip}
                    onClose={closeAllPopups}
                />
            </div>
        </CurrentUserContext.Provider>
    )
}
export default App
