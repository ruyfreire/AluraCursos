import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './css/reset.css';
import './css/timeline.css';
import './css/login.css';

import App from './App';
import Login from './components/Login';
import Logout from './components/Logout';

ReactDOM.render(
    <Router>
        <Route exact path="/" component={Login}/>
        <Route path="/timeline" component={App}/>
        <Route path="/logout" component={Logout}/>
    </Router>,
    document.getElementById('root')
);
