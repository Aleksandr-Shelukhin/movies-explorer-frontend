import React, { useState, useEffect } from 'react';
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"

import {CurrentUserContext} from "../../context/CurrentUserContext";
import {AppContext} from "../../context/AppContext";
import {moviesApi} from '../../utils/MoviesApi';

import Main from "../Main/Main";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import PageNotFound from "../PageNotFound/PageNotFound";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import * as mainApi from '../../utils/MainApi';
import * as auth from '../../utils/Auth';

const App = () => {
  const [moviesCards, setMoviesCards] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isCardsLoading, setIsCardsLoading] = useState(false);
  const [errorMessageMovies, setErrorMessageMovies] = useState(null);
  const [errorMessageSavedMovies, setErrorMessageSavedMovies] = useState(null);
  const [authErrorMessage, setAuthErrorMessage] = useState(null);
  const [updateMessage, setUpdateMessage] = useState(null);
  const [updateErrorMessage, setUpdateErrorMessage] = useState(null);
  const [isDisabledForm, setIsDisabledForm] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();

  useEffect(() => {
    localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
  })

  useEffect(() => {
    if (loggedIn) {
      setIsCardsLoading(true);
      moviesApi
        .getMoviesInfo()
        .then((movies) => {
          localStorage.setItem('lastSearch', JSON.stringify(movies));
        })
        .catch((error) => {
          setErrorMessageMovies('на сервере произошла ошибка, попробуйте повторить запрос');
          console.log(error);
        })
        .finally(() => setIsCardsLoading(false));
    }
  }, [loggedIn]);

  useEffect(() => {
    checkToken();
    if (loggedIn) {
      history.push('/movies');
      Promise.all([mainApi.getUserInfo(), mainApi.getMoviesInfo()])
        .then(([user, data]) => {
          setCurrentUser(user);
          setSavedMovies(data);
          localStorage.setItem('lastSaved', JSON.stringify(data));
        })
        .catch((error) => {
          handleLogout();
          console.log(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setLoggedIn(true);
    }
  }

  function handleLogin({ email, password }) {
    setIsDisabledForm(true);
    auth
      .signin(email, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        checkToken();
      })
      .catch((error) => {
        setAuthErrorMessage(error);
        console.log(error);
      })
      .finally(() => setIsDisabledForm(false));
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('lastSearchMovies');
    localStorage.removeItem('lastSavedMovies');
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
    setMoviesCards([]);
    setSavedMovies([]);
    setCurrentUser({});
    history.push('/');
  }

  function handleSearchMovie(movie) {
    setIsCardsLoading(true);
    setErrorMessageMovies(null);
    setMoviesCards([]);
    setIsCardsLoading(true);
    const lastSearchMovies = JSON.parse(localStorage.getItem('lastSearch'));
    if (lastSearchMovies) {
      const searchMovies = lastSearchMovies.filter((item) => {
        const nameEN = item.nameEN ? item.nameEN : item.nameRU;
        const movieNameEN = nameEN.toLowerCase();
        const movieNameRU = item.nameRU.toLowerCase();
        const searchMovieName = movie.movieName.toLowerCase();
        return movieNameRU.includes(searchMovieName) || movieNameEN.includes(searchMovieName);
      });
      setIsCardsLoading(false);
      if (searchMovies[0]) {
        setMoviesCards(searchMovies);
      } else {
        setErrorMessageMovies('Ничего не найдено');
        setMoviesCards([]);
      }
    }
    if (!lastSearchMovies) {
      setErrorMessageMovies('на сервере произошла ошибка, попробуйте повторить запрос');
    }
  }

  function handleSearchSavedMovie(movie) {
    setErrorMessageSavedMovies(null);
    setIsCardsLoading(true);
    const lastSavedMovies = JSON.parse(localStorage.getItem('lastSaved'));
    const filterMovies = lastSavedMovies.filter((item) => {
      const nameEN = item.nameEN ? item.nameEN : item.nameRU;
      const movieNameEN = nameEN.toLowerCase();
      const movieNameRU = item.nameRU.toLowerCase();
      const movieDescription = item.description.toLowerCase();
      const searchMovieName = movie.movieName.toLowerCase();
      return movieNameRU.includes(searchMovieName) ||
        movieNameEN.includes(searchMovieName) ||
        movieDescription.includes(searchMovieName);
    });
    setIsCardsLoading(false);
    if (filterMovies[0]) {
      setSavedMovies(filterMovies);
    } else {
      setErrorMessageSavedMovies('Ничего не найдено');
      setSavedMovies([]);
    }
  }

  function handleFilterShortMovies(isChecked) {
    if (isChecked && moviesCards[0]) {
      const shortMoviesCards = moviesCards.filter((item) => item.duration <= 40);
      setMoviesCards(shortMoviesCards);
    }
    if (!isChecked && moviesCards[0]) {
      const lastSearchMovies = JSON.parse(localStorage.getItem('lastSearch'));
      setMoviesCards(lastSearchMovies);
    }
    if (!moviesCards[0]) {
      setErrorMessageMovies('Ничего не найдено');
    }
  }

  function handleFilterSavedShortMovies(isChecked) {
    if (isChecked) {
      const shortMoviesCards = savedMovies.filter((item) => item.duration <= 40);
      setSavedMovies(shortMoviesCards);
    } else {
      const lastSavedMovies = JSON.parse(localStorage.getItem('lastSaved'));
      setSavedMovies(lastSavedMovies);
    }
  }

  function handleMovieForDelete(data) {
    const movieForDelete = savedMovies.filter((item) => item.movieId === data.id);
    handleDeleteMovie(movieForDelete[0]);
  }

  function handleDeleteMovie(movieForDelete) {
    mainApi
      .deleteMovie(movieForDelete._id)
      .then(() => {
        const lastSavedMovies = JSON.parse(localStorage.getItem('lastSaved'));
        const newSavedMovies = lastSavedMovies.filter(
          (item) => item.movieId !== movieForDelete.movieId,
        );
        setSavedMovies(newSavedMovies);
        localStorage.setItem('lastSaved', JSON.stringify(newSavedMovies));
      })
      .catch((error) => {
        setErrorMessageMovies(`${error} - Можно удалять только свои фильмы`);
        console.log(error);
      });
  }

  function handleCreateMovie(movie) {
    mainApi
      .createMovie(movie)
      .then((data) => {
        const newSavedMovies = [data, ...savedMovies];
        setSavedMovies(newSavedMovies);
        localStorage.setItem('lastSaved', JSON.stringify(newSavedMovies));
      })
      .catch((error) => {
        setErrorMessageMovies(`Не удалось сохранить фильм: ${error}`);
        console.log(error);
      });
  }

  function handleUpdateUserInfo(data) {
    setIsDisabledForm(true);
    mainApi
      .updateUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        setUpdateMessage('Профиль успешно обнавлен');
      })
      .catch((error) => {
        setUpdateErrorMessage(error);
        console.log(error);
      })
      .finally(() => setIsDisabledForm(false));
  }

  function handleRegister({ name, email, password }) {
    setIsDisabledForm(true);
    auth
      .register(name, email, password)
      .then(() => {
        handleLogin({ email, password });
      })
      .catch((error) => {
        setAuthErrorMessage(error);
        console.log(error);
      })
      .finally(() => setIsDisabledForm(false));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <AppContext.Provider
        value={{
          moviesCards: moviesCards,
          savedMovies: savedMovies,
          isCardsLoading: isCardsLoading,
          errorMessageMovies: errorMessageMovies,
          errorMessageSavedMovies: errorMessageSavedMovies,
          authErrorMessage: authErrorMessage,
          updateMessage: updateMessage,
          updateErrorMessage: updateErrorMessage,
          isDisabledForm: isDisabledForm,
        }}>
        <div className="page">
          <Switch>
            <Route exact path='/'>
              <Header loggedIn={loggedIn}/>
              <Main/>
              <Footer/>
            </Route>
            <ProtectedRoute
              path='/movies'
              component={Movies}
              loggedIn={loggedIn}
              searchMovie={handleSearchMovie}
              saveMovie={handleCreateMovie}
              deleteMovie={handleMovieForDelete}
              filterShortMovies={handleFilterShortMovies}
              errorMessageMovies={setErrorMessageMovies}
            />
            <ProtectedRoute
              path='/saved-movies'
              component={SavedMovies}
              loggedIn={loggedIn}
              setSavedMovies={setSavedMovies}
              searchMovie={handleSearchSavedMovie}
              deleteSavedMovie={handleDeleteMovie}
              filterShortMovies={handleFilterSavedShortMovies}
              errorMessageSavedMovies={setErrorMessageSavedMovies}
            />
            <ProtectedRoute
              path='/profile'
              component={Profile}
              loggedIn={loggedIn}
              updateUser={handleUpdateUserInfo}
              signOut={handleLogout}
              setUpdateMessage={setUpdateMessage}
              setUpdateErrorMessage={setUpdateErrorMessage}
            />
            <Route path='/signin'>
              <Login handleLogin={handleLogin} setAuthErrorMessage={setAuthErrorMessage} />
              {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/signin" />}
            </Route>
            <Route path='/signup'>
              <Register
                register={handleRegister}
                setAuthErrorMessage={setAuthErrorMessage}
              />
            </Route>
            <Route path='*'>
              <PageNotFound/>
            </Route>
          </Switch>
        </div>
      </AppContext.Provider>
    </CurrentUserContext.Provider>  );
};

export default App;
