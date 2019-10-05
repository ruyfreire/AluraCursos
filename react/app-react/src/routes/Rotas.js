import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from '../App';
import Home from '../templates/Home';
import AutorBox from '../templates/Autores';
import LivroBox from '../templates/Livros';


const rotas = () => {

    return (
        <Router>
        <Route>
        <App>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/autores" component={AutorBox}/>
                <Route path="/livros" component={LivroBox}/>
            </Switch>
        </App>
        </Route>
        </Router>
    );
}

export default rotas;
