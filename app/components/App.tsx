import * as React from 'react';

import Home from './Home';
import LocationFinder from './LocationFinder';
import NavBar from './NavBar';
import SearchExample from './SearchExample';
import TodoList from './TodoList';
import { Router, RouteComponentProps } from '@reach/router';

import log from 'loglevel';

// tslint:disable-next-line:variable-name
const ReturnNotFound = (_props: RouteComponentProps) => {
  return <p>Not Found</p>;
};

export default class App extends React.Component {
  public componentDidMount() {
    log.setDefaultLevel(3);
    log.setLevel(1, true);
    log.debug('App Mounted');
  }

  public render() {
    // log.debug('basename:' + BASENAME);
    return (
      <div className="container">
        <NavBar />
        <Router>
          <Home path="/" />
          <TodoList path="/todo" />
          <SearchExample path="/search" />
          <LocationFinder path="/map" />
          <ReturnNotFound default={true} />
        </Router>
      </div>
    );
  }
}
