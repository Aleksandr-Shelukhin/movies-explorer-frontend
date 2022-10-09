import React from 'react';
import aboutMeImage from "../../images/aboutme-photo.jpg";
import Portfolio from "../Portfolio/Portfolio";

const AboutMe = () => {
  return (
    <section className="about-me">
      <div className="container">
        <h2 className="section__title">Студент</h2>
        <hr className="section__line"/>
        <div className="about-me__wrapper">
          <div className="about-me__col">
            <p className="about-me__title">Александр</p>
            <p className="about-me__subtitle">Немолодой Фронтенд-разработчик</p>
            <p className="about-me__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aut cumque distinctio, ea eum excepturi explicabo, illum iure nostrum officia sit tempore. Accusantium incidunt ipsam minus molestias nemo provident suscipit. Architecto aut cumque distinctio, ea eum excepturi explicabo, illum iure nostrum officia sit tempore. Accusantium incidunt.</p>
            <a href="https://github.com/Aleksandr-Shelukhin" className="about-me__link transition-on-hover">Github</a>
          </div>
          <img src={aboutMeImage} alt="Фотография студента" className="about-me__image"/>
        </div>
        <Portfolio/>
      </div>
    </section>
  );
};

export default AboutMe;
