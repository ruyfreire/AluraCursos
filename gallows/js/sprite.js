const createSprite = forca => {
    const $el = $(forca);

    const frames = [
        'frame1', 'frame2', 'frame3', 'frame4', 'frame5',
        'frame6', 'frame7', 'frame8', 'frame9'
    ];

    let atual = 0;
    const final = frames.length -1; 
    $el.addClass(frames[atual]);  

    //verifica se possui um proximo frame e retorna positivo ou negativo
    const hasNext = () => atual + 1 <= final;

    //caso tenha prox frame, chama a função para mudar de frame, 
    //passando o frame e remover, e qual adicionar
    const nextFrame = () => { 
        if(hasNext())
            moveFrame(frames[atual], frames[++atual]);
    }

    //recebe o frame atual e o nome do prox,
    //remove a classe para sair o frame atual,
    //e adiciona a nova, para o prox frame
    const moveFrame = (from, to) =>  $el.removeClass(from).addClass(to);

    //verifica hasNext para saber se chegou ao final
    const isFinished = () => !hasNext();

    //reseta o jogo, passando para a função moveFrame, o frame atual para remover
    //e passando o nome do primeiro frame para usar no lugar
    const reset = () => {
        moveFrame(frames[atual], 'frames1');
        atual = 0;
    }

    //retorna um objeto, com a propriedade proxQuadro
    //que contem a funcao nextframe
    return { 
        nextFrame,
        isFinished,
        reset
    };
}