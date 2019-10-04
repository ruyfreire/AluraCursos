import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from '../App';
import Home from '../templates/Home';
import AutorBox from '../templates/Cadastro';
import Livro from '../templates/Livros';


const rotas = (
    <Router>
        <Route>
            <App>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route path="/autores">
                        <AutorBox/>
                    </Route>
                    <Route path="/livros">
                        <Livro/>
                    </Route>
                </Switch>
            </App>
        </Route>
    </Router>
)

export default rotas;
