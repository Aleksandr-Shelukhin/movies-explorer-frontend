import { moviesApiBaseUrl, mainApiBaseUrl } from "./BaseUrls";

const getServerResponse = (res) => { // проверка состояние сервера
  if(res.ok) {
    return Promise.resolve(res.json()); //если ответ ОК - получаем данные
  }
  return Promise.reject(`Ошибка: ${res.status}`); //если ответ не ОК - выводим код ошибки
}

export const getUserInfo = () => {
  return fetch(`${mainApiBaseUrl}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  }).then(getServerResponse);
};

export const updateUserInfo = (data) => {
  return fetch(`${mainApiBaseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:
        "Bearer " + localStorage.getItem("token") || "",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
    }),
  }).then(getServerResponse);
};

export const getMoviesInfo = () => {
  return fetch(`${mainApiBaseUrl}/movies`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:
        "Bearer " + localStorage.getItem("token") || "",
    },
  }).then(getServerResponse);
};

export const createMovie = (data) => {
  return fetch(`${mainApiBaseUrl}/movies`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:
        "Bearer " + localStorage.getItem("token") || "",
    },
    body: JSON.stringify({
      country: data.country,
      director: data.director,
      duration: data.duration,
      year: data.year,
      description: data.description,
      image: `${moviesApiBaseUrl}${data.image.url}`,
      trailer: data.trailerLink,
      nameRU: data.nameRU,
      nameEN: data.nameEN,
      thumbnail: `${moviesApiBaseUrl}${data.image.formats.thumbnail.url}`,
      movieId: data.id,
    }),
  }).then(getServerResponse);
};

export const deleteMovie = (id) => {
  return fetch(`${moviesApiBaseUrl}/movies/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:
        "Bearer " + localStorage.getItem("token") || "",
    },
  }).then(getServerResponse);
};
