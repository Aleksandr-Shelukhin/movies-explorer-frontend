import React, { useState } from 'react';
import { Route } from "react-router-dom";
import { useForm } from 'react-hook-form';

import FilterCheckBox from "../FilterCheckBox/FilterCheckBox";

const SearchForm = ({ searchMovie, searchSavedMovie, filterShortMovies }) => {

  const [allMovies, setAllMovies] = useState(localStorage.getItem('searchQueryMovies') || '');
  const [savedMovies, setSavedMovies] = useState(localStorage.getItem('searchQuerySavedMovies') || '');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: { allMoviesQuery: allMovies },
  });

  const {
    register: registerSavedMoviesForm,
    handleSubmit: handleSubmitSavedMoviesForm,
    formState: { errors: errorsSavedMoviesForm },
  } = useForm({
    mode: 'onChange',
    defaultValues: { allSavedMoviesQuery: savedMovies },
  });

  const moviesInput = (evt) => {
    setAllMovies(localStorage.setItem('searchQueryMovies', evt.target.value));
  };

  const savedMoviesInput = (evt) => {
    setSavedMovies(localStorage.setItem('searchQuerySavedMovies', evt.target.value));
  };

  const handleSubmitAllMovie = (data) => {
    searchMovie(data.allMoviesQuery);

  };

  const handleSubmitAllSavedMovie = (data) => {
    searchSavedMovie(data.allSavedMoviesQuery);
  };

  return (
    <>
    <Route path='/movies'>
      <div className="search">
        <div className="container container_type_movie-page">
          <form
            key={1}
            onSubmit={handleSubmit(handleSubmitAllMovie)}
            className="search__form"
            id='all-movies'
          >
            <div className="search__wrapper">
              <input
                {...register('allMoviesQuery', {
                  required: 'Ввести название фильма обязательно',
                })}
                className="search__form-input"
                placeholder='Фильм'
                onInput={moviesInput}
              />
              <button
                className="search__form-button transition-on-hover"
                type="submit"
                form='all-movies'>
              </button>
            </div>
            <span className="search__search-error">
              {errors?.allMoviesQuery?.message}
            </span>
          </form>
          <FilterCheckBox filterShortMovies={filterShortMovies}/>
          <hr className="search__line"/>
        </div>
      </div>
    </Route>

  <Route path='/saved-movies'>
    <div className="search">
      <div className="container container_type_movie-page">
        <form
          key={2}
          onSubmit={handleSubmitSavedMoviesForm(handleSubmitAllSavedMovie)}
          className="search__form"
          id='all-saved-movies'
        >
          <div className="search__wrapper">
            <input
              {...registerSavedMoviesForm('allSavedMoviesQuery', {
                required: 'Ввести название фильма обязательно',
              })}
              className="search__form-input"
              placeholder='Фильм'
              onInput={savedMoviesInput}
            />
            <button
              className="search__form-button transition-on-hover"
              type="submit"
              form='all-saved-movies'>
            </button>
          </div>
          <span className="search__search-error">
              {errorsSavedMoviesForm?.allSavedMoviesQuery?.message}
            </span>
        </form>
        <FilterCheckBox filterShortMovies={filterShortMovies}/>
        <hr className="search__line"/>
      </div>
    </div>
  </Route>
    </>
  );
};

export default SearchForm;
