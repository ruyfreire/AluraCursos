import PubSub from 'pubsub-js';

export default class TratarErros {
    validaLivro(erros) {
        if(erros.qtd > 0) PubSub.publish('erro-validacao-livro', erros);
    }
    validaAutor(erros) {
        if(erros.qtd > 0) PubSub.publish('erro-validacao-autor', erros);
    }
}