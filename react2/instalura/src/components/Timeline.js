import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';


import FotoItem from './Foto';
import TimelineAPI from '../rules/TimelineAPI';


export default class Timeline extends Component {
    
    constructor(props) {
        super(props);
        this.state = {fotos: []};
        this.login = this.props.login.login;
    }

    componentWillMount() {
        this.props.store.subscribe(() => {
            this.setState({fotos: this.props.store.getState().timelineReduces});
        });
    }

    // render chama aqui

    componentDidMount() {
        this.carregaFotos();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.login !== undefined) {
            this.login = nextProps.login.login;
            this.carregaFotos();
        }
    }

    carregaFotos() {
        this.props.store.dispatch(TimelineAPI.carregaFotos(this.login));
    }

    likear = (fotoId) => {
        this.props.store.dispatch(TimelineAPI.likear(fotoId));
    }

    comentar = (fotoId, comentario) => {
        this.props.store.dispatch(TimelineAPI.comentar(fotoId, comentario));
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