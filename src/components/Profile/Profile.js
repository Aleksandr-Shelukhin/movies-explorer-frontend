import React, { useState, useEffect, useContext } from 'react';

import useFormValidation from '../../hooks/useFormValidation'
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { AppContext } from "../../context/AppContext";
import Header from "../Header/Header";

const Profile = ({ updateUser, signOut, setUpdateMessage, setUpdateErrorMessage }) => {
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormValidation();
  const { name, email } = values;
  const [buttonValid, setButtonValid] = useState(true);
  const currentUser = useContext(CurrentUserContext);
  const { updateMessage, updateErrorMessage, isDisabledForm } = useContext(AppContext);

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    isValid &&
    updateUser({ name, email }, () => {
      setValues({});
    });
  }

  useEffect(() => {
    if (isValid && (name !== currentUser.name || email !== currentUser.email)) {
      setButtonValid(true);
    } else {
      setButtonValid(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  useEffect(() => {
    return () => {
      setUpdateMessage(null)
      setUpdateErrorMessage(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
    <Header/>
    <div className="profile">
      <p className="profile__title">Привет, {currentUser.name}</p>
      <form className="profile__form" onSubmit={handleSubmit}>
          <fieldset className="profile__fieldset">
            <label className="profile__input-label">Имя
              <input
                className="profile__input"
                onChange={handleChange}
                value={name || ''}
                minLength="2"
                maxLength="30"
                type="text"
                name="name"
                placeholder="Введите имя"
                disabled={isDisabledForm}
                required
              />
            </label>
            <span className="profile__input-error">{errors.name}</span>
          </fieldset>
          <hr className="profile__form-line"/>
          <fieldset className="profile__fieldset">
            <label className="profile__input-label">E-mail
              <input
                className="profile__input"
                value={email || ''}
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="Введите e-mail"
                pattern="^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$"
                disabled={isDisabledForm}
                required
              />
            </label>
            <span className="profile__input-error">{errors.email}</span>
            <span className="user-form__login-error">
                {updateMessage ? `${updateMessage}` : '' || updateErrorMessage ? `Что пошло не так... ${updateErrorMessage}` : ''}
              </span>
          </fieldset>
          <button
            className={`
            profile__form-button
            ${!buttonValid ? 'profile__form-button_type_disabled' : ''}
            transition-on-hover`}
            type="submit">
            Редактировать
          </button>
        </form>
        <p
          className="profile__sign-out-button transition-on-hover" onClick={signOut}>
          Выйти из&nbsp;аккаунта
        </p>
      </div>
    </>
  );
};

export default Profile;
