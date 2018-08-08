import * as React from "react";
import * as ReactDOM from "react-dom";
import App from './components/App';

import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/scss/bootstrap.scss';
import 'font-awesome/css/font-awesome.min.css';


require('./index.css');


ReactDOM.render(
    <App />,
    document.getElementById('app')
);


module.hot.accept();
