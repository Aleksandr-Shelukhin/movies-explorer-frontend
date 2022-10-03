import React from 'react';
import MoviesCard from "../MoviesCard/MoviesCard";
import cardImage1 from "../../images/movies/pic__COLOR_pic-1.jpg";
import cardImage2 from "../../images/movies/pic__COLOR_pic-2.jpg";
import cardImage3 from "../../images/movies/pic__COLOR_pic-3.jpg";
import cardImage4 from "../../images/movies/pic__COLOR_pic-4.jpg";
import cardImage5 from "../../images/movies/pic__COLOR_pic-5.jpg";
import cardImage6 from "../../images/movies/pic__COLOR_pic-6.jpg";
import cardImage7 from "../../images/movies/pic__COLOR_pic-7.jpg";
import cardImage8 from "../../images/movies/pic__COLOR_pic-8.jpg";
import cardImage9 from "../../images/movies/pic__COLOR_pic-9.jpg";
import cardImage10 from "../../images/movies/pic__COLOR_pic-10.jpg";
import cardImage11 from "../../images/movies/pic__COLOR_pic-11.jpg";
import cardImage12 from "../../images/movies/pic__COLOR_pic-13.jpg";

const MoviesCardList = () => {
  return (
    <div className="movies">
      <div className="container container_type_movie-page">
        <div className="movies__list">
          <MoviesCard/>

        {/* Default cards START */}

          <div className="card">
            <img src={cardImage3} alt="Постер" className="card__image"/>
            <div className="card__title-wrapper">
              <div className="card__title">33&nbsp;слова о&nbsp;дизайне</div>
              <button className="card__button transition-on-hover"></button>
            </div>
            <p className="card__duration">1ч42м</p>
          </div>

          <div className="card">
            <img src={cardImage1} alt="Постер" className="card__image"/>
            <div className="card__title-wrapper">
              <div className="card__title">33&nbsp;слова о&nbsp;дизайне</div>
              <button className="card__button card__button_type_active transition-on-hover"></button>
            </div>
            <p className="card__duration">1ч42м</p>
          </div>

          <div className="card">
            <img src={cardImage2} alt="Постер" className="card__image"/>
            <div className="card__title-wrapper">
              <div className="card__title">33&nbsp;слова о&nbsp;дизайне</div>
              <button className="card__button transition-on-hover"></button>
            </div>
            <p className="card__duration">1ч42м</p>
          </div>
        {/* Default cards END */}
          <MoviesCard/>

        {/* Default cards START */}

          <div className="card">
            <img src={cardImage4} alt="Постер" className="card__image"/>
            <div className="card__title-wrapper">
              <div className="card__title">33&nbsp;слова о&nbsp;дизайне</div>
              <button className="card__button transition-on-hover"></button>
            </div>
            <p className="card__duration">1ч42м</p>
          </div>

          <div className="card">
            <img src={cardImage5} alt="Постер" className="card__image"/>
            <div className="card__title-wrapper">
              <div className="card__title">Пи&nbsp;Джей Харви: A&nbsp;dog called money</div>
              <button className="card__button transition-on-hover"></button>
            </div>
            <p className="card__duration">1ч42м</p>
          </div>

          <div className="card">
            <img src={cardImage6} alt="Постер" className="card__image"/>
            <div className="card__title-wrapper">
              <div className="card__title">33&nbsp;слова о&nbsp;дизайне</div>
              <button className="card__button transition-on-hover"></button>
            </div>
            <p className="card__duration">1ч42м</p>
          </div>
        {/* Default cards END */}
          <MoviesCard/>

        {/* Default cards START */}

          <div className="card">
            <img src={cardImage7} alt="Постер" className="card__image"/>
            <div className="card__title-wrapper">
              <div className="card__title">Если будет очень длинный заголовок у фильма, то после двух строй будет многоточие</div>
              <button className="card__button transition-on-hover"></button>
            </div>
            <p className="card__duration">1ч42м</p>
          </div>

          <div className="card">
            <img src={cardImage8} alt="Постер" className="card__image"/>
            <div className="card__title-wrapper">
              <div className="card__title">33&nbsp;слова о&nbsp;дизайне</div>
              <button className="card__button card__button_type_active transition-on-hover"></button>
            </div>
            <p className="card__duration">1ч42м</p>
          </div>

          <div className="card">
            <img src={cardImage9} alt="Постер" className="card__image"/>
            <div className="card__title-wrapper">
              <div className="card__title">33&nbsp;слова о&nbsp;дизайне</div>
              <button className="card__button transition-on-hover"></button>
            </div>
            <p className="card__duration">1ч42м</p>
          </div>
        {/* Default cards END */}
          <MoviesCard/>

        {/* Default cards START */}

          <div className="card">
            <img src={cardImage10} alt="Постер" className="card__image"/>
            <div className="card__title-wrapper">
              <div className="card__title">33&nbsp;слова о&nbsp;дизайне</div>
              <button className="card__button transition-on-hover"></button>
            </div>
            <p className="card__duration">1ч42м</p>
          </div>

          <div className="card">
            <img src={cardImage11} alt="Постер" className="card__image"/>
            <div className="card__title-wrapper">
              <div className="card__title">33&nbsp;слова о&nbsp;дизайне</div>
              <button className="card__button transition-on-hover"></button>
            </div>
            <p className="card__duration">1ч42м</p>
          </div>

          <div className="card">
            <img src={cardImage12} alt="Постер" className="card__image"/>
            <div className="card__title-wrapper">
              <div className="card__title">По&nbsp;волнам: Искусство звука в&nbsp;кино</div>
              <button className="card__button card__button_type_active transition-on-hover"></button>
            </div>
            <p className="card__duration">1ч42м</p>
          </div>
        {/* Default cards END */}

        </div>
        <button className="movies__more-btn transition-on-hover" type="button">Ещё</button>
      </div>
    </div>
  );
};

export default MoviesCardList;
