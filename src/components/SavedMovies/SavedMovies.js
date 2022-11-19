import React, {useEffect, useState} from 'react';
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

  const [searchedSaveMoviesArray, setSearchedSaveMoviesArray] = useState(JSON.parse(localStorage.getItem('lastSaved')) || []);

  const [emptyListError, setEmptyListError] = useState(false);

  const moviesCards = JSON.parse(localStorage.getItem('lastSaved'))

  const updateListError = (state) => {
    setEmptyListError(state)
  }

  function submitSearchSaveMovies(data) {
    const checked = JSON.parse(localStorage.getItem('isCheckedSaved'))
    const filterArray = searchMovieByQuery(moviesCards, data.allSavedMoviesQuery, checked)
    setSearchedSaveMoviesArray(filterArray)
    if(filterArray.length === 0) {
      updateListError(true)
    } else if (filterArray.length >= 1) {
      updateListError(false)
    }
  }

  useEffect(() => {
    return () => {
      errorMessageSavedMovies(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header loggedIn={loggedIn}/>
      <main className="main">
        <SearchForm
          updateListError={updateListError}
          setSearchedSaveMoviesArray={(data) => setSearchedSaveMoviesArray(data)}
          submitSearchSaveMovies={submitSearchSaveMovies}
          searchMovieByQuery={searchMovieByQuery}/>

        <MoviesCardList
          emptyListError={emptyListError}
          searchedSaveMoviesArray={searchedSaveMoviesArray}
          deleteSavedMovie={deleteSavedMovie}
          savedMovies={savedMovies}/>
      </main>
      <Footer/>
    </>
  );
};

export default SavedMovies;
