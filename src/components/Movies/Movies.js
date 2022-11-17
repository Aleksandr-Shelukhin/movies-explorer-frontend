import React, {useEffect, useState} from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


const Movies = (
  {
    saveMovie,
    deleteMovie,
    errorMessageMovies,
    loggedIn,
    searchMovieByQuery
  }) => {

  const [searchedMoviesArray, setSearchedMoviesArray] = useState(JSON.parse(localStorage.getItem('lastSearchedMovies')) || []);

  const moviesCards = JSON.parse(localStorage.getItem('movies'))

  function submitSearchMovies(data) {
    const checked = JSON.parse(localStorage.getItem('isChecked'))
    setSearchedMoviesArray(searchMovieByQuery(moviesCards, data.allMoviesQuery, checked))
    localStorage.setItem('lastSearchedMovies', JSON.stringify(searchMovieByQuery(moviesCards, data.allMoviesQuery, checked)))
  }

  useEffect(() => {
  return () => {
    errorMessageMovies(null);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <>
      <Header loggedIn={loggedIn}/>
      <main className="main">
        <SearchForm
          setSearchedMoviesArray={(data) => setSearchedMoviesArray(data)}
          submitSearchMovies={submitSearchMovies}
          searchMovieByQuery={searchMovieByQuery}/>
        <MoviesCardList
          searchedMoviesArray={searchedMoviesArray}
          saveMovie={saveMovie}
          deleteMovie={deleteMovie}
        />
      </main>
      <Footer/>
    </>
  );
};

export default Movies;
