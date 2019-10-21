import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from '../App';
import Login from '../components/Login';
import Logout from '../components/Logout';
import PrivateRoute from './PrivateRoutes';


const rotas = () => {
    return (
        <Router>
            <Route exact path="/" component={Login}/>
            <PrivateRoute path="/timeline/:login?" component={App}/>
            <Route path="/logout" component={Logout}/>
        </Router>
    );
}

export default rotas;
