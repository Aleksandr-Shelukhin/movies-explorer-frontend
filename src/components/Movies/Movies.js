import React, { useEffect } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Movies = (
  {
    searchMovie,
    searchSavedMovies,
    saveMovie,
    deleteMovie,
    filterShortMovies,
    errorMessageMovies,
  }) => {

  useEffect(() => {
  return () => {
    errorMessageMovies(null);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <>
      <Header/>
      <main className="main">
        <SearchForm
          searchMovie={searchMovie}
          searchSavedMovies={searchSavedMovies}
          filterShortMovies={filterShortMovies}
        />
        <MoviesCardList
          saveMovie={saveMovie}
          deleteMovie={deleteMovie}
        />
      </main>
      <Footer/>
    </>
  );
};

export default Movies;
