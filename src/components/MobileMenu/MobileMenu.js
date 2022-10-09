import React from 'react';
import {Link} from "react-router-dom";

const MobileMenu = ({ menuActive, setMenuActive }) => {
  return (
    <div className={ menuActive ? "mobile-menu mobile-menu_active" : "mobile-menu"}>
      <nav className="mobile-menu__nav">
        <Link to="/" className="mobile-menu__link transition-on-hover">Главная</Link>
        <Link to="/movies" className="mobile-menu__link mobile-menu__link_active transition-on-hover">Фильмы</Link>
        <Link to="/saved-movies" className="mobile-menu__link transition-on-hover">Сохранённые фильмы</Link>
      </nav>
      <Link to="/" className="mobile-menu__link-profile transition-on-hover">Аккаунт</Link>
      <div
        className="mobile-menu__close-button transition-on-hover"
        onClick={() => setMenuActive(!menuActive)}
      />
     </div>
  );
};

export default MobileMenu;
