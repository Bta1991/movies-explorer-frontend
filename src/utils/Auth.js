import { API_URL, API_OPTIONS } from './constants'

function handleResponse(res) {
    if (res.ok) {
        return res.json()
    } else {
        return res.json().then((error) => {
            return Promise.reject(error)
        })
    }
}

export function register(name, email, password) {
    return fetch(`${API_URL}/signup`, {
        method: 'POST',
        ...API_OPTIONS,
        body: JSON.stringify({ name, email, password }),
    }).then(handleResponse)
}

export function authorize(email, password) {
    return fetch(`${API_URL}/signin`, {
        method: 'POST',
        ...API_OPTIONS,
        body: JSON.stringify({ email, password }),
    }).then(handleResponse)
}

export function verifyToken() {
    return fetch(`${API_URL}/users/me`, {
        method: 'GET',
        ...API_OPTIONS,
    }).then(handleResponse)
}

export function logout() {
    return fetch(`${API_URL}/logout`, {
        method: 'GET',
        ...API_OPTIONS,
    })
}
