var rodada = 1;
var pontuacao = [0,0,0];

window.onload = function(){
	//evento de click ou enter no menu, para pegar os nomes e inicia o jogo
	document.querySelector("#botao-iniciar").onclick = function(){iniciarJogo();};
	window.onkeypress = function(tecla){
		if(tecla.which == 13 || tecla.keyCode == 13){
			iniciarJogo();}};

	//zera tudo e reinicia o jogo
	document.querySelector("#reiniciar-jogo").onclick = function(){reiniciar();};
};

function iniciarJogo() {
	rodada = 1;
	pontuacao = [0,0,0];

	//valida a digitação dos apelidos dos jogadores
	
	var nome = document.querySelector("#nome-jogador-1").value;
	if(nome == ""){
		alert('Apelido do jogador 1 não foi preenchido');
		return false;
	}

	var nome = document.querySelector("#nome-jogador-2").value;
	if(nome == ""){
		alert('Apelido do jogador 2 não foi preenchido');
		return false;
	}
	
	//exibir os apelidos
	document.querySelector("#jogador-1 span").innerHTML = document.querySelector("#nome-jogador-1").value;
	document.querySelector("#jogador-2 span").innerHTML = document.querySelector("#nome-jogador-2").value;


	//destacar jogar atual
	document.querySelector("#jogador-1 img").classList.remove("jogador-esperando");
	document.querySelector("#jogador-2 img").classList.add("jogador-esperando");

	//exibe tabuleiro e esconde menu
	document.querySelector("#menu").classList.add("invisivel");
	document.querySelector("#palco-jogo").classList.remove("invisivel");

	//andamento do jogo - capta eventos click no tabuleiro
	var tabelaTd = document.querySelectorAll("td");
	for (var i = 0; i < tabelaTd.length; i++) {
		tabelaTd[i].addEventListener("click", marcarTabuleiro);
	}

	//exibe botao reiniciar
	document.querySelector("#reiniciar-jogo").classList.remove("invisivel");
}

function marcarTabuleiro(event) {
	if((rodada % 2) == 1){
		//remove evento de click
		event.target.removeEventListener("click", marcarTabuleiro);
		//coloca imagem da jogada
		event.target.classList.add("jogada-1");
		//coloca ponto
		event.target.setAttribute("data-ponto", "-1");
		//destaca jogador atual
		document.querySelector("#jogador-2 img").classList.remove("jogador-esperando");
		document.querySelector("#jogador-1 img").classList.add("jogador-esperando");
	} else {
		//remove evento de click
		event.target.removeEventListener("click", marcarTabuleiro);
		//coloca imagem da jogada
		event.target.classList.add("jogada-2");
		//coloca ponto
		event.target.setAttribute("data-ponto", "1");
		//destaca jogador atual
		document.querySelector("#jogador-1 img").classList.remove("jogador-esperando");
		document.querySelector("#jogador-2 img").classList.add("jogador-esperando");
	}
	rodada++;
	verifica_combinacao();	
}

function verifica_combinacao(){
	var campos = document.querySelectorAll("td");

	//linhas
	pontuacao = [0,0,0];
	for(var i = 0; i < 9; i++) {
		if(i <= 2){
			pontuacao[0] = pontuacao[0] + (parseInt(campos[i].getAttribute("data-ponto")));
		}
		if(i >= 3 && i <= 5){
			pontuacao[1] = pontuacao[1] + (parseInt(campos[i].getAttribute("data-ponto")));
		}
		if(i >= 6 && i <= 8){
			pontuacao[2] = pontuacao[2] + (parseInt(campos[i].getAttribute("data-ponto")));
		}
	}
	ganhador(pontuacao);


	//colunas
	pontuacao = [0,0,0];
	for(var i = 0; i < 9; i++) {
		if(i == 0 || i == 3 || i == 6){
			pontuacao[0] = pontuacao[0] + (parseInt(campos[i].getAttribute("data-ponto")));
		}
		if(i == 1 || i == 4 || i == 7){
			pontuacao[1] = pontuacao[1] + (parseInt(campos[i].getAttribute("data-ponto")));
		}
		if(i == 2 || i == 5 || i == 8){
			pontuacao[2] = pontuacao[2] + (parseInt(campos[i].getAttribute("data-ponto")));
		}
	}
	ganhador(pontuacao);
	

	//verificar na diagonal
	pontuacao = [0,0,0];
	pontuacao[0] = pontuacao[0] + (parseInt(campos[0].getAttribute("data-ponto")))
								+ (parseInt(campos[4].getAttribute("data-ponto")))
								+ (parseInt(campos[8].getAttribute("data-ponto")));
	ganhador(pontuacao);


	pontuacao = [0,0,0];
	pontuacao[0] = pontuacao[0] + (parseInt(campos[2].getAttribute("data-ponto")))
								+ (parseInt(campos[4].getAttribute("data-ponto")))
								+ (parseInt(campos[6].getAttribute("data-ponto")));
	ganhador(pontuacao);
}

function ganhador(pontos){
	for(var i = 0; i < 3; i++){

		//vitoria jogador 1
		if(pontos[i] == -3){
			var nomeJogador = document.querySelector("#jogador-1 span").textContent;
			fimDeJogo(nomeJogador, 1);
			rodada = 0;
			return false;
		}
		//vitoria jogador 2
		else if(pontos[i] == 3){
			var nomeJogador = document.querySelector("#jogador-2 span").textContent;
			fimDeJogo(nomeJogador, 2);
			rodada = 0;
			return false;
		}
		
		//game over
		if(rodada == 10){
			document.querySelector("#resultado").innerHTML("Nenhum ganhador!");
			document.querySelector("#resultado").classList.remove("invisivel");
			document.querySelector("#reiniciar-jogo").classList.remove("invisivel");
		}
	}
}

function fimDeJogo(nome, jogador){
	//remove click do tabuleiro
	var tabelaTd = document.querySelectorAll("td");
	for (var i = 0; i < tabelaTd.length; i++) {
		tabelaTd[i].removeEventListener("click", marcarTabuleiro);
	}

	//exibe o vencedor
	document.querySelector("#resultado").innerHTML = nome + " é o vencedor!";
	document.querySelector("#resultado").classList.remove("invisivel");

	if(jogador == 1){
		//jogador 1 ganhou
		document.querySelector("#jogador-1 img").classList.remove("jogador-esperando");
		document.querySelector("#jogador-2 img").classList.add("jogador-esperando");
	}else{
		//jogador 2 ganhou
		document.querySelector("#jogador-2 img").classList.remove("jogador-esperando");
		document.querySelector("#jogador-1 img").classList.add("jogador-esperando");
	}	
}

function reiniciar(){
	//remove click do tabuleiro
	var tabelaTd = document.querySelectorAll("td");
	for (var i = 0; i < tabelaTd.length; i++) {
		tabelaTd[i].removeEventListener("click", marcarTabuleiro);
	}

	//zerar tabuleiro
	var tabuleiro = document.querySelectorAll("td");
	for(var i = 0; i < 9; i++){
		tabuleiro[i].setAttribute("data-ponto", 0);
		tabuleiro[i].classList.remove("jogada-1", "jogada-2");
	}

	//remove mensagem de fim de jogo
	document.querySelector("#resultado").innerHTML = "";
	document.querySelector("#resultado").classList.add("invisivel");

	//remove botao reiniciar
	document.querySelector("#reiniciar-jogo").classList.add("invisivel");

	//retorna a tela de menu
	document.querySelector("#menu").classList.remove("invisivel");
	document.querySelector("#palco-jogo").classList.add("invisivel");
}