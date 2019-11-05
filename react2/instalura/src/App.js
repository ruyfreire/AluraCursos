import React, { Component } from 'react';

import Header from './components/Header';
import Timeline from './components/Timeline';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import timelineReduces from './reducers/timeline';
import headerReduces from './reducers/header';

const reducers = combineReducers({timelineReduces, headerReduces});
const store = createStore(reducers, applyMiddleware(thunkMiddleware) );

class App extends Component {

    render() {
        return (
            <div id="root">
                <div className="main">
    
                    <Header store={store}/>
    
                    <Timeline login={this.props} store={store}/>
                    
                </div>
            </div>
        );
    }

}

export default App;
