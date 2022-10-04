import React, { useState } from 'react';
import {Link, Route} from "react-router-dom";
import MobileMenu from "../MobileMenu/MobileMenu";

const Header = () => {
  const [menuActive, setMenuActive] = useState(false)
  return (
    <>
    <header className="header">
      <Link to='/'>
        <div className="header__logo"></div>
      </Link>
        <nav className="header__nav">
          <Route path={['/movies', '/saved-movies', '/profile']}>
            <Link to='/movies' className="header__link header__link_active transition-on-hover">Фильмы</Link>
            <Link to='/saved-movies' className="header__link transition-on-hover">Сохранённые фильмы</Link>
          </Route>
        </nav>
        <div className="header__links">
          <Route exact path='/'>
            <Link to='/signup' className="header__link header__link_type_signup transition-on-hover">Регистрация</Link>
            <Link to='/signin' className="header__link header__link_type_signin transition-on-hover">Войти</Link>
          </Route>
          <Route path={['/movies', '/saved-movies', '/profile']}>
            <Link to='/profile' className="header__link header__link_type_profile transition-on-hover">Аккаунт</Link>
            <div
              className="header__burger transition-on-hover"
              onClick={() => setMenuActive(!menuActive)}
            >
              <div className="header__burger-line"></div>
            </div>
          </Route>
        </div>
    </header>
    <MobileMenu
      menuActive={menuActive}
      setMenuActive={setMenuActive}
    />
    </>
  );
};

export default Header;
