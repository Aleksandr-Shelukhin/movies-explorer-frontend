import React, { useState } from 'react';
import { Link, Route, useRouteMatch } from "react-router-dom";
import MobileMenu from "../MobileMenu/MobileMenu";

const Header = ( props ) => {
  const { loggedIn } = props
  const [menuActive, setMenuActive] = useState(false)

  const isMovies = useRouteMatch({ path: '/movies', exact: false });
  const isSavedMovies = useRouteMatch({ path: '/saved-movies', exact: false });

  //const loggedIn = JSON.parse(window.localStorage.getItem('loggedIn'))

  return (
    <>
    <header className="header">
      <Link to='/'>
        <div className="header__logo"></div>
      </Link>
        <nav className={`header__nav ${!loggedIn ? 'header__nav_hidden' : ''}`}>
          <Route path={[ '/', '/movies', '/saved-movies', '/profile']}>
            <Link to='/movies' className={`header__link ${isMovies ? 'header__link_active' : ''} transition-on-hover`}>Фильмы</Link>
            <Link to='/saved-movies' className={`header__link ${isSavedMovies ? 'header__link_active' : ''} transition-on-hover`}>Сохранённые фильмы</Link>
          </Route>
        </nav>
        <div className="header__links">
          <Route exact path='/'>
            <Link to='/signup' className={`header__link header__link_type_signup ${loggedIn ? 'header__nav_hidden' : ''} transition-on-hover`}>Регистрация</Link>
            <Link to='/signin' className={`header__link header__link_type_signin ${loggedIn ? 'header__nav_hidden' : ''}  transition-on-hover`}>Войти</Link>
          </Route>
          <Route path={[ '/', '/movies', '/saved-movies', '/profile']}>
            <Link to='/profile' className={`header__link ${!loggedIn ? 'header__nav_hidden' : ''} header__link_type_profile transition-on-hover`}>Аккаунт</Link>
            <div
              className={`header__burger ${!loggedIn ? 'header__nav_hidden' : ''} transition-on-hover`}
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
