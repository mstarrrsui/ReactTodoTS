import * as React from 'react';

import log from 'loglevel';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import LocationFinder from './LocationFinder';
import NavBar from './NavBar';
import SearchExample from './SearchExample';
import ResultsList from './hackernews/ResultsList';
import TodoList from './TodoList';
import { taskListStore, taskListContext } from '../stores/TaskListStore';

const returnNotFound = (): React.ReactNode => <p>Not Found</p>;

export default class App extends React.Component {
  public componentDidMount(): void {
    log.setDefaultLevel(3);
    log.setLevel(1, true);
    log.debug('App Mounted');
  }

  public render(): React.ReactNode {
    // log.debug('basename:' + BASENAME);
    const modeName = process.env.NODE_ENV;
    log.debug(`modeName:${modeName}`);
    return (
      <taskListContext.Provider value={taskListStore}>
        <Router>
          <div className="container">
            <NavBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/todo" component={TodoList} />
              <Route
                exact
                path="/search"
                render={props => <SearchExample {...props} padTop="120px" />}
              />
              <Route exact path="/hnsearch" component={ResultsList} />
              <Route exact path="/map" component={LocationFinder} />
              <Route render={returnNotFound} />
            </Switch>
          </div>
        </Router>
      </taskListContext.Provider>
    );
  }
}
