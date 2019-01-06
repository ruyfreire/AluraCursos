const criaController = jogo => {

    const $entrada = $('#entrada');
    const $lacunas = $('.lacunas');

    const exibeLacunas = () => {
        $lacunas.empty();
        const palavra = jogo.getLacunas();
        for(i = 0; i < palavra.length; i++){
            $lacunas.append(criaLi(palavra[i]));
        }
    }
    const criaLi = valor => {
        const li = $("<li>").addClass("lacuna").text(valor);
        return li;
    }

    const mudaPlaceHolder = texto => $entrada.attr("placeholder", texto).val('');

    const guardaPalavraSecreta = () => jogo.setPalavraSecreta($entrada.val());

    const testaPalavra = () => {
        const digitado = $entrada.val();
        const exp = /[^A-Za-z]/g;
        if ( digitado != '' && !exp.exec(digitado) ) {
            return true;
        } else {
            $entrada.val('');
            return false;
        }
    }

    const testaChute = () => {
        const letra = $entrada.val();
        if (letra.length == 1 && testaPalavra()) {
            jogo.processaChute(letra);     
            exibeLacunas();
        }
        else alert("Entrada inválida");
        $entrada.val('');
    }

    const reiniciaJogo = () => {
        $lacunas.empty();
        mudaPlaceHolder("Palavra secreta");
        jogo.reinicia();
    }

    const verifica = () => {
        if(jogo.ganhouOuPerdeu()){
            if (jogo.ganhou())
            alert("Parabéns, você ganhou!");
            else if (jogo.perdeu())
            alert("Que pena, você perdeu!");

            reiniciaJogo();
        }
    }

    const inicia = () => {
        $entrada.keypress( tecla => {
            if (tecla.which == 13) {
                switch (jogo.getEtapa()) {
                    case 1:
                        if (testaPalavra()) {
                            guardaPalavraSecreta();
                            exibeLacunas();
                            mudaPlaceHolder("Chute");
                        }
                        else alert("Entrada inválida");
                        break;
                    case 2:
                        testaChute();
                        setTimeout( () => verifica(), 200);
                        break;
                }
            }
        });
    }

    return { inicia };
}