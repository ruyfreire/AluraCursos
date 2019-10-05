import React, {Component} from 'react';
import PubSub from 'pubsub-js';

export default class SelectCustom extends Component {

    constructor() {
        super();
        this.state = {erro: ''}
    }

    render() {
        return (
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>

                <select
                    id={this.props.id}
                    value={ this.props.value }
                    name={this.props.name}
                    onChange={ this.props.onChange }>

                <option value="0">{this.props.label}</option>
                { 
                    this.props.autores.map(function(autor) {
                    return <option key={ autor.id } value={ autor.id }>
                                { autor.nome }
                            </option>;
                    })
                }
                </select>
                <span className="msg-erro">{this.state.erro}</span>
            </div>
        );
    }

    componentDidMount() {

        PubSub.subscribe('erro-validacao-livro', (topico, erro) => {
            switch(this.props.name) {
                case 'autor': this.setState({erro: erro.msg[0].autorId}); break;
                default: break;
            }
        });

        PubSub.subscribe('limpa-erros', (topico, data) => {
            this.setState({erro: ''});
        })
    }

    componentWillUnmount() {
        PubSub.clearAllSubscriptions();
    }
}