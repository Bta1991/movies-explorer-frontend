import './Login.css'
import Logo from '../Header/Logo/Logo'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authorize } from '../../utils/Auth'

const Login = ({
    handleLogin,
    handleTooltip,
    handleStatus,
    handeTextTooltip,
}) => {
    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValue({
            ...formValue,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        const { email, password } = formValue

        e.preventDefault()

        if (!email || !password) {
            return
        }

        authorize(email, password)
            .then((data) => {
                handleLogin(true)
                handleStatus(true)
                handleTooltip(true)
                handeTextTooltip('С возвращением!')
                navigate('/movies')
            })
            .catch((err) => {
                handleStatus(false)
                err.message === 'Validation failed'
                    ? handeTextTooltip(
                          'Переданы некорректные данные пользователя'
                      )
                    : handeTextTooltip(err.message)
                handleTooltip(true)
            })
    }

    return (
        <main className="login">
            <h1 className="login__header">
                <Logo />
                Рады видеть!
            </h1>
            <form className="login__form" onSubmit={handleSubmit}>
                <label className="login__label">E-mail</label>
                <input
                    required
                    className="login__input"
                    id="email"
                    type="email"
                    name="email"
                    value={formValue.email}
                    onChange={handleChange}
                />
                <label className="login__label">Пароль</label>
                <input
                    required
                    className="login__input login__input-gap"
                    id="password"
                    type="password"
                    name="password"
                    value={formValue.password}
                    onChange={handleChange}
                    minLength={3}
                />
                <button type="submit" className="login__button">
                    Войти
                </button>

                <div className="login__link-area">
                    <p className="login__link-text">Ещё не зарегистрированы?</p>
                    <Link to="/signup" className="login__link">
                        Регистрация
                    </Link>
                </div>
            </form>
        </main>
    )
}

export default Login
