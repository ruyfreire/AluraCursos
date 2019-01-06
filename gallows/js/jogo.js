const criaJogo = sprite => {
    let palavraSecreta = [];
    let lacunas = [];
    let etapa = 1;
    let acertos = 0;

    const processaChute = chuteInit => {
        const chute = chuteInit.toUpperCase();
        let achou = false;
        for(var i = 0; i < palavraSecreta.length; i++){
            if(chute == palavraSecreta[i]){
                lacunas[i] = chute;
                achou = true;
                acertos++;
            }
        }
        if(!achou) sprite.nextFrame();
        return achou;
    }

    // recebe a Secreta secreta e deve atribuí-la à variável `palavraSecreta`. Vai para a próxima etapa
    const setPalavraSecreta = palavraInit => {
        const palavraFinal = palavraInit.toUpperCase();
        palavraSecreta = palavraFinal.split('');
        lacunas = Array(palavraFinal.length).fill('');
        etapa = 2;
    }
    
    // retorna as lacunas do jogo. Importante para quem for exibí-las.
    const getLacunas = () => lacunas;

    // retorna a etapa atual do jogo
    const getEtapa = () => etapa;

    //verifica se acertou todas a lacunas
    const ganhou = () => acertos > 0 && acertos == palavraSecreta.length;

    //verifica se exibiu todo o sprite(boneco)
    const perdeu = () => sprite.isFinished();

    //verifica as duas funções de ganhou e perdeu
    const ganhouOuPerdeu = () => ganhou() || perdeu();

    const reinicia = () => {
        etapa = 1;
        acertos = 0;
        palavraSecreta = [];
        lacunas = [];
        sprite.reset();
    }

    return {
        setPalavraSecreta,
        getLacunas,
        getEtapa,
        processaChute,
        ganhou,
        perdeu,
        ganhouOuPerdeu,
        reinicia
    };
}