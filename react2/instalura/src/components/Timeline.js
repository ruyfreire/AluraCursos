import React, { Component } from 'react';

import FotoItem from './Foto';

export default class Timeline extends Component {

    constructor(props) {
        super(props);
        this.state = {fotos: []};
        this.login = this.props.login.login;
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

    render() {
        return (
            <div className="fotos container">
                {
                    this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto}/>)
                }
            </div>
        );
    }
}