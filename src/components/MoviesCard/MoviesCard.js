import React from 'react';
import { useRouteMatch } from "react-router-dom";

import { moviesApiBaseUrl } from "../../utils/BaseUrls";
import { AppContext } from "../../context/AppContext";
import { setTimeFromMinutes } from '../../utils/convertDuration';

const MoviesCard = ({ card, saveMovie, deleteMovie, deleteSavedMovie }) => {
  const moviesRoute = useRouteMatch({ path: '/movies', exact: false });
  const savedMoviesRoute = useRouteMatch({ path: '/saved-movies', exact: false });
  const { savedMovies } = React.useContext(AppContext);

  const isSavedMovies = savedMovies.some((item) => item.movieId === card.id);

  const movieImage = savedMoviesRoute ? card.image : `${moviesApiBaseUrl}${card.image.url}`;
  const movieTrailer = savedMoviesRoute ? card.trailer : card.trailerLink;

  function handleSaveMovie() {
    if (isSavedMovies) {
      deleteMovie(card);
    } else {
      saveMovie(card);
    }
  }

  function handleDeleteMovie() {
    deleteSavedMovie(card);
  }

  return (
    <div className="card">
      <a href={movieTrailer}
         target="_blank"
         rel="noreferrer"
         className="card__trailer-link">
        <img src={movieImage} alt={card.nameRU} className="card__image"/>
        <div className="card__title-wrapper">
          <div className="card__title">{card.nameRU}</div>
          {moviesRoute && (
            <button
              onClick={handleSaveMovie}
              type="button"
              className={`card__button ${isSavedMovies ? 'card__button_type_active' : ''} transition-on-hover`}></button>
          )}
          {savedMoviesRoute && (
            <button
              onClick={handleDeleteMovie}
              className="card__button card__button_type_delete transition-on-hover"
              type="button"></button>
          )}
          <button type="button" className="card__button card__button_type_delete transition-on-hover"></button>
        </div>
        <p className="card__duration">{setTimeFromMinutes(card.duration)}</p>
      </a>

    </div>
  );
};

export default MoviesCard;
