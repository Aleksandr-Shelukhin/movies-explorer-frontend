import React, { useState, useEffect } from 'react';

import FilterCheckBox from "../FilterCheckBox/FilterCheckBox";
import useFormValidation from '../../hooks/useFormValidation'

const SearchForm = ({ searchMovie, filterShortMovies }) => {
  const { values, handleChange, isValid, resetForm } = useFormValidation();
  const { name } = values;
  const [searchErrorMessage, setSearchErrorMessage] = useState(null);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid && name !== '') {
      searchMovie({
        movieName: name,
      });
      setSearchErrorMessage(null)
    } else {
      setSearchErrorMessage('Нужно ввести ключевое слово');
    }
  }
  useEffect(() => {
    return () => {
      setSearchErrorMessage(null)
      resetForm();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="search">
      <div className="container container_type_movie-page">
        <form
          className="search__form"
          name="search-form"
          onSubmit={handleSubmit}
        >
          <div className="search__wrapper">
            <input
              className="search__form-input"
              onChange={handleChange}
              value={name || ''}
              type="text"
              placeholder="Фильм"
              name="name"
              minLength="1"
              maxLength="100"
            />
            <button className="search__form-button transition-on-hover" type="submit"></button>
          </div>
          <span className="search__search-error">
            {searchErrorMessage ? `${searchErrorMessage}` : ''}
          </span>
        </form>
        <FilterCheckBox filterShortMovies={filterShortMovies}/>

        <hr className="search__line"/>
      </div>

    </div>
  );
};

export default SearchForm;
