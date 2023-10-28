import './Login.css'
import Logo from '../Header/Logo/Logo'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authorize } from '../../utils/Auth'
import { EMAIL_REGEX } from '../../utils/constants'
import { useFormWithValidation } from '../../hooks/useForm'

const Login = ({
    handleLogin,
    handleTooltip,
    handleStatus,
    handeTextTooltip,
}) => {
    const { values, errors, isValid, handleChange } = useFormWithValidation()

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        const { email, password } = values

        e.preventDefault()

        authorize(email, password)
            .then((data) => {
                handleLogin(true)
                handleStatus(true)
                handeTextTooltip('С возвращением!')
                handleTooltip(true)
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
                    className={`login__input ${
                        errors.email && 'login__input_error'
                    }`}
                    id="email"
                    type="email"
                    name="email"
                    value={values.email || ''}
                    onChange={handleChange}
                    pattern={EMAIL_REGEX.source}
                />
                <span className="login__error">{errors.email || ''}</span>
                <label className="login__label">Пароль</label>
                <input
                    required
                    className={`login__input ${
                        errors.password && 'login__input_error'
                    }`}
                    id="password"
                    type="password"
                    name="password"
                    value={values.password || ''}
                    onChange={handleChange}
                    minLength={3}
                />
                <span className="register__error">{errors.password || ''}</span>

                <button
                    type="submit"
                    className="login__button"
                    disabled={!isValid}
                >
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
