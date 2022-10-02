import React from 'react';
import promoImage from '../../images/hero-image.svg';

const Promo = () => {
  return (
    <section className="promo">
      <div className="container_type_promo">
        <div className="promo__wrapper">
          <div className="promo__col">
            <h1 className="promo__title">Учебный проект студента факультета <br/> Веб-разработки.</h1>
            <h1 className="promo__title_type_mobile">Учебный проект студента факультета Веб-разработки.</h1>
            <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и&nbsp;его создателя.</p>
            <a href="#aboutProject" className="promo__button transition-on-hover">Узнать больше</a>
          </div>
          <img src={promoImage} alt="" className="promo__image"/>
        </div>
      </div>
    </section>
  );
};

export default Promo;
