import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Movies = () => {
  return (
    <>
      <Header/>
      <main className="main">
        <SearchForm/>
        <MoviesCardList/>
      </main>
      <Footer/>
    </>
  );
};

export default Movies;
