import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

export default class Login extends Component {

    constructor() {
        super();
        this.state = {msg: '', redirect: false};
    }

    enviar(event) {
        event.preventDefault();

        fetch('https://instalura-api.herokuapp.com/api/public/login', {
            method: 'POST',
            headers: new Headers({
                'Content-type' : 'application/json'
            }),
            body: JSON.stringify({
                login: this.login.value,
                senha: this.senha.value
            })
        })
        .then(resp => {
            if(resp.ok) return resp.text()
            else throw new Error('Erro ao fazer login!')
        })
        .then(token => {
            localStorage.setItem('auth-token', token);
            this.setState({redirect: true})
        })
        .catch(error => {this.setState({msg: error.message})});
    }

    redirecionar = () => {
        if(this.state.redirect)
        return <Redirect to="/timeline"/>
    }

    render() {
        return (
            <div className="login-box">
                <h1 className="header-logo">Instalura</h1>
                <span className="msg-error">{this.state.msg}</span>
                <form onSubmit={this.enviar.bind(this)}>
                    <input type="text" ref={login => this.login = login}/>
                    <input type="password" ref={senha => this.senha = senha}/>
                    <input type="submit" value="Login"/>
                    {this.redirecionar()}
                </form>
            </div>
        );
    }
}