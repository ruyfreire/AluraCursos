import React, { Component } from 'react';

import InputCustom from '../customs/inputs';
import ButtomCustom from '../customs/buttoms';

class FormAutor extends Component {

    constructor() {
		super();
		this.state = { nome: '', email: '', senha: '' };
		this.enviaForm = this.enviaForm.bind(this);
		this.setNome = this.setNome.bind(this);
		this.setEmail = this.setEmail.bind(this);
		this.setSenha = this.setSenha.bind(this);
    }

    enviaForm(evento) {
		evento.preventDefault();
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
			if(resp.status != 201) {
				resp.json()
				.then(data => {
					console.log(data);
				})
			}
			else {
				resp.json()
				.then(data => {
					this.props.atualiza(data);
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
        this.atualizaLista = this.atualizaLista.bind(this);
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
    }

    atualizaLista(lista) {
        this.setState({ lista })
    }
    
    render() {
        return(
            <div>
                <FormAutor atualiza={this.atualizaLista}/>

                <TabelaAutor lista={this.state.lista}/>
            </div>
        );
    }
}