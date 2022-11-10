import React, { useState } from 'react';
import { Route } from "react-router-dom";

const FilterCheckBox = ({ filterShortMovies}) => {

  const [checked, setChecked] = useState(JSON.parse(localStorage.getItem('isChecked')) || false);
  const [checkedSaved, setCheckedSaved] = useState(JSON.parse(localStorage.getItem('isCheckedSaved')) || false);

  /*useEffect(() => {
    const localChecked = JSON.parse(localStorage.getItem('isChecked'));// Поместить в стейт
    setChecked(localChecked);
    if (localChecked) {
      filterShortMovies(localChecked)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setChecked]);*/

  function handleFilterShortMovies() {
    filterShortMovies(!checked);//отследить что летит в функцию filterShortMovies
    localStorage.setItem('isChecked', JSON.stringify(!checked));
    setChecked(prev => !prev)
    //const element = document.querySelector('input[type=checkbox]');
    //const localChecked = JSON.parse(localStorage.getItem('isChecked'));
    /*element.checked = localChecked ?? false;
    const isChecked = element.checked;*/

  }

  function handleFilterShortSavedMovies() {
    filterShortMovies(!checkedSaved);//отследить что летит в функцию filterShortMovies
    localStorage.setItem('isCheckedSaved', JSON.stringify(!checkedSaved));
    setCheckedSaved(prev => !prev)
    //const element = document.querySelector('input[type=checkbox]');
    //const localChecked = JSON.parse(localStorage.getItem('isChecked'));
    /*element.checked = localChecked ?? false;
    const isChecked = element.checked;*/

  }

  return (
    <>
      <Route path='/movies'>
        <div className="film-filter">
          <input checked={checked ?? false}
                 type="checkbox"
                 className="film-filter__checkbox"
                 id="filmFilter"
                 onChange={handleFilterShortMovies}
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
                 onChange={handleFilterShortSavedMovies}
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
