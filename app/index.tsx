import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';

import 'bootstrap/scss/bootstrap.scss'; // tslint:disable-line
import 'font-awesome/css/font-awesome.min.css'; // tslint:disable-line

import './index.css';

import AppInsights from './util/AppInsights';
AppInsights.loadAppInsights();

ReactDOM.render(
  <>
    <App />
  </>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}
