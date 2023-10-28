import React, { useCallback } from 'react'
import { EMAIL_REGEX, NAME_REGEX } from '../utils/constants'

//хук управления формой
export function useForm(inputValues) {
    const [values, setValues] = React.useState(inputValues)

    const handleChange = (e) => {
        const { value, name } = e.target
        setValues({ ...values, [name]: value })
    }

    return { values, handleChange, setValues }
}

//хук управления формой и валидации формы
export function useFormWithValidation() {
    const [values, setValues] = React.useState({})
    const [errors, setErrors] = React.useState({})
    const [isValid, setIsValid] = React.useState(false)

    const handleChange = (event) => {
        const target = event.target
        const name = target.name
        const value = target.value
        setValues({ ...values, [name]: value })

        // Установка пользовательского сообщения об ошибке для атрибута pattern
        if (name === 'name') {
            if (!value.match(NAME_REGEX)) {
                target.setCustomValidity(
                    'Используйте только буквы, пробелы и дефисы'
                )
            } else {
                target.setCustomValidity('')
            }
        }
        setErrors({ ...errors, [name]: target.validationMessage })
        setIsValid(target.closest('form').checkValidity())
    }

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues)
            setErrors(newErrors)
            setIsValid(newIsValid)
        },
        [setValues, setErrors, setIsValid]
    )

    return { values, handleChange, errors, isValid, resetForm }
}
