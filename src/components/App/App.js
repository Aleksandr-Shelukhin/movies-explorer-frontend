import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"

import { CurrentUserContext } from "../../context/CurrentUserContext";
import { AppContext } from "../../context/AppContext";
import { moviesApi } from '../../utils/MoviesApi';

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
  const [loggedIn, setLoggedIn] = useState(localStorage.jwt || false);
  const history = useHistory();

  console.log(moviesCards)
  /*useEffect(() => {
    localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
  });*/

  useEffect(() => {
    const lastSearchedMovies = JSON.parse(localStorage.getItem('lastSearchedMovies'));
    setMoviesCards(lastSearchedMovies ?? []);
  }, []);

  useEffect(() => {
    const movies = localStorage.getItem('movies');
    console.log('movies 1')
    if (!movies) {
      if (loggedIn) {
        setIsCardsLoading(true);
        moviesApi
          .getMoviesInfo()
          .then((movies) => {
            localStorage.setItem('movies', JSON.stringify(movies));
            console.log('movies 2')
          })
          .catch((error) => {
            setErrorMessageMovies('на сервере произошла ошибка, попробуйте повторить запрос');
            console.log(error);
          })
          .finally(() => setIsCardsLoading(false));
      }
    }
  }, [loggedIn]);

  useEffect(() => {
    checkToken();
    if (loggedIn) {
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

  function searchMovieByQuery(moviesArray, searchQuery, isChecked) {
    return moviesArray.filter((item) =>
      isChecked
        ? (item.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
          && item.duration <= 40) ||
        (item.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
          && item.duration <= 40)
        : item.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.validateToken(jwt)
        .then(() => {
          setLoggedIn(true);
          console.log('setLoggedIn true')
        })
        .catch(() => {
          setLoggedIn(false);
          localStorage.clear();
          history.push('/signin');
        })
    } else {
      setLoggedIn(false);
      localStorage.clear();
    }
    console.log('Проверка токена')
  }

  function handleLogin({ email, password }) {
    setIsDisabledForm(true);
    auth
      .signin(email, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        //checkToken();
        setLoggedIn(true);
        history.push('/movies');
      })
      .catch((error) => {
        setAuthErrorMessage(error);
        console.log(error);
      })
      .finally(() => setIsDisabledForm(false));
  }

  function handleLogout() {
    localStorage.clear()
    setLoggedIn(false);
    setMoviesCards([]);
    setSavedMovies([]);
    setCurrentUser({});
    history.push('/');
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
        setUpdateMessage('Профиль успешно обновлен');
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
              <Header loggedIn={loggedIn} />
              <Main checkToken={checkToken} />
              <Footer />
            </Route>
            <ProtectedRoute
              path='/movies'
              component={Movies}
              loggedIn={loggedIn}
              searchMovieByQuery={searchMovieByQuery}
              saveMovie={handleCreateMovie}
              deleteMovie={handleMovieForDelete}
              errorMessageMovies={setErrorMessageMovies}
            />
            <ProtectedRoute
              path='/saved-movies'
              component={SavedMovies}
              loggedIn={loggedIn}
              searchMovieByQuery={searchMovieByQuery}
              savedMovies={savedMovies}
              deleteSavedMovie={handleDeleteMovie}
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
              {loggedIn && <Redirect to="/movies" />}
              <Login handleLogin={handleLogin} setAuthErrorMessage={setAuthErrorMessage} />
            </Route>
            <Route path='/signup'>
              {loggedIn && <Redirect to="/movies" />}
              <Register register={handleRegister} setAuthErrorMessage={setAuthErrorMessage} />
            </Route>
            <Route path='*'>
              <PageNotFound />
            </Route>
            <Route>
              {loggedIn ? <Redirect to='/movies' /> : <Redirect to='/' />}
            </Route>
          </Switch>
        </div>
      </AppContext.Provider>
    </CurrentUserContext.Provider>);
};

export default App;
