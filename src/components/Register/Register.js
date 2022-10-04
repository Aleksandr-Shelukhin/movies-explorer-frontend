import React from 'react';
import {Link} from "react-router-dom";

const Register = () => {
  return (
    <div className="register">
      <Link to='/'>
        <div className="register__logo"></div>
      </Link>
        <p className="register__title">Добро пожаловать!</p>
        <form className="user-form">
          <fieldset className="user-form__fieldset">
            <label className="user-form__input-label">Имя
              <input
                className="user-form__input"
                type="text"
                name="name"
                required
              />
            </label>
            <span className="user-form__input-error"></span>
          </fieldset>
          <fieldset className="user-form__fieldset">
            <label className="user-form__input-label">E-mail
              <input
                className="user-form__input"
                type="email"
                name="email"
                required
              />
            </label>
            <span className="user-form__input-error"></span>
          </fieldset>
          <fieldset className="user-form__fieldset">
            <label className="user-form__input-label">Пароль
              <input
                className="user-form__input"
                type="password"
                name="password"
                required
              />
            </label>
            <span className="user-form__input-error">Что-то пошло не так...</span>
          </fieldset>
          <button
            className="user-form__form-button transition-on-hover"
            type="submit">
            Зарегистрироваться
          </button>
        </form>
        <p
          className="user-form__sign-button">
          Уже зарегистрированы? <Link to="/signin" className="user-form__sign-link transition-on-hover">Войти</Link>
        </p>
    </div>
  );
};

export default Register;
