import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import App from '../App';
import Login from '../components/Login';
import Logout from '../components/Logout';

function autenticado(nextState, replace) {
    if(nextState.match.params.login != null || localStorage.getItem('auth-token'))
        return <App login={nextState.match.params.login}/>;
    else
        return <Redirect to={{pathname: '/', state: {msg: 'É preciso estar logado!'}}} />
}

const rotas = () => {
    return (
        <Router>
            <Route exact path="/" component={Login}/>
            <Route path="/timeline/:login?" render={autenticado}/>
            <Route path="/logout" component={Logout}/>
        </Router>
    );
}

export default rotas;
