import {mainApiBaseUrl} from "./BaseUrls";

const getServerResponse = (res) => { // проверка состояние сервера
  if(res.ok) {
    return Promise.resolve(res.json()); //если ответ ОК - получаем данные
  }
  return Promise.reject(`Ошибка: ${res.status}`); //если ответ не ОК - выводим код ошибки
}

export const register = (name, password, email) => {
  return fetch(`${mainApiBaseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, password, email })
  })
    .then(getServerResponse)
};

export const signin = (password, email) => {
  return fetch(`${mainApiBaseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then(getServerResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data;
      }})
}
