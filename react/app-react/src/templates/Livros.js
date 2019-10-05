import React, { Component } from 'react';
import PubSub from 'pubsub-js';

import TratarErros from '../help/TratarErros';
import InputCustom from '../components/Inputs';
import ButtomCustom from '../components/Buttoms';
import SelectCustom from '../components/Selects';

class FormLivro extends Component {

    constructor() {
		super();
        this.state = { titulo: '', preco: '', autorId: 0 };
        this.setTitulo = this.setTitulo.bind(this);
    }

    enviaForm = (evento) => {
        evento.preventDefault();
        PubSub.publish('limpa-erros', {});

		fetch('http://localhost:3003/livros/cadastrar', {
			headers: new Headers( {'Content-Type': 'application/json'} ),
			method: 'post',
			body: JSON.stringify({
				titulo: this.state.titulo,
				preco: this.state.preco,
				autorId: this.state.autorId
			})
		})
		.then( resp => {
			if(resp.status !== 201) {
				resp.json()
				.then(error => {
					new TratarErros().validaLivro(error);
				})
			}
			else {
				resp.json()
				.then(data => {
                    PubSub.publish('atualiza-lista-livros', data);
                    this.setState({titulo:'',preco:'',autorId:''});

                    // chamando callback de atualiza, método sem o middleware (pubsub)
					// this.props.atualiza(data);
				})
			}
		})
		.catch(err => {console.log(err)});
	}

	setTitulo(evento) { this.setState({ titulo: evento.target.value}); }
	setPreco = (evento) => this.setState({ preco: evento.target.value});
	setAutorId = (evento) => this.setState({ autorId: evento.target.value});
    
    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                    <InputCustom 
                        label="Título"
                        id="titulo"
                        type="text"
                        name="titulo"
                        value={this.state.titulo}
                        onChange={this.setTitulo} />

                    <InputCustom
                        label="Preço"
                        id="preco"
                        type="number"
                        name="preco"
                        value={this.state.preco}
                        onChange={this.setPreco} />

                    <SelectCustom
                        label="Autor"
                        id="autor"
                        name="autor"
                        value={this.state.autorId}
                        onChange={this.setAutorId}
                        autores={this.props.autores} />

                    <ButtomCustom
                        type="submit"
                        value="Gravar" />

                </form>
            </div>
        );
    }
}

class TabelaLivro extends Component {

    render() {
        return (
            <div>
                <table className="pure-table">

                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Preço</th>
                            <th>Autor</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.props.livros.map(livro => {
                                return (
                                    <tr key={livro.id}>
                                        <td>{livro.titulo}</td>
                                        <td>{livro.preco}</td>
                                        <td>{livro.nomeAutor}</td>
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


export default class LivroBox extends Component {

    constructor() {
        super();
        this.state = { livros: [], autores: [] };
    }

    componentDidMount() {
        fetch('http://localhost:3003/livros')
        .then(resp => {
            if(resp.status != 200) {
                console.log(resp);
                return;
            }
            else {
                resp.json()
                .then( data => {
                    this.setState({ livros: data });
                })
            }
        })
        .catch(err => {console.log(err)});

        PubSub.subscribe('atualiza-lista-livros',
            (topico, novaLista) => this.setState({livros: novaLista}) );



        fetch('http://localhost:3003/autores')
            .then(resp => {
                if(resp.status != 200) {
                    console.log(resp);
                    return;
                }
                else {
                    resp.json()
                    .then( data => {
                        this.setState({ autores: data });
                    })
                }
            })
            .catch(err => {console.log(err)});
    }

    render() {
        return(
            <div>
                <div className="header">
                    <h1>Cadastro de livros</h1>
                </div>

                <div className="content" id="content">
                    <FormLivro autores={this.state.autores}/>

                    <TabelaLivro livros={this.state.livros}/>
                </div>
            </div>
        );
    }
}