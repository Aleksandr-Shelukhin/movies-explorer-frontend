import React from 'react';

const FilterCheckBox = () => {
  return (
    <div className="film-filter">
      <input
        type="checkbox"
        className="film-filter__checkbox"
        id="filmFilter"
      />
      <label className="film-filter__label" htmlFor="filmFilter">
        Короткометражки
      </label>
    </div>
  );
};

export default FilterCheckBox;
