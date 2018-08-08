import React, { Component } from "react";
import log from 'loglevel/lib/loglevel';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';



export default class App extends Component<{}>  {

    componentDidMount() {
        log.setDefaultLevel(3);
        log.setLevel(1, true);
        log.debug("App Mounted");
    }

    render() {
        return (
            <Router>
                <div className='container'>
                    <NavBar />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route render={function() {
                           return <p>Not Found</p>
                        }} />
                    </Switch>
                </div>
            </Router>
        );
    }

}

