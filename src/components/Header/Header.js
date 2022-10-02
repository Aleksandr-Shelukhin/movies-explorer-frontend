import React from 'react';
import {Link, Route} from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <Link to='/'>
        <div className="header__logo"></div>
      </Link>
        <nav className="header__nav">
          <Route path='/movie'>
            <Link to='/movies' className="header__link header__link_active transition-on-hover">Фильмы</Link>
            <Link to='/saved-movies' className="header__link transition-on-hover">Сохранённые фильмы</Link>
          </Route>
        </nav>
        <div className="header__links">
          <Route exact path='/'>
            <Link to='/signup' className="header__link header__link_type_signup transition-on-hover">Регистрация</Link>
            <Link to='/signin' className="header__link header__link_type_signin transition-on-hover">Войти</Link>
          </Route>
          <Route path='/movie'>
            <Link to='/profile' className="header__link header__link_type_profile transition-on-hover">Аккаунт</Link>
            <div className="header__burger transition-on-hover">
              <div className="header__burger-line"></div>
            </div>
          </Route>
        </div>
    </header>
  );
};

export default Header;
