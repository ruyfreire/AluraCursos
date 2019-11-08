import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import TimelineAPI from '../rules/TimelineAPI';

class Header extends Component {

    constructor() {
        super();
        this.state = {msg: ''};
    }
    
    // componentDidMount() {
    //     this.props.store.subscribe(() => {
    //         this.setState({msg: this.props.store.getState().headerReduces});
    //     });
    // }

    pesquisar = (event) => {
        event.preventDefault();
        this.props.pesquisar(this.inputPesquisa);
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
                <span className="alert-pesquisa">{this.state.msg}</span>
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


const mapStateToProps = state => {
    return { msg: state.headerReduces }
};

const mapDispatchToProps = dispatch => {
    return {
        pesquisar: (input) => {
            if(input.value !== '') {
                dispatch(TimelineAPI.pesquisar(input));
            }
        }
    }
}

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderContainer;