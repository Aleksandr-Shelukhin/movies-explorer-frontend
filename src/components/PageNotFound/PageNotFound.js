import React from 'react';
import {Link} from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="not-found-page">
      <p className="not-found-page__title">404</p>
      <p className="not-found-page__subtitle">Страница не найдена</p>
      <Link to="/" className="not-found-page__back-button transition-on-hover">Назад</Link>
    </div>
  );
};

export default PageNotFound;
