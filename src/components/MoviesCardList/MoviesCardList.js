import React, { useState, useEffect, useContext, useRef } from 'react';
import { useRouteMatch } from 'react-router-dom';

import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from '../Preloader/Preloader';
import useWindowWidth from "../../hooks/useWindowWidth";
import { AppContext } from '../../context/AppContext';

const MoviesCardList = ({ saveMovie, deleteMovie, deleteSavedMovie, savedMovies }) => {
  const moviesRoute = useRouteMatch({ path: '/movies', exact: false });
  const savedMoviesRoute = useRouteMatch({ path: '/saved-movies', exact: false });
  const {
    moviesCards,
    isCardsLoading,
    errorMessageMovies,
    errorMessageSavedMovies,} = useContext(AppContext);
  const width = useWindowWidth();

  const movies = useRef();
  if (savedMoviesRoute && savedMoviesRoute.path) {
    movies.current = savedMovies;
  } else {
    movies.current = moviesCards;
  }

  const [cards, setCards] = useState(0);
  const [moreCards, setMoreCards] = useState(0);

  useEffect(() => {
    function getCards() {
      if (width > 1280) {
        setCards(16);
        setMoreCards(4);
      } else if (width > 768 && width <= 1280) {
        setCards(12);
        setMoreCards(3);
      } else if (width > 480 && width <= 768) {
        setCards(8);
        setMoreCards(2);
      } else if (width <= 480) {
        setCards(5);
        setMoreCards(1);
      }
    }
    getCards();
  }, [width]);

  function getMoreCards() {
    setCards(cards + moreCards);
  }

  return (
    <div className="movies">
      <div className="container container_type_movie-page">
        <div className="movies__list-preloader">
          {errorMessageMovies && (
            <p className="movies__list-error-message">{errorMessageMovies}</p>
          )}
          {errorMessageSavedMovies && (
            <p className="movies__list-error-message">{errorMessageSavedMovies}</p>
          )}
          {isCardsLoading && <Preloader />}
        </div>
        <div className="movies__list">
          {moviesRoute && (
            <>
              {moviesCards.slice(0, cards).map((card) => (
                <MoviesCard
                  key={card.id}
                  card={card}
                  saveMovie={saveMovie}
                  deleteMovie={deleteMovie}
                />
              ))}
            </>
          )}
          {savedMoviesRoute && (
            <>
              {savedMovies.slice(0, cards).map((card) => (
                <MoviesCard
                  key={card._id}
                  card={card}
                  saveMovie={saveMovie}
                  deleteSavedMovie={deleteSavedMovie}
                />
              ))}
            </>
          )}

        </div>
        {movies.current.length >= cards && <button
          className={`movies__more-btn 
          ${moviesCards.length >= cards
              ? 'more-movies-card_type_active'
              : ''} transition-on-hover`}
          type="button"
          onClick={getMoreCards}
        >Ещё</button>}
      </div>
    </div>
  );
};

export default MoviesCardList;
