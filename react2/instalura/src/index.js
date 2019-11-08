import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import './css/reset.css';
import './css/timeline.css';
import './css/login.css';

import Rotas from './routes/routes';

import timelineReduces from './reducers/timeline';
import headerReduces from './reducers/header';

const reducers = combineReducers({timelineReduces, headerReduces});
const store = createStore(reducers, applyMiddleware(thunkMiddleware) );


ReactDOM.render(
    <Provider store={store}>
        <Rotas/>
    </Provider>,
    document.getElementById('root')
);
