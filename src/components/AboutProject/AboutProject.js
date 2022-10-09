import React from 'react';

const aboutProject = () => {
  return (
    <section id="aboutProject" className="about-project">
      <div className="container">
        <h2 className="section__title">О&nbsp;проекте</h2>
        <hr className="section__line"/>
        <div className="about-project__stages">
          <div className="about-project__stage">
            <h3 className="about-project__stage-title">Дипломный проект включал 5&nbsp;этапов</h3>
            <p className="about-project__stage-description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.</p>
          </div>
          <div className="about-project__stage">
            <h3 className="about-project__stage-title">На&nbsp;выполнение диплома ушло 5&nbsp;недель</h3>
            <p className="about-project__stage-description">У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <div className="about-project__limits">
          <div className="about-project__limit">
            <p className="about-project__limit-title">1&nbsp;неделя</p>
            <p className="about-project__limit-title">4&nbsp;недели</p>
          </div>
          <div className="about-project__limit">
            <p className="about-project__limit-description">Back-end</p>
            <p className="about-project__limit-description">Front-end</p>
          </div>
        </div>
      </div>

    </section>
  );
};

export default aboutProject;
