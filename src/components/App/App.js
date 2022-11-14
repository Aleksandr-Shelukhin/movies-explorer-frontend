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

  /*useEffect(() => {
    localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
  });*/

  useEffect(() => {
    const lastSearch = JSON.parse(localStorage.getItem('lastSearch'));
    setMoviesCards(lastSearch ?? []);
  }, []);



  useEffect(() => {
    const movies = localStorage.getItem('movies');
    if (!movies) {
      if (loggedIn) {
        setIsCardsLoading(true);
        moviesApi
          .getMoviesInfo()
          .then((movies) => {
            localStorage.setItem('movies', JSON.stringify(movies));
          })
          .catch((error) => {
            setErrorMessageMovies('на сервере произошла ошибка, попробуйте повторить запрос');
            console.log(error);
          })
          .finally(() => setIsCardsLoading(false));
      }
    }
  }, [loggedIn]);

  useEffect(() => { // провекрка токена
    checkToken();
    if (loggedIn) {
      //history.push('/movies');
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

  function handleSearchMovie(searchQuery) {
    setIsCardsLoading(true);
    setErrorMessageMovies(null);

    const initialMovies = JSON.parse(localStorage.getItem('movies'));

    if (!initialMovies) {
      setErrorMessageMovies('на сервере произошла ошибка, попробуйте повторить запрос');
      return;
    }

    const searchMovies = initialMovies.filter((item) => {
      const title = `${item.nameRU} ${item.nameEN || ''}`.toLowerCase();
      return title.includes(searchQuery.toLowerCase());
    });

    localStorage.setItem('lastSearch', JSON.stringify(searchMovies));
    if (searchMovies.length) {
      const isChecked = JSON.parse(localStorage.getItem('isChecked'));

      const resultSearch = isChecked
        ? searchMovies.filter((movie) => movie.duration <= 40)
        : searchMovies;
      setMoviesCards(resultSearch);
      setErrorMessageMovies('');
    } else {
      setErrorMessageMovies('Ничего не найдено');
      setMoviesCards([]);
    }

    setIsCardsLoading(false);
  }


  function handleSearchSavedMovie(searchQuery) {
    console.log("handleSearchSavedMovie")
    setErrorMessageSavedMovies(null);
    setIsCardsLoading(true);
    const lastSavedMovies = JSON.parse(localStorage.getItem('lastSaved'));
    const searchMovies = lastSavedMovies.filter((item) => {
      const title = `${item.nameRU} ${item.nameEN || ''}`.toLowerCase();
      return title.includes(searchQuery.toLowerCase());
    });
    localStorage.setItem('lastSavedSearch', JSON.stringify(searchMovies));
    if (searchMovies.length) {
      const isChecked = JSON.parse(localStorage.getItem('isCheckedSaved'));
      console.log(isChecked)

      const resultSearch = isChecked
        ? searchMovies.filter((movie) => movie.duration <= 40)
        : searchMovies;
      setSavedMovies(resultSearch);
    } else {
      setErrorMessageSavedMovies('Ничего не найдено');
      setSavedMovies([]);
    }
    setIsCardsLoading(false);
  }

  function handleFilterShortMovies(isChecked) {
    console.log(isChecked)
    if (isChecked && moviesCards.length) {
      const shortMoviesCards = moviesCards.filter((item) => item.duration <= 40);
      localStorage.setItem('setShortMovies', JSON.stringify(shortMoviesCards));
      setMoviesCards(shortMoviesCards);
      console.log(shortMoviesCards)
    }
    if (!isChecked && moviesCards.length) {
      const lastSearchMovies = JSON.parse(localStorage.getItem('lastSearch'));
      setMoviesCards(lastSearchMovies);
    }
    if (!isChecked && !moviesCards.length) {
      const lastSearchMovies = JSON.parse(localStorage.getItem('lastSearch'));
      setErrorMessageMovies('');
      setMoviesCards([]);
      //setMoviesCards(lastSearchMovies);
      console.log(lastSearchMovies)
    }
    if (!moviesCards.length) {
      setErrorMessageMovies('Ничего не найдено');
    }
  }

  function handleFilterSavedShortMovies(isChecked) {
    console.log(isChecked)
    if (isChecked && savedMovies.length) {
      const shortMoviesCards = savedMovies.filter((item) => item.duration <= 40);
      localStorage.setItem('setShortSavedMovies', JSON.stringify(shortMoviesCards));
      setSavedMovies(shortMoviesCards);
    }
    if (!isChecked && savedMovies.length) {
      const lastSavedMovies = JSON.parse(localStorage.getItem('lastSavedSearch'));
      setSavedMovies(lastSavedMovies);
    }
    if (!isChecked && !savedMovies.length) {
      const lastSavedMovies = JSON.parse(localStorage.getItem('lastSavedSearch'));
      setSavedMovies(lastSavedMovies);
      setErrorMessageMovies('');
      console.log(lastSavedMovies)
    }
    if (!savedMovies.length) {
      setErrorMessageMovies('Ничего не найдено');
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
              savedMovies={savedMovies}
              searchSavedMovie={handleSearchSavedMovie}
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
