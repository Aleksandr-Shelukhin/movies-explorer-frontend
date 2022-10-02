import React from 'react';

const Techs = () => {
  return (
    <section className="techs">
      <div className="container">
        <h2 className="section__title">Технологии</h2>
        <hr className="section__line"/>
        <div className="techs__info">
          <div className="techs__title">7&nbsp;технологий</div>
          <div className="techs__subtitle">На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили в&nbsp;дипломном проекте.</div>
          <ul className="techs__list">
            <li className="tech__item">HTML</li>
            <li className="tech__item">CSS</li>
            <li className="tech__item">JS</li>
            <li className="tech__item">React</li>
            <li className="tech__item">Git</li>
            <li className="tech__item">Express.js</li>
            <li className="tech__item">mongoDB</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Techs;
