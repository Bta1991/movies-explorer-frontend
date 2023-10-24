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
        const { name, email, password } = values

        e.preventDefault()
        if (!name || !email || !password) {
            setErrorMessage('Заполните все поля!')
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
                <label className="register__label">Имя</label>
                <input
                    required
                    className="register__input"
                    id="name"
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    minLength={2}
                    maxLength={30}
                />
                <label className="register__label">E-mail</label>
                <input
                    required
                    className="register__input"
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    pattern="^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$"
                />
                <label className="register__label">Пароль</label>
                <input
                    required
                    className="register__input"
                    id="password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    minLength={3}
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
