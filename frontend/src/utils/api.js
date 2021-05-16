class Api {
    constructor({url, token}) {
        this._url = url;
        this._token = token;
    }

    _getResponseStatus (res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getInitialCards () {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: {
                authorization: this._token,
            }
        })
            .then((res) => {
                return this._getResponseStatus(res);
            });
    }

    addNewCard ({ name, link }) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                link: link,
            })
        })
            .then((res) => {
                return this._getResponseStatus(res);
            });
    }

    deleteCard (cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                return this._getResponseStatus(res);
            });
    }

    addLike (cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                return this._getResponseStatus(res);
            });
    }

    removeLike (cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                return this._getResponseStatus(res);
            });
    }

    changeLikeCardStatus(cardId, isLiked) {
        return isLiked ? this.addLike(cardId) : this.removeLike(cardId);
    }

    getUserInformation () {
        return fetch(`${this._url}/users/me`, {
            headers: {
                method: 'GET',
                authorization: this._token,
            }
        })
            .then((res) => this._getResponseStatus(res));
    }

    saveUserInformation ({ name, about }) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                about: about,
            })
        })
            .then((res) => {
                return this._getResponseStatus(res);
            });
    }

    changeUserAvatar (link) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                avatar: link,
            })
        })
            .then((res) => {
                return this._getResponseStatus(res);
            });
    }
}

const api = new Api({
  url: 'http://localhost:3005',
  token: `Bearer ${localStorage.getItem('token')}`,
})

export default api
