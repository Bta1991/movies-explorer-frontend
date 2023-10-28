import './Register.css'
import Logo from '../Header/Logo/Logo'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register, authorize } from '../../utils/Auth'
import { EMAIL_REGEX, NAME_REGEX } from '../../utils/constants'
import { useFormWithValidation } from '../../hooks/useForm'

const Register = ({
    handleLogin,
    handleTooltip,
    handleStatus,
    handeTextTooltip,
}) => {
    const { values, errors, isValid, handleChange } = useFormWithValidation()

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        const { name, email, password } = values
        e.preventDefault()

        register(name, email, password)
            .then((data) => {
                return authorize(email, password)
            })
            .then((token) => {
                navigate('/movies')
                handleLogin(true)
                handleStatus(true)
                handeTextTooltip('Вы успешно зарегистрировались!')
                handleTooltip(true)
            })
            .catch((err) => {
                err.message === 'Validation failed'
                    ? handeTextTooltip(
                          'Переданы некорректные данные пользователя'
                      )
                    : handeTextTooltip(err.message)
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
                    className={`register__input ${
                        errors.name && 'register__input_error'
                    }`}
                    id="name"
                    name="name"
                    type="text"
                    value={values.name || ''}
                    onChange={handleChange}
                    pattern={NAME_REGEX.source}
                    minLength={2}
                    maxLength={30}
                />
                <span className="register__error">{errors.name || ''}</span>
                <label className="register__label">E-mail</label>
                <input
                    required
                    className={`register__input ${
                        errors.email && 'register__input_error'
                    }`}
                    id="email"
                    name="email"
                    type="email"
                    value={values.email || ''}
                    onChange={handleChange}
                    pattern={EMAIL_REGEX.source}
                />
                <span className="register__error">{errors.email || ''}</span>
                <label className="register__label">Пароль</label>
                <input
                    required
                    className={`register__input ${
                        errors.password && 'register__input_error'
                    }`}
                    id="password"
                    name="password"
                    type="password"
                    value={values.password || ''}
                    onChange={handleChange}
                    minLength={3}
                />
                <span className="register__error">{errors.password || ''}</span>

                <button
                    type="submit"
                    className="register__button"
                    disabled={!isValid}
                >
                    Зарегистрироваться
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
