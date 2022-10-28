import React, {useEffect, useState} from 'react';

const FilterCheckBox = ({ filterShortMovies}) => {

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const localChecked = JSON.parse(localStorage.getItem('isChecked'));
    setChecked(localChecked);
    if (localChecked) {
      filterShortMovies(localChecked)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setChecked]);

  function handleFilterShortMovies() {
    filterShortMovies(!checked);
    localStorage.setItem('isChecked', JSON.stringify(!checked));
    setChecked(prev => !prev)
    //const element = document.querySelector('input[type=checkbox]');
    //const localChecked = JSON.parse(localStorage.getItem('isChecked'));
    /*element.checked = localChecked ?? false;
    const isChecked = element.checked;*/

  }

  return (
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
  );
};

export default FilterCheckBox;
