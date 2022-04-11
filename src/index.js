import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { routerReducer } from 'react-router-redux';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { fork } from 'redux-saga/effects';
import { reducer as formReducer } from 'redux-form';
import { render } from 'react-dom';
import App from './App';
import createStore from './store';
import Routes from './Routes';
// global styles
import './reset.scss';

// TODO:: Import Reducers
import authReducer from './reducers/Auth';
import headerReducer from './reducers/Header';
import landingPageReducer from './reducers/LandingPage';
import donorsReducer from './reducers/Donors';

// TODO:: Import Sagas
import authSagas from './sagas/Auth';
import landingPageSagas from './sagas/LandingPage';
import donorPageSagas from './sagas/Donor';


const reducers = {
  auth: authReducer,
  form: formReducer,
  header: headerReducer,
  landingPage: landingPageReducer,
  donor: donorsReducer,
  routing: routerReducer,

};

const sagas = [
  fork(authSagas),
  fork(landingPageSagas),
  fork(donorPageSagas)
];

const browserHistory = createBrowserHistory();

render(
  <Provider store={createStore(reducers, sagas, browserHistory)}>
    <BrowserRouter history={browserHistory}>
      <App location={browserHistory.location} Routes={Routes} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
