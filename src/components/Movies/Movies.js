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

  const [emptyListErrorAllMovies, setEmptyListErrorAllMovies] = useState(false);

  const updateListErrorAllMovies = (state) => {
    setEmptyListErrorAllMovies(state)
  }
  const moviesCards = JSON.parse(localStorage.getItem('movies'))

  function submitSearchMovies(data) {
    const checked = JSON.parse(localStorage.getItem('isChecked'))
    const filterArray = searchMovieByQuery(moviesCards, data.allMoviesQuery, checked)
    setSearchedMoviesArray(filterArray)
    localStorage.setItem('lastSearchedMovies', JSON.stringify(searchMovieByQuery(moviesCards, data.allMoviesQuery, checked)))
    if(filterArray.length === 0) {
      updateListErrorAllMovies(true)
    } else if (filterArray.length >= 1) {
      updateListErrorAllMovies(false)
    }
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
          updateListErrorAllMovies={updateListErrorAllMovies}
          setSearchedMoviesArray={(data) => setSearchedMoviesArray(data)}
          submitSearchMovies={submitSearchMovies}
          searchMovieByQuery={searchMovieByQuery}/>

        <MoviesCardList
          emptyListErrorAllMovies={emptyListErrorAllMovies}
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
