import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {

    pesquisar = (event) => {
        event.preventDefault();
        this.props.store.pesquisar(this.inputPesquisa);
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