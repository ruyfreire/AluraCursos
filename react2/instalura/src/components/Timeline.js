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
                        this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto}/>)
                    }
                </CSSTransitionGroup>
            </div>
        );
    }
}