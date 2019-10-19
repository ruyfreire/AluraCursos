import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import pubsub from 'pubsub-js';

export default class Header extends Component {

    pesquisar = (event) => {
        event.preventDefault();

        fetch(`https://instalura-api.herokuapp.com/api/public/fotos/${this.inputPesquisa.value}`)
            .then(resp => resp.json())
            .then(fotos => {
                pubsub.publish('pesquisa', fotos);
                this.inputPesquisa.value = '';
            })
            .catch(erro => { console.log('usuário não encontrado!')});
    }

    render() {
        return(
            <header className="header container">
            <h1 className="header-logo">
                Instalura
            </h1>

            <form className="header-busca" onSubmit={this.pesquisar}>
                <input type="text" name="search" placeholder="Pesquisa" className="header-busca-campo" ref={input => this.inputPesquisa = input}/>
                <input type="submit" value="Buscar" className="header-busca-submit" />
            </form>


            <nav>                
                <ul className="header-nav">
                    <li className="header-nav-item">
                        <a href="# ">
                            ♡
                            {/* ♥ */}
                            {/* Quem deu like nas minhas fotos? */}
                        </a>
                    </li>
                </ul>
            </nav>

            <div>
                <Link to="/logout" className="btn-sair">Sair</Link>
            </div>
        </header>
        );
    }
}