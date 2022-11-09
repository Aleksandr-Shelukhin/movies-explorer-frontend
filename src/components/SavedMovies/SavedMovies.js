import React, { useEffect } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const SavedMovies = (
  {
    setSavedMovies,
    searchMovie,
    searchSavedMovie,
    deleteSavedMovie,
    filterShortMovies,
    errorMessageSavedMovies,
  }) => {
  useEffect(() => {
    return () => {
      errorMessageSavedMovies(null);
      const lastSavedMovies = JSON.parse(localStorage.getItem('lastSaved'));
      setSavedMovies(lastSavedMovies);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header/>
      <main className="main">
        <SearchForm
          searchMovie={searchMovie}
          searchSavedMovie={searchSavedMovie}
          filterShortMovies={filterShortMovies} />
        <MoviesCardList deleteSavedMovie={deleteSavedMovie} />
      </main>
      <Footer/>
    </>
  );
};

export default SavedMovies;
