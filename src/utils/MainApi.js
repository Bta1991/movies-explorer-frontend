import { API_URL } from './constants'

class MainApi {
    constructor(data) {
        this._baseUrl = data.baseUrl
        this._headers = data.headers
    }

    handleResponse(res) {
        if (res.ok) {
            return res.json()
        } else {
            return res.json().then((error) => {
                return Promise.reject(error)
            })
        }
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: 'include',
            headers: this._headers,
        }).then(this.handleResponse)
    }

    setUserInfo(name, email) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({ name, email }),
        }).then(this.handleResponse)
    }

    getMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            credentials: 'include',
            headers: this._headers,
        }).then(this.handleResponse)
    }

    saveMovie(data) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify(data),
        }).then(this.handleResponse)
    }

    deleteMovie(id) {
        return fetch(`${this._baseUrl}/movies/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers,
        }).then(this.handleResponse)
    }
}

const apiuser = new MainApi({
    baseUrl: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export default apiuser
