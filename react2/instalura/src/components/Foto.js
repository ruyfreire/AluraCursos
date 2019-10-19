import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import pubsub from 'pubsub-js';

export default class Foto extends Component {
    render() {
        return (
            <div className="foto">
                
                <FotoHeader foto={this.props.foto}/>

                <img alt="foto" className="foto-src" src={this.props.foto.urlFoto} />

                <FotoInfo foto={this.props.foto}/>

                <FotoAtualizacoes foto={this.props.foto}/>

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

    constructor(props) {
        super(props);
        this.state = {
            likers: this.props.foto.likers,
            comentarios: this.props.foto.comentarios
        }
    }

    componentWillMount() {
        pubsub.subscribe('atualiza-likers', (topico, novosLikers) => {
            if(novosLikers.id === this.props.foto.id) {
                const liked = this.state.likers.find(liker => liker.login === novosLikers.likers.login);
                if(liked === undefined) {
                    const likersAtt = this.state.likers.concat(novosLikers.likers);
                    this.setState({likers: likersAtt});
                }
                else {
                    const likersAtt = this.state.likers.filter(liker => liker.login !== novosLikers.likers.login);
                    this.setState({likers: likersAtt});
                }
            }
        })

        pubsub.subscribe('atualiza-comentarios', (topico, novosComentarios) => {
            if(novosComentarios.id === this.props.foto.id) {
                const commentAtt = this.state.comentarios.concat(novosComentarios.comentarios);
                this.setState({comentarios: commentAtt});
            }
        })
    }

    render() {
        return (
            <div className="foto-info">

                <div className="foto-info-likes">
                    {
                        this.state.likers.map(liker => {
                            return (<Link to={`/timeline/${liker.login}`} key={liker.login}>{liker.login}, </Link>)
                        })
                    }

                    { (this.state.likers.length === 1) ? <span>curtiu</span> : null }

                    { (this.state.likers.length > 1) ? <span>curtiram</span> : null }                    
                </div>

                <p className="foto-info-legenda">
                    <Link to={`/timeline/${this.props.foto.loginUsuario}`} className="foto-info-autor">{this.props.foto.loginUsuario}</Link>
                    <span> {this.props.foto.comentario}</span>
                </p>

                <ul className="foto-info-comentarios">
                    {
                        this.state.comentarios.map(comentario => {
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

    constructor(props) {
        super(props);
        this.state = { likeada: this.props.foto.likeada }
    }

    likear = (event) => {
        event.preventDefault();

        fetch(`https://instalura-api.herokuapp.com/api/fotos/${this.props.foto.id}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, { method: 'POST' })
            .then(resp => {
                if(resp.ok) {
                    return resp.json();
                }
                else {
                    throw new Error('Não foi possível buscar likers!');
                }
            })
            .then(likers => {
                pubsub.publish('atualiza-likers', {id: this.props.foto.id, likers});
                this.setState({likeada: !this.state.likeada});
            })
            .catch(error => {console.log(error)});
    }

    comentar = (event) => {
        event.preventDefault();

        fetch(`https://instalura-api.herokuapp.com/api/fotos/${this.props.foto.id}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,
            {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({texto: this.comentario.value})
            })
            .then(resp => {
                if(resp.ok) {
                    return resp.json();
                }
                else {
                    throw new Error('Não foi possível comentar na foto!');
                }
            })
            .then(comentarios => {
                pubsub.publish('atualiza-comentarios', {id: this.props.foto.id, comentarios});
                this.comentario.value = '';
            })
            .catch(error => {console.log(error)});
    }

    render() {
        return (
            <section className="fotoAtualizacoes">
                <a href="# " onClick={this.likear} className={this.state.likeada ? "fotoAtualizacoes-like-ok" : "fotoAtualizacoes-like"}>Likar</a>
                <form className="fotoAtualizacoes-form" onSubmit={this.comentar}>
                    <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" ref={input => this.comentario = input}/>
                    <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit" />
                </form>
            </section>
        );
    }
}