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
                handeTextTooltip('Здравствуйте!')
                navigate('/')
            })
            .catch((err) => {
                handleStatus(false)
                err.name === 'ValidationError'
                    ? handeTextTooltip(
                          'Переданы некорректные данные пользователя'
                      )
                    : handeTextTooltip(err)
                handleTooltip(true)
            })
    }

    return (
        <main className="register">
            <h1 className="register__header">
                <Logo />
                Рады видеть!
            </h1>
            <form className="register__form" onSubmit={handleSubmit}>
                <input
                    required
                    className="register__input"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={formValue.email}
                    onChange={handleChange}
                />
                <input
                    required
                    className="register__input register__input-gap"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={formValue.password}
                    onChange={handleChange}
                />
                <button type="submit" className="register__button">
                    Войти
                </button>

                <div className="register__link-area">
                    <p className="register__link-text">
                        Ещё не зарегистрированы?
                    </p>
                    <Link to="/signup" className="register__link">
                        Регистрация
                    </Link>
                </div>
            </form>
        </main>
    )
}

export default Login
