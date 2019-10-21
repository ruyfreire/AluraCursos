import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import pubsub from 'pubsub-js';

import FotoItem from './Foto';

export default class Timeline extends Component {

    constructor(props) {
        super(props);
        this.state = {fotos: []};
        this.login = this.props.login.login;
    }

    componentWillMount() {
        pubsub.subscribe('pesquisa', (topico, fotos) => {
            this.setState({fotos});
        })

        pubsub.subscribe('atualiza-likers', (topico, novosLikers) => {
            const fotoAchada = this.state.fotos.find(foto => foto.id === novosLikers.fotoId);
            const liked = fotoAchada.likers.find(liker => liker.login === novosLikers.likers.login);
            if(liked === undefined) {
                fotoAchada.likers.push(novosLikers.likers);
            }
            else {
                const likersAtt = fotoAchada.likers.filter(liker => liker.login !== novosLikers.likers.login);
                fotoAchada.likers = likersAtt;
            }
            fotoAchada.likeada = !fotoAchada.likeada;
            this.setState({fotos: this.state.fotos});
        })

        pubsub.subscribe('atualiza-comentarios', (topico, novosComentarios) => {
            const fotoAchada = this.state.fotos.find(foto => foto.id === novosComentarios.fotoId);
            fotoAchada.comentarios.push(novosComentarios.comentarios);
            this.setState({fotos: this.state.fotos});
        })
    }

    carregaFotos() {
        let url = '';
        if(this.login !== undefined)
            url = `https://instalura-api.herokuapp.com/api/public/fotos/${this.login}`;
        else
            url = `https://instalura-api.herokuapp.com/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;

        fetch(url)
            .then(resp => resp.json())
            .then(fotos => this.setState({fotos}) )
    }

    likear = (fotoId) => {
        fetch(`https://instalura-api.herokuapp.com/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, { method: 'POST' })
            .then(resp => {
                if(resp.ok) {
                    return resp.json();
                }
                else {
                    throw new Error('Não foi possível dar like!');
                }
            })
            .then(likers => {
                pubsub.publish('atualiza-likers', {fotoId, likers});
            })
            .catch(error => {console.log(error)});
    }

    comentar = async (fotoId, comentario) => {
        fetch(`https://instalura-api.herokuapp.com/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,
        {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({texto: comentario.value})
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
            comentario.value = '';
            pubsub.publish('atualiza-comentarios', {fotoId, comentarios});
        })
        .catch(error => { console.log(error) });
    }


    componentDidMount() {
        this.carregaFotos();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.login !== undefined) {
            this.login = nextProps.login.login;
            this.carregaFotos();
        }
    }

    render() {
        return (
            <div className="fotos container">
                <CSSTransitionGroup
                    transitionName="timeline"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {
                        this.state.fotos.map(foto =>
                            <FotoItem
                                key={foto.id}
                                foto={foto}
                                likear={this.likear}
                                comentar={this.comentar}
                            />)
                    }
                </CSSTransitionGroup>
            </div>
        );
    }
}