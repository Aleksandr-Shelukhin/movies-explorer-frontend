import React from 'react';

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__links">
        <li className="portfolio__item">
          <a href="https://github.com/Aleksandr-Shelukhin/how-to-learn" target="_blank" rel="noopener noreferrer" className="portfolio__link transition-on-hover">Статичный сайт</a>
        </li>
        <li className="portfolio__item">
          <a href="https://aleksandr-shelukhin.github.io/russian-travel" target="_blank" rel="noopener noreferrer" className="portfolio__link transition-on-hover">Адаптивный сайт</a>
        </li>
        <li className="portfolio__item">
          <a href="https://alex.shelukhin.nomorepartiesxyz.ru/sign-in" target="_blank" rel="noopener noreferrer" className="portfolio__link transition-on-hover">Одностраничное приложение</a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
