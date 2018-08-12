var React = require('react');

import log from 'loglevel';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import NavBar from './NavBar';
import TodoList from './TodoList';
import Home from './Home';



class App extends React.Component {

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
                        <Route exact path='/todo' component={TodoList} />
                        <Route render={function() {
                           return <p>Not Found</p>
                        }} />
                    </Switch>
                </div>
            </Router>
        );
    }

}

module.exports = App;
