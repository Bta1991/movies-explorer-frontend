export const API_URL = 'https://api.diplom.nomoredomainsrocks.ru'
export const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies'

export const API_OPTIONS = {
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include',
}

export const DESKTOP_SIZE = 1275
export const TABLET_SIZE = 767
export const CARDS_DESKTOP = { initial: 12, add: 3 }
export const CARDS_TABLET = { initial: 8, add: 2 }
export const CARDS_MOBILE = { initial: 5, add: 2 }
export const SHORTS_DURATION = 40

export const EMAIL_REGEX = /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,4}$/
export const NAME_REGEX = /^[A-Za-zА-Яа-яЁё\- ]+$/

export const SUCCESS_PROFILE_MESSAGE = 'Профиль успешно изменен'
export const EMPTY_SEARCH_MESSAGE = 'Нужно ввести ключевое слово'
export const FIRST_SEARCH_MESSAGE = 'Введите запрос для поиска любимого фильма'
export const NOT_FOUND_MESSAGE = 'По вашему запросу ничего не найдено'
export const ERROR_SEARCH_MESSAGE = 'Во время поиска произошла ошибка.'
