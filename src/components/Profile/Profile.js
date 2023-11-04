import './Profile.css'
import { useContext, useState, useEffect } from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import { useFormWithValidation } from '../../hooks/useForm'
import { EMAIL_REGEX, NAME_REGEX } from '../../utils/constants'

const Profile = ({ onLogout, onUpdateUser }) => {
    const currentUser = useContext(CurrentUserContext)
    const { values, errors, isValid, handleChange, resetForm } =
        useFormWithValidation()

    const [editMode, setEditMode] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        onUpdateUser({
            name: values.name,
            email: values.email,
        })
    }

    useEffect(() => {
        if (currentUser) {
            resetForm(currentUser, {}, true)
        }
    }, [currentUser, resetForm])

    const canChanged =
        !isValid ||
        (currentUser.name === values.name && currentUser.email === values.email)

    const handleEditClick = () => {
        setEditMode(true)
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
                                className={`profile__input ${
                                    errors.name && 'profile__input_error'
                                }`}
                                name="name"
                                type="text"
                                placeholder="Имя"
                                value={values.name || ''}
                                onChange={handleChange}
                                minLength={2}
                                maxLength={30}
                                pattern={NAME_REGEX.source}
                                disabled={!editMode}
                                required
                            />
                            <span className="profile__input-error">
                                {errors.name || ''}
                            </span>
                        </div>
                        <div className="profile__field">
                            <label className="profile__input-label">
                                E-mail
                            </label>
                            <input
                                className={`profile__input ${
                                    errors.email && 'profile__input_error'
                                }`}
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={values.email || ''}
                                onChange={handleChange}
                                pattern={EMAIL_REGEX.source}
                                disabled={!editMode}
                                required
                            />
                            <span className="profile__input-error">
                                {errors.email || ''}
                            </span>
                        </div>
                    </fieldset>
                    <div className="profile__buttons">
                        {editMode ? (
                            <button
                                className="profile__save-button"
                                type="submit"
                                disabled={canChanged}
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
                            </>
                        )}
                        <button
                            className="profile__exit-button"
                            type="button"
                            onClick={onLogout}
                        >
                            Выйти из аккаунта
                        </button>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default Profile
