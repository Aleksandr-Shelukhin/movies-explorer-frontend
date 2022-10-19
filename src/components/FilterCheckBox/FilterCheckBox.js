import React from 'react';

const FilterCheckBox = (onFilterShortMovies) => {
  function handleFilterShortMovies() {
    const element = document.querySelector('input[type=checkbox]');
    const isChecked = element.checked;
    onFilterShortMovies(isChecked);
  }

  return (
    <div className="film-filter">
      <input
        type="checkbox"
        className="film-filter__checkbox"
        id="filmFilter"
        onClick={handleFilterShortMovies}
      />
      <label className="film-filter__label" htmlFor="filmFilter">
        Короткометражки
      </label>
    </div>
  );
};

export default FilterCheckBox;
