import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends Component {

    autenticado = (nextState, replace) => {
        const Component = this.props.component;
        if(nextState.match.params.login != null || localStorage.getItem('auth-token'))
            return <Component {...this.props} login={nextState.match.params.login}/>;
        else
            return <Redirect to={{pathname: '/', state: {msg: 'É preciso estar logado!'}}} />
        }
        
    render() {
        return <Route path={this.props.path} render={this.autenticado}/>
    }
}

export default PrivateRoute;