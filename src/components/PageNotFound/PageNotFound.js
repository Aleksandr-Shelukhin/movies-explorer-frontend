import React from 'react';
import { useHistory } from "react-router-dom";

const PageNotFound = () => {
  const history = useHistory();

  const handleButtonBackClick = () => {
    history.goBack();
  }
  return (
    <div className="not-found-page">
      <p className="not-found-page__title">404</p>
      <p className="not-found-page__subtitle">Страница не найдена</p>
      <button
        className="not-found-page__back-button transition-on-hover"
        onClick={handleButtonBackClick}>Назад</button>
    </div>
  );
};

export default PageNotFound;
