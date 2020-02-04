import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { MuiThemeProvider as ThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import jwtDecode from 'jwt-decode';
import axios from 'axios';

import store from '../states/store/store';
import { SET_AUTH } from '../states/constants/ActionsTypes';
import { signOutUserAction, getUserData } from '../states/actions/actionUsers';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import User from '../pages/User';
import Navbar from './Navbar';
import AuthRoute from './UtilsComponent/AuthRoute';
import './App.css';

axios.defaults.baseURL =
  'https://us-central1-react-socialmediaapp.cloudfunctions.net/api';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#43ffe6',
      main: '#065980',
      dark: '#014d6b',
      contrastText: '#d4e0e6'
    },
    secondary: {
      light: '#e67756',
      main: 'rgb(241, 77, 65)',
      dark: '#7c220b',
      contrastText: '#d4e0e6'
    }
  }
});

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(signOutUserAction());
    window.location.href = '/login';
  } else {
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch({ type: SET_AUTH });
    store.dispatch(getUserData());
  }
}

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <AuthRoute path="/login" component={Login} />
              <AuthRoute path="/signup" component={Signup} />
              <Route exact path="/user/:userName" component={User} />
              <Route
                exact
                path="/user/:userName/holler/:hollerID"
                component={User}
              />
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}
