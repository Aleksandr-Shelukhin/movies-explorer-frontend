import React, {useState} from 'react';
import { Route } from "react-router-dom";
import { useForm } from 'react-hook-form';

import FilterCheckBox from "../FilterCheckBox/FilterCheckBox";

const SearchForm = (
  {
    searchMovieByQuery,
    submitSearchMovies,
    submitSearchSaveMovies,
    setSearchedMoviesArray,
    setSearchedSaveMoviesArray,
    updateListError,
    updateListErrorAllMovies,
  }) => {

  const [allMoviesQuery, setAllMoviesQuery] = useState(localStorage.getItem('searchQueryMovies') || '');
  const [savedMoviesQuery, setSavedMoviesQuery] = useState('');

  const [checked, setChecked] = useState(JSON.parse(localStorage.getItem('isChecked')) || false);
  const [checkedSaved, setCheckedSaved] = useState( false);

  localStorage.setItem('isChecked', checked);
  localStorage.setItem('isCheckedSaved', checkedSaved);

  const onTumblerMoviesUpdate = (data) => {
    setSearchedMoviesArray(data)
  }

  const onTumblerSaveMoviesUpdate = (data) => {
    setSearchedSaveMoviesArray(data)
  }

  function filterShortMovies() {
    const initialMovies = JSON.parse(localStorage.getItem('movies'))
    const allMoviesQuery = localStorage.getItem('searchQueryMovies')
    const isChecked = !checked;
    setChecked(isChecked);
    if(allMoviesQuery !== null) {
      const renderMoviesArray = searchMovieByQuery(initialMovies, allMoviesQuery, isChecked);
      localStorage.setItem('lastSearchedMovies', JSON.stringify(renderMoviesArray))
      onTumblerMoviesUpdate(renderMoviesArray)
      if(renderMoviesArray.length === 0) {
        updateListErrorAllMovies(true)
      } else if (renderMoviesArray.length >= 1) {
        updateListErrorAllMovies(false)
      }
    }
  }

  function filterShortSaveMovies() {
    const initialMovies = JSON.parse(localStorage.getItem('lastSaved'))
    const saveMoviesSaveQuery = localStorage.getItem('searchQuerySavedMovies')
    const isChecked = !checkedSaved;
    setCheckedSaved(isChecked);
    if(saveMoviesSaveQuery !== null) {
      const renderMoviesArray = searchMovieByQuery(initialMovies, saveMoviesSaveQuery, isChecked);
      //localStorage.setItem('lastSaved', JSON.stringify(renderMoviesArray))
      onTumblerSaveMoviesUpdate(renderMoviesArray)
      if(renderMoviesArray.length === 0) {
        updateListError(true)
      } else if (renderMoviesArray.length >= 1) {
        updateListError(false)
      }
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: { allMoviesQuery: allMoviesQuery },
  });

  const {
    register: registerSavedMoviesForm,
    handleSubmit: handleSubmitSavedMoviesForm,
    formState: { errors: errorsSavedMoviesForm },
  } = useForm({
    mode: 'onChange',
    defaultValues: { allSavedMoviesQuery: savedMoviesQuery },
  });

  const moviesInput = (evt) => {
    setAllMoviesQuery(localStorage.setItem('searchQueryMovies', evt.target.value));
  };

  const savedMoviesInput = (evt) => {
    setSavedMoviesQuery(localStorage.setItem('searchQuerySavedMovies', evt.target.value));
  };

  return (
    <>
    <Route path='/movies'>
      <div className="search">
        <div className="container container_type_movie-page">
          <form
            key={1}
            onSubmit={handleSubmit(submitSearchMovies)}
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
          <FilterCheckBox
            filterShortMovies={filterShortMovies}
            checked={checked}/>
          <hr className="search__line"/>
        </div>
      </div>
    </Route>

  <Route path='/saved-movies'>
    <div className="search">
      <div className="container container_type_movie-page">
        <form
          key={2}
          onSubmit={handleSubmitSavedMoviesForm(submitSearchSaveMovies)}
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
        <FilterCheckBox
          filterShortSaveMovies={filterShortSaveMovies}
          checkedSaved={checkedSaved}/>
        <hr className="search__line"/>
      </div>
    </div>
  </Route>
    </>
  );
};

export default SearchForm;
