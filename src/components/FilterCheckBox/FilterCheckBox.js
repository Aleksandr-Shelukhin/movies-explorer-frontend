import React from 'react';
import { Route } from "react-router-dom";

const FilterCheckBox = ({
        filterShortMovies,
        filterShortSaveMovies,
        checked,
        checkedSaved
      }) => {

  return (
    <>
      <Route path='/movies'>
        <div className="film-filter">
          <input checked={checked ?? false}
                 type="checkbox"
                 className="film-filter__checkbox"
                 id="filmFilter"
                 onChange={filterShortMovies}
          />
          <label className="film-filter__label" htmlFor="filmFilter">
            Короткометражки
          </label>
        </div>
      </Route>

      <Route path='/saved-movies'>
        <div className="film-filter">
          <input checked={checkedSaved ?? false}
                 type="checkbox"
                 className="film-filter__checkbox"
                 id="savedFilmFilter"
                 onChange={filterShortSaveMovies}
          />
          <label className="film-filter__label" htmlFor="savedFilmFilter">
            Короткометражки
          </label>
        </div>
      </Route>

    </>

  );
};

export default FilterCheckBox;
