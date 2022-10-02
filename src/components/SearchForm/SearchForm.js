import React from 'react';
import FilterCheckBox from "../FilterCheckBox/FilterCheckBox";

const SearchForm = () => {
  return (
    <section className="search">
      <div className="container_type_movie-page">
        <form className="search__form" name="search-form">
          <div className="search__wrapper">
            <input
              className="search__form-input"
              type="text"
              placeholder="Фильм"
              name="name"
              minLength="1"
              maxLength="100"
            />
            <button className="search__form-button transition-on-hover" type="submit"></button>
          </div>
          <span className="search__search-error"></span>
        </form>
        <FilterCheckBox/>

        <hr className="search__line"/>
      </div>

    </section>
  );
};

export default SearchForm;
