import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import './css/custom.css';
import AutorBox from './autores/form';


class App extends Component {
	
	constructor() {
		super();
		this.state = { lista: [] };
	}	

	render() {
		return (
			<div id="layout">
	
				<a href="#menu" id="menuLink" className="menu-link">	
					<span></span>
				</a>
	
				<div id="menu">
					<div className="pure-menu">
						<a className="pure-menu-heading">Company</a>
	
						<ul className="pure-menu-list">
							<li className="pure-menu-item"><a className="pure-menu-link">Home</a></li>
							<li className="pure-menu-item"><a className="pure-menu-link">Autor</a></li>
							<li className="pure-menu-item"><a className="pure-menu-link">Livro</a></li>
						</ul>
					</div>
				</div>
	
				<div id="main">
					<div className="header">
						<h1>Cadastro de autores</h1>
					</div>
	
					<div className="content" id="content">
						<AutorBox />
					</div>	
				</div>	
			</div>
		);
	}
}


export default App;