class MainApi {
    constructor(data) {
        this._baseUrl = data.baseUrl
        this._headers = data.headers
    }

    _checkResponse(res) {
        return res.ok
            ? res.json()
            : Promise.reject(`Ошибка получения данных: ${res.status}`)
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: 'include',
            headers: this._headers,
        }).then(this._checkResponse)
    }

    setUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            }),
        }).then(this._checkResponse)
    }

    getMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            credentials: 'include',
            headers: this._headers,
        }).then(this._checkResponse)
    }

    saveMovie(data) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify(data),
        }).then(this._checkResponse)
    }

    deleteMovie(id) {
        return fetch(`${this._baseUrl}/movies/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers,
        }).then(this._checkResponse)
    }
}

const apiuser = new MainApi({
    baseUrl: 'https://api.diplom.nomoredomainsrocks.ru',
    headers: {
        'Content-Type': 'application/json',
    },
})

export default apiuser
