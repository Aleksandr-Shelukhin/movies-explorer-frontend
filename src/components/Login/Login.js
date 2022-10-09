import React from 'react';
import {Link} from "react-router-dom";

const Login = () => {
  return (
    <div className="login">
      <Link to='/'>
        <div className="register__logo"></div>
      </Link>
      <p className="login__title">Рады видеть!</p>
      <form className="user-form">
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
          className="user-form__form-button user-form__form-button_type_login transition-on-hover"
          type="submit">
          Войти
        </button>
      </form>
      <p
        className="user-form__sign-button">
        Ещё не зарегистрированы? <Link to="/signup" className="user-form__sign-link transition-on-hover">Регистрация</Link>
      </p>
    </div>
  );
};

export default Login;
