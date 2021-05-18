class Auth {
    constructor(url) {
        this.url = url;
    }

    _getResponseStatus (res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    signUp (email, password) {
        return fetch (`${this.url}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        }).then((res) => this._getResponseStatus(res))
        .catch((err) => console.log(err));
    }

    signIn (email, password) {
      return fetch (`${this.url}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        }).then((res) => {
          return res.json();
        })
        .then((res) => {
          return res.token;
        })
        .catch((err) => console.log(err));
    }

    getToken (token) {
        return fetch (`${this.url}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`,
            }
        }).then((res) => this._getResponseStatus(res))
        .catch((err) => console.log(err));
    }
}

const auth = new Auth('https://api.coconut.nomoredomains.club');

export default auth;
