import React from 'react';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import {Route, Switch} from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import PageNotFound from "../PageNotFound/PageNotFound";


const App = () => {
  return (
    <div className="page">
      <Header/>
      <main className="main">
        <Switch>

          <Route exact path='/'>
            <Main/>
          </Route>
          <Route path='/movies'>
            <Movies/>
          </Route>
          <Route path='/saved-movies'>
            <SavedMovies/>
          </Route>
          <Route path='/profile'>
            <Profile/>
          </Route>
          <Route path='/signin'>
            <Login/>
          </Route>
          <Route path='/signup'>
            <Register/>
          </Route>
          <Route path='*'>
            <PageNotFound/>
          </Route>

        </Switch>
      </main>


      <Footer/>
    </div>
  );
};

export default App;
