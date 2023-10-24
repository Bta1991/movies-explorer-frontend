import './Register.css'
import Logo from '../Header/Logo/Logo'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../utils/Auth'

const Register = ({ handleTooltip, handleStatus, handeTextTooltip }) => {
    const [values, setFormValue] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValue((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = (e) => {
        const { name, email, password, confirmPassword } = values

        e.preventDefault()
        if (!name || !email || !password || !confirmPassword) {
            setErrorMessage('Заполните все поля!')
            return
        }
        if (password !== confirmPassword) {
            setErrorMessage('Введите идентичные пароли!')
            return
        }
        register(name, email, password)
            .then((data) => {
                navigate('/signin')
                handleStatus(true)
                handleTooltip(true)
                handeTextTooltip('Вы успешно зарегистрировались!')
            })
            .catch((err) => {
                handeTextTooltip(err)
                handleStatus(false)
                handleTooltip(true)
            })
    }

    return (
        <main className="register">
            <h1 className="register__header">
                <Logo />
                Добро пожаловать!
            </h1>
            <form className="register__form" onSubmit={handleSubmit}>
                <input
                    required
                    className="register__input"
                    id="name"
                    name="name"
                    type="name"
                    placeholder="Имя"
                    value={values.name}
                    onChange={handleChange}
                />
                <input
                    required
                    className="register__input"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    value={values.email}
                    onChange={handleChange}
                />
                <input
                    required
                    className="register__input"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    value={values.password}
                    onChange={handleChange}
                />
                {/* добавлено подтверждение пароля */}
                <input
                    required
                    className="register__input register__input-smallgap"
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Введите пароль ещё раз"
                    value={values.confirmPassword}
                    onChange={handleChange}
                />

                <button type="submit" className="register__button">
                    {errorMessage || 'Зарегистрироваться'}
                </button>

                <div className="register__link-area">
                    <p className="register__link-text">Уже зарегистрированы?</p>
                    <Link to="/signin" className="register__link">
                        Войти
                    </Link>
                </div>
            </form>
        </main>
    )
}

export default Register
