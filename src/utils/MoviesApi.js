import { moviesApiBaseUrl } from "./BaseUrls";

class Api {
  constructor({ moviesBaseLink, headers }) {
    this._movieBaseLink = moviesBaseLink;
    this._headers = headers;
  }


  _getServerResponse(res) { // проверка состояние сервера
    if (res.ok) {
      return Promise.resolve(res.json()); //если ответ ОК - получаем данные
    }
    return Promise.reject(`Ошибка: ${res.status}`); //если ответ не ОК - выводим код ошибки
  }

  getMoviesInfo() {
    return fetch(`${this._movieBaseLink}/beatfilm-movies`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._getServerResponse);
  }

}

export const moviesApi = new Api({
  moviesBaseLink: moviesApiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});
