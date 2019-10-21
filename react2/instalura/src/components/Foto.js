import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Foto extends Component {
    render() {
        return (
            <div className="foto">
                
                <FotoHeader foto={this.props.foto}/>

                <img alt="foto" className="foto-src" src={this.props.foto.urlFoto} />

                <FotoInfo foto={this.props.foto}/>

                <FotoAtualizacoes {...this.props}/>

            </div>
        );
    }
}

class FotoHeader extends Component {
    render() {
        return (
            <header className="foto-header">
                <figure className="foto-usuario">

                    <img src={this.props.foto.urlPerfil} alt="foto do usuario" />

                    <figcaption className="foto-usuario">
                        <Link to={`/timeline/${this.props.foto.loginUsuario}`}> {this.props.foto.loginUsuario} </Link>
                    </figcaption>

                </figure>
                <time className="foto-data">{this.props.foto.horario}</time>
            </header>
        );
    }
}

class FotoInfo extends Component {

    render() {
        return (
            <div className="foto-info">

                <div className="foto-info-likes">
                    {
                        this.props.foto.likers.map(liker => {
                            return (<Link to={`/timeline/${liker.login}`} key={liker.login}>{liker.login}, </Link>)
                        })
                    }

                    { (this.props.foto.likers.length === 1) ? <span>curtiu</span> : null }

                    { (this.props.foto.likers.length > 1) ? <span>curtiram</span> : null }                    
                </div>

                <p className="foto-info-legenda">
                    <Link to={`/timeline/${this.props.foto.loginUsuario}`} className="foto-info-autor">{this.props.foto.loginUsuario}</Link>
                    <span> {this.props.foto.comentario}</span>
                </p>

                <ul className="foto-info-comentarios">
                    {
                        this.props.foto.comentarios.map(comentario => {
                        return   (<li className="comentario" key={comentario.texto}>
                                    <Link
                                        to={`/timeline/${comentario.login}`}
                                        className="foto-info-autor">{comentario.login}</Link>

                                    <span> {comentario.texto}</span>
                                </li>)
                        })
                    }
                </ul>
            </div>
        );
    }
}

class FotoAtualizacoes extends Component {

    likear = (event) => {
        event.preventDefault();
        this.props.likear(this.props.foto.id);
    }

    comentar = (event) => {
        event.preventDefault();
        this.props.comentar(this.props.foto.id, this.comentario);
    }

    render() {
        return (
            <section className="fotoAtualizacoes">
                <a href="# " onClick={this.likear} className={this.props.foto.likeada ? "fotoAtualizacoes-like-ok" : "fotoAtualizacoes-like"}>Likar</a>
                <form className="fotoAtualizacoes-form" onSubmit={this.comentar}>
                    <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" ref={input => this.comentario = input}/>
                    <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit" />
                </form>
            </section>
        );
    }
}