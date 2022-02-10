export default class Api {
  constructor({ address, token }) {
    this._address = address;
    this._token = token;
  }

  // Получить карточки
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

  // Добавить карточку
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

  // Изменить аватар
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

  // Получить информацию о юзере
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

  // Изменить информацию о юзере
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

  // Удалить карточку
  deleteCard({ id }) {
    return fetch(`${this._address}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(res => {
      if(res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`); 
    })
  }

  // Поставить лайк
  setLike(id) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
    .then(res => {
      if(res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`); 
    })
  }

  // Удалить лайк
  deleteLike(id) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(res => {
      if(res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`); 
    })
  }
}