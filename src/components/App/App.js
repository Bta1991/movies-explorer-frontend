import './App.css'

import React, { useState, useEffect, useCallback } from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Profile from '../Profile/Profile'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import ErrorPage from '../ErrorPage/ErrorPage'
import InfoTooltip from '../InfoTooltip/InfoTooltip'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import apiuser from '../../utils/MainApi'
import { verifyToken, logout } from '../../utils/Auth'

function App() {
    const [currentUser, setCurrentUser] = useState({})
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [isTooltipOpen, setTooltipOpen] = useState(false)
    const [statusTooltip, setStatusTooltip] = useState(false)
    const [textTooltip, setTextTooltip] = useState('')
    const [savedMovies, setSavedMovies] = useState([])

    const closeAllPopups = useCallback(() => {
        setTooltipOpen(false)
    }, [])

    const authUser = async () => {
        try {
            const user = await apiuser.getUserInfo()
            if (user) {
                setLoggedIn(true)
                setCurrentUser(user)
            } else {
                setLoggedIn(false)
            }
        } catch (err) {
            if (err instanceof Error) {
                console.log(err)
                setLoggedIn(false)
            }
        }
    }

    const handleUpdateUser = async ({ name, email }) => {
        try {
            const userData = await apiuser.setUserInfo(name, email)
            setCurrentUser(userData)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        authUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn])

    useEffect(() => {
        if (isLoggedIn) {
            getSavedMovies()
        }
    }, [isLoggedIn])

    const getSavedMovies = async () => {
        try {
            const savedMovies = await apiuser.getMovies()
            setSavedMovies(savedMovies)
        } catch (err) {
            console.log(err)
        }
    }

    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1, { replace: true })
    }
    const checkToken = () => {
        verifyToken()
            .then((res) => {
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
                setCurrentUser(null)
                localStorage.clear()
                sessionStorage.clear()
                navigate('/', { replace: true })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        checkToken()
    }, [])

    const handleCardLike = async (movie) => {
        try {
            console.log(movie)
            const savedMovie = await apiuser.saveMovie(movie)
            setSavedMovies([savedMovie, ...savedMovies])
        } catch (err) {
            console.error(err)
        }
    }

    const handleCardDelete = async (movie) => {
        try {
            await apiuser.deleteMovie(movie._id)
            setSavedMovies((state) =>
                state.filter((item) => item._id !== movie._id)
            )
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header isLoggedIn={isLoggedIn} />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route
                        path="/movies"
                        element={
                            <ProtectedRoute
                                isLoggedIn={isLoggedIn}
                                Component={Movies}
                                savedMovies={savedMovies}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                            />
                        }
                    />
                    <Route
                        path="/saved-movies"
                        element={
                            <ProtectedRoute
                                isLoggedIn={isLoggedIn}
                                Component={SavedMovies}
                                savedMovies={savedMovies}
                                onCardDelete={handleCardDelete}
                            />
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute
                                isLoggedIn={isLoggedIn}
                                Component={Profile}
                                onLogout={handleSignout}
                                onUpdateUser={handleUpdateUser}
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
                    <Route path="*" element={<ErrorPage goBack={goBack} />} />
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
