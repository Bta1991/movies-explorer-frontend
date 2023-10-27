import './Profile.css'
import { useContext, useState, useEffect } from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import { useForm } from '../../hooks/useForm'
import { EMAIL_REGEX } from '../../utils/constants'

const Profile = ({ onLogout, onUpdateUser }) => {
    const currentUser = useContext(CurrentUserContext)
    const [inEditMode, setInEditMode] = useState(false)
    const { values, handleChange, setValues } = useForm({
        name: '',
        email: '',
    })

    useEffect(() => {
        setValues({
            name: currentUser.name,
            email: currentUser.email,
        })
    }, [currentUser])

    const handleSubmit = (e) => {
        e.preventDefault()
        onUpdateUser({
            name: values.name,
            email: values.email,
        })
    }

    const handleEditClick = () => {
        setInEditMode(true)
    }

    return (
        <main className="profile">
            <section className="profile__inner">
                <h1 className="profile__title">Привет, {currentUser.name}!</h1>
                <form
                    className="profile__form"
                    name="profile-form"
                    onSubmit={handleSubmit}
                >
                    <fieldset className="profile__form-fields">
                        <div className="profile__field">
                            <label className="profile__input-label">Имя</label>
                            <input
                                className="profile__input"
                                name="name"
                                type="text"
                                placeholder="Имя"
                                value={values.name || ''}
                                onChange={handleChange}
                                minLength={2}
                                maxLength={30}
                                disabled={!inEditMode}
                                required
                            />
                        </div>
                        <div className="profile__field">
                            <label className="profile__input-label">
                                E-mail
                            </label>
                            <input
                                className="profile__input"
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={values.email || ''}
                                onChange={handleChange}
                                pattern={EMAIL_REGEX.source}
                                disabled={!inEditMode}
                                required
                            />
                        </div>
                    </fieldset>
                    <div className="profile__buttons">
                        <p className="profile__message"></p>
                        {inEditMode ? (
                            <button
                                className="profile__save-button"
                                type="submit"
                            >
                                Сохранить
                            </button>
                        ) : (
                            <>
                                <button
                                    className="profile__edit-button"
                                    type="button"
                                    onClick={handleEditClick}
                                >
                                    Редактировать
                                </button>
                                <button
                                    className="profile__exit-button"
                                    type="button"
                                    onClick={onLogout}
                                >
                                    Выйти из аккаунта
                                </button>
                            </>
                        )}
                    </div>
                </form>
            </section>
        </main>
    )
}

export default Profile
