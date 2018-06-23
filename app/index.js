var React = require('react');
var ReactDOM = require('react-dom');
import 'babel-polyfill';
var App = require('./components/App');
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';


require('./index.css');


ReactDOM.render(
    <App />,
    document.getElementById('app')
);
