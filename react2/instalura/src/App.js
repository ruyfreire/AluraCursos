import React, { Component } from 'react';

import Header from './components/Header';
import Timeline from './components/Timeline';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import timelineReduces from './reducers/timeline';

const store = createStore(timelineReduces, applyMiddleware(thunkMiddleware) );

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
