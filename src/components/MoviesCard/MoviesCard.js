import React from 'react';
import cardImage from '../../images/movies/pic__COLOR_pic.jpg'

const MoviesCard = () => {
  return (
    <div className="card">
      <img src={cardImage} alt="Постер" className="card__image"/>
      <div className="card__title-wrapper">
        <div className="card__title">33&nbsp;слова о&nbsp;дизайне</div>
        <button className="card__button transition-on-hover"></button>
      </div>
      <p className="card__duration">1ч42м</p>
    </div>
  );
};

export default MoviesCard;
