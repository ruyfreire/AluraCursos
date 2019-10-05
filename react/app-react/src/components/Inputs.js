import React, {Component} from 'react';
import PubSub from 'pubsub-js';

export default class InputCustom extends Component {

    constructor() {
        super();
        this.state = {erro: ''}
    }

    render() {
        return (
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input 
                    id={this.props.id}
                    type={this.props.type}
                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.props.onChange} />
                    <span className="msg-erro">{this.state.erro}</span>
            </div>
        );
    }

    componentDidMount() {
        PubSub.subscribe('erro-validacao-autor', (topico, erro) => {
            switch(this.props.name) {
                case 'nome': this.setState({erro: erro.msg[0].nome}); break;

                case 'email': this.setState({erro: erro.msg[0].email}); break;

                case 'senha': this.setState({erro: erro.msg[0].senha}); break;

                default: break;
            }
        });

        PubSub.subscribe('erro-validacao-livro', (topico, erro) => {
            switch(this.props.name) {
                case 'titulo': this.setState({erro: erro.msg[0].titulo}); break;

                case 'preco': this.setState({erro: erro.msg[0].preco}); break;

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