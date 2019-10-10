import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {

    constructor() {
        super();
        this.state = {redirect: false}
    }

    componentDidMount() {
        localStorage.removeItem('auth-token');
        this.setState({redirect: true});
    }

    redirecionar() {
        return <Redirect to="/"/>
    }

    render() {
        return (<div>{this.redirecionar()}</div>);
    }
}