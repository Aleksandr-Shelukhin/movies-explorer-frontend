import React from 'react';

const Footer = () => {
  return (
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
  );
};

export default Footer;
