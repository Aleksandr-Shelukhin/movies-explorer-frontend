import React, {useState} from 'react';
import { Route } from "react-router-dom";
import { useForm } from 'react-hook-form';

import FilterCheckBox from "../FilterCheckBox/FilterCheckBox";

const SearchForm = ({ searchMovieByQuery, submitSearchMovies, setSearchedMoviesArray }) => {

  const [allMoviesQuery, setAllMoviesQuery] = useState(localStorage.getItem('searchQueryMovies') || '');
  const [savedMoviesQuery, setSavedMoviesQuery] = useState('');

  //const [searchedMoviesArray, setSearchedMoviesArray] = useState(JSON.parse(localStorage.getItem('lastSearchedMovies')) || []);
  const [searchedSaveMoviesArray, setSearchedSaveMoviesArray] = useState(JSON.parse(localStorage.getItem('lastSearchedMovies')) || []);

  const [checked, setChecked] = useState(JSON.parse(localStorage.getItem('isChecked')) || false);
  const [checkedSaved, setCheckedSaved] = useState( false);

  const moviesCards = JSON.parse(localStorage.getItem('movies'))
  localStorage.setItem('isChecked', checked);
  localStorage.setItem('isCheckedSaved', checkedSaved);

  /*console.log(searchedMoviesArray)*/
  console.log(searchedSaveMoviesArray)

  const onTumblerMoviesUpdate = (data) => {
    setSearchedMoviesArray(data)
  }

  function filterShortMovies() {
    const initialMovies = JSON.parse(localStorage.getItem('movies'))
    const allMoviesQuery = localStorage.getItem('searchQueryMovies')
    const isChecked = !checked;
    setChecked(isChecked);
    console.log(isChecked)
    const renderMoviesArray = searchMovieByQuery(initialMovies, allMoviesQuery, isChecked);
    localStorage.setItem('lastSearchedMovies', JSON.stringify(renderMoviesArray))
    onTumblerMoviesUpdate(renderMoviesArray)
    console.log(renderMoviesArray)
  }

  function filterShortSaveMovies(data) {
    const isChecked = !checkedSaved;
    setCheckedSaved(isChecked);
    searchMovieByQuery(savedMoviesQuery, data.allSavedMoviesQuery, checkedSaved);
  }

 /* function submitSearchMovies(data) {

    setSearchedMoviesArray(searchMovieByQuery(moviesCards, data.allMoviesQuery, checked))
    console.log(moviesCards)
    console.log(data.allMoviesQuery)
    console.log(checked)
    localStorage.setItem('lastSearchedMovies', JSON.stringify(searchMovieByQuery(moviesCards, data.allMoviesQuery, checked)))
  }*/

  function submitSearchSaveMovies(data) {
    setSearchedSaveMoviesArray(searchMovieByQuery(savedMoviesQuery, data.allSavedMoviesQuery, checkedSaved));
    localStorage.setItem('lastSearchedSaveMovies', JSON.stringify(searchMovieByQuery(moviesCards, data.allMoviesQuery, checked)))
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

 /* const handleSubmitAllMovie = (data) => {
    searchMovieByQuery(data.allMoviesQuery);

  };

  const handleSubmitAllSavedMovie = (data) => {
    searchMovieByQuery(data.allSavedMoviesQuery);
  };*/



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
