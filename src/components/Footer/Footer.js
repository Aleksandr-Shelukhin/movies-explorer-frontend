import React from 'react';
import {Route} from "react-router-dom";

const Footer = () => {
  return (
    <Route path={['/', '/movies', '/saved-movies']}>
      <footer className="footer">
        <p className="footer__description">Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.</p>
        <div className="footer__wrapper">
          <p className="footer__copyright">&copy;&nbsp;2022</p>
          <div className="footer__links">
            <a href="https://practicum.yandex.ru" className="footer__link transition-on-hover">Яндекс.Практикум</a>
            <a href="https://github.com/Aleksandr-Shelukhin" className="footer__link transition-on-hover">Github</a>
          </div>
        </div>
      </footer>
    </Route>
  );
};

export default Footer;
