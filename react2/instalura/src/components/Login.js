import React, { Component } from 'react';

export default class Login extends Component {
    render() {
        return (
            <div className="login-box">
                <h1 className="header-logo">Instalura</h1>
                <span></span>
                <form onSubmit>
                    <input type="text" ref={username => this.user = username}/>
                    <input type="password" ref={senha => this.senha = senha}/>
                    <input type="submit" value="login"/>
                </form>
            </div>
        );
    }
}