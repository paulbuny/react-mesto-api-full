class Api {
    constructor({url}) {
        this._url = url;
    }

    _getResponseStatus (res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getInitialCards (token) {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                return this._getResponseStatus(res);
            });
    }

    addNewCard ({ name, link, token }) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                'Authorization': token,
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

    deleteCard (cardId, token) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                return this._getResponseStatus(res);
            });
    }

    addLike (cardId, token) {
        return fetch(`${this._url}/cards/${cardId}/likes/`, {
            method: 'PUT',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => this._getResponseStatus(res));
    }

    removeLike (cardId, token) {
        return fetch(`${this._url}/cards/${cardId}/likes/`, {
            method: 'DELETE',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => this._getResponseStatus(res));
    }

    changeLikeCardStatus(cardId, isLiked, token) {
        return isLiked ? this.addLike(cardId, token) : this.removeLike(cardId, token);
    }

    getUserInformation (token) {
        return fetch(`${this._url}/users/me`, {
          method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => this._getResponseStatus(res));
    }

    saveUserInformation ({ name, about, token }) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                'Authorization': token,
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

    changeUserAvatar (link, token) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Authorization': token,
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
});

export default api
