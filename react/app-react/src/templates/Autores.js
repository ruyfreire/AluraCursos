import React, { Component } from 'react';
import PubSub from 'pubsub-js';

import TratarErros from '../help/TratarErros';
import InputCustom from '../components/Inputs';
import ButtomCustom from '../components/Buttoms';

class FormAutor extends Component {

    constructor() {
		super();
		this.state = { nome: '', email: '', senha: '' };
		// this.enviaForm = this.enviaForm.bind(this);
		this.setNome = this.setNome.bind(this);
		this.setEmail = this.setEmail.bind(this);
		this.setSenha = this.setSenha.bind(this);
    }

    enviaForm(evento) {
        evento.preventDefault();
        PubSub.publish('limpa-erros', {});

		fetch('http://localhost:3003/autores/cadastrar', {
			headers: new Headers( {'Content-Type': 'application/json'} ),
			method: 'post',
			body: JSON.stringify({
				nome: this.state.nome,
				email: this.state.email,
				senha: this.state.senha
			})
		})
		.then( resp => {
			if(resp.status !== 201) {
				resp.json()
				.then(error => {
					new TratarErros().validaAutor(error);
				})
			}
			else {
				resp.json()
				.then(data => {
                    PubSub.publish('atualiza-lista-autores', data);
                    this.setState({nome:'',email:'',senha:''});                    

                    // chamando callback de atualiza, método sem o middleware (pubsub)
					// this.props.atualiza(data);
				})
			}
		})
		.catch(err => {console.log(err)});
	}

	setNome(evento) {
		this.setState({ nome: evento.target.value});
	}
	setEmail(evento) {
		this.setState({ email: evento.target.value});
	}
	setSenha(evento) {
		this.setState({ senha: evento.target.value});
	}
    
    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm.bind(this)} method="post">
                    <InputCustom 
                        label="Nome"
                        id="nome"
                        type="text"
                        name="nome"
                        value={this.state.nome}
                        onChange={this.setNome} />

                    <InputCustom
                        label="Email"
                        id="email"
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.setEmail} />

                    <InputCustom
                        label="Senha"
                        id="senha"
                        type="password"
                        name="senha"
                        value={this.state.senha}
                        onChange={this.setSenha} />

                    <ButtomCustom
                        type="submit"
                        value="Gravar" />

                </form>
            </div>
        );
    }
}

class TabelaAutor extends Component {

    render() {
        return (
            <div>
                <table className="pure-table">

                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>email</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.props.lista.map(autor => {
                                return (
                                    <tr key={autor.id}>
                                        <td>{autor.nome}</td>
                                        <td>{autor.email}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </table>
            </div>
        );
    }    
}

export default class AutorBox extends Component {

    constructor() {
        super();
        this.state = { lista: [] };
        // this.atualizaLista = this.atualizaLista.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:3003/autores')
        .then(resp => {
            if(resp.status != 200) {
                console.log('Erro na requisição dos dados!');
                return;
            }
            else {
                resp.json()
                .then( data => {
                    this.setState({ lista: data });
                })
            }
        })
        .catch(err => {console.log(err)});

        PubSub.subscribe('atualiza-lista-autores',
            (topico, novaLista) => this.setState({lista: novaLista}) );
    }

    // ==== metodo para atualizar sem o middleware (pubsub) ====
    // atualizaLista(lista) {
    //     this.setState({ lista })
    // }
    
    render() {
        return(
            <div>
                <div className="header">
                    <h1>Cadastro de Autores</h1>
                </div>

                <div className="content" id="content">
                    {/* // ==== metodo para atualizar sem o middleware (pubsub) ==== */}
                    {/* <FormAutor atualiza={this.atualizaLista}/> */}

                    {/* // ==== não chama callback, porque usa o middleware (pubsub) ==== */}
                    <FormAutor/>

                    <TabelaAutor lista={this.state.lista}/>
                </div>
            </div>
        );
    }
}