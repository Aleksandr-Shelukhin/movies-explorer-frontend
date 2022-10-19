import React from 'react';
import {Link} from "react-router-dom";

import formValidation from '../../hooks/formValidation'
import { AppContext } from "../../context/AppContext";

const Login = ({ handleLogin, setAuthErrorMessage }) => {
  const { values, handleChange, errors, isValid, resetForm } = formValidation();
  const { email, password } = values;
  const { authErrorMessage, isDisabledForm } = React.useContext(AppContext);

  React.useEffect(() => {
    return () => {
      setAuthErrorMessage(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    isValid && handleLogin({ email, password });
    resetForm();
  };

  return (
    <div className="login">
      <Link to='/'>
        <div className="register__logo"></div>
      </Link>
      <p className="login__title">Рады видеть!</p>
      <form className="user-form" onSubmit={handleSubmit}>
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
