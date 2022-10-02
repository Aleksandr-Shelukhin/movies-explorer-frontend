import React from 'react';
import {Link} from "react-router-dom";

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__links">
        <li className="portfolio__item">
          <Link to="#" className="portfolio__link transition-on-hover">Статичный сайт</Link>
        </li>
        <li className="portfolio__item">
          <Link to="#" className="portfolio__link transition-on-hover">Адаптивный сайт</Link>
        </li>
        <li className="portfolio__item">
          <Link to="#" className="portfolio__link transition-on-hover">Одностраничное приложение</Link>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
