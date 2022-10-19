import React, { useEffect, useContext } from 'react';
import {Link} from "react-router-dom";

import formValidation from '../../hooks/formValidation'
import { AppContext } from "../../context/AppContext";

const Register = ({ register, setAuthErrorMessage }) => {
  const { values, handleChange, errors, isValid, resetForm } = formValidation();
  const { name, email, password } = values;
  const { authErrorMessage, isDisabledForm } = useContext(AppContext);

  useEffect(() => {
    return () => {
      setAuthErrorMessage(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    isValid && register({ name, email, password });
    resetForm();
  };

  return (
    <div className="register">
      <Link to='/'>
        <div className="register__logo"></div>
      </Link>
        <p className="register__title">Добро пожаловать!</p>
        <form className="user-form" onSubmit={handleSubmit}>
          <fieldset className="user-form__fieldset">
            <label className="user-form__input-label">Имя
              <input
                className="user-form__input"
                onChange={handleChange}
                value={name || ''}
                minLength="2"
                maxLength="30"
                type="text"
                name="name"
                disabled={isDisabledForm}
                required
              />
            </label>
            <span className="user-form__input-error">{errors.name}</span>
          </fieldset>
          <fieldset className="user-form__fieldset">
            <label className="user-form__input-label">E-mail
              <input
                className="user-form__input"
                value={email || ''}
                onChange={handleChange}
                type="email"
                name="email"
                pattern="^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$"
                disabled={isDisabledForm}
                required
              />
            </label>
            <span className="user-form__input-error">{errors.email}</span>
          </fieldset>
          <fieldset className="user-form__fieldset">
            <label className="user-form__input-label">Пароль
              <input
                className="user-form__input"
                value={password || ''}
                onChange={handleChange}
                type="password"
                name="password"
                minLength="8"
                disabled={isDisabledForm}
                required
              />
            </label>
            <span className="user-form__input-error">{errors.password}</span>
            <span className="user-form__login-error">
              {authErrorMessage ? `Что пошло не так... ${authErrorMessage}` : ''}
            </span>
          </fieldset>
          <button
            className={`
          user-form__form-button 
          user-form__form-button_type_login 
          ${!isValid ? 'user-form__form-button_type_disabled' : ''} 
          transition-on-hover
          `}
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
