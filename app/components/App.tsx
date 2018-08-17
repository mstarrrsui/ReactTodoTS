import * as React from 'react';

import Home from './Home';
import NavBar from './NavBar';
import SearchExample from './SearchExample';
import TodoList from './TodoList';

import log from 'loglevel';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';

export default class App extends React.Component  {

    componentDidMount() {
        log.setDefaultLevel(3);
        log.setLevel(1, true);
        log.debug('App Mounted');
    }

    render() {
        return (
            <Router>
                <div className="container">
                    <NavBar />
                    <Switch>
                        <Route exact={true} path="/" component={Home} />
                        <Route exact={true} path="/todo" component={TodoList} />
                        <Route exact={true} path="/search" component={SearchExample} />
                        <Route render={function() {
                           return <p>Not Found</p>;
                        }} />
                    </Switch>
                </div>
            </Router>
        );
    }

}

