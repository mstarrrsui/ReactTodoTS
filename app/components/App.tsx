import * as React from 'react';

import log from 'loglevel';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import LocationFinder from './LocationFinder';
import NavBar from './NavBar';
import SearchExample from './redditsearch/SearchExample';
import TodoList from './TodoList';
import HNSearch from './hackernews/HNSearch';

const returnNotFound = (): React.ReactNode => <p>Not Found</p>;

/**
 * this is the main application component
 */
export default class App extends React.Component {
  public componentDidMount(): void {
    log.setDefaultLevel(3);
    log.setLevel(1, true);
    log.debug('App Mounted');
    log.debug(`hnSearchUrl: ${window.appSettings.hnSearchUrl}`);
    //log.debug(`API URL: ${settings.apiUrl}`);
  }

  public render(): React.ReactNode {
    // log.debug('basename:' + BASENAME);
    const modeName = process.env.NODE_ENV;
    log.debug(`modeName:${modeName}`);
    return (
      <Router>
        <div className="container">
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/todo" component={TodoList} />
            <Route exact path="/search" component={SearchExample} />
            <Route exact path="/hnsearch" component={HNSearch} />
            <Route exact path="/map" component={LocationFinder} />
            <Route render={returnNotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}
