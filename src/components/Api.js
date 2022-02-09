export default class Api {
  constructor({ address, token }) {
    this._address = address;
    this._token = token;
  }

  getCards() {
    return fetch(`${this._address}/cards`, {
    headers: {
      authorization: this._token
    }
  })
  .then(res => {
    if(res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  }

  addCard(data) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(res => {
      if(res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`); 
    }) 
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._address}/users/me/avatar `, {
    method: 'PATCH',
    headers: {
      authorization: this._token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatar
    })
  })
  .then(res => {
    if(res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`); 
  }) 
  }

  getUserData() {
    return fetch(`${this._address}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then(res => {
      if(res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`); 
    }) 
  }

  setUserData({ name, about }) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => {
      if(res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`); 
    })
  }
}