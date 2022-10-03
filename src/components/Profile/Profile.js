import React from 'react';

const Profile = () => {
  return (
    <div className="profile">
      <p className="profile__title">Привет, Александр!</p>
      <form className="profile__form">
          <fieldset className="profile__fieldset">
            <label className="profile__input-label">Имя
              <input
                className="profile__input"
                type="text"
                placeholder="Введите имя"
                name="name"
                required
              />
            </label>
            <span className="profile__input-error"></span>
          </fieldset>
          <hr className="profile__form-line"/>
          <fieldset className="profile__fieldset">
            <label className="profile__input-label">E-mail
              <input
                className="profile__input"
                type="email"
                placeholder="Введите e-mail"
                name="email"
                required
              />
            </label>
            <span className="profile__input-error">Неверный email</span>
          </fieldset>
          <button
            className="profile__form-button transition-on-hover"
            type="submit">
            Редактировать
          </button>
        </form>
        <button
          className="profile__sign-out-button transition-on-hover"
          type="submit">
          Выйти из&nbsp;аккаунта
        </button>

      </div>
  );
};

export default Profile;
