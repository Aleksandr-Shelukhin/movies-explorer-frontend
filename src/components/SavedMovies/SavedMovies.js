import React, { useEffect } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const SavedMovies = (
  {
    savedMovies,
    deleteSavedMovie,
    errorMessageSavedMovies,
    loggedIn,
    searchMovieByQuery
  }) => {
  useEffect(() => {
    return () => {
      errorMessageSavedMovies(null);
     /* const lastSavedMovies = JSON.parse(localStorage.getItem('lastSaved'));
      setSavedMovies(lastSavedMovies);*/
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header loggedIn={loggedIn}/>
      <main className="main">
        <SearchForm searchMovieByQuery={searchMovieByQuery}/>

        <MoviesCardList
          deleteSavedMovie={deleteSavedMovie}
          savedMovies={savedMovies}/>
      </main>
      <Footer/>
    </>
  );
};

export default SavedMovies;
