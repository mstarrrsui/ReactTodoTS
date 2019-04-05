import * as React from 'react';

import log from 'loglevel';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import LocationFinder from './LocationFinder';
import NavBar from './NavBar';
import SearchExample from './SearchExample';
import TodoList from './TodoList';


export default class App extends React.Component {
    componentDidMount() {
        log.setDefaultLevel(3);
        log.setLevel(1, true);
        log.debug('App Mounted');
    }

    render() {
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
                      <Route exact path="/map" component={LocationFinder} />
                      <Route render={this.returnNotFound} />
                    </Switch>
                </div>
            </Router>
        );
    }

    private returnNotFound = () => <p>Not Found</p>;
}
