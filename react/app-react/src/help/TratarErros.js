import PubSub from 'pubsub-js';

export default class TratarErros {
    validaCampo(erros) {
        if(erros.qtd > 0) PubSub.publish('erro-validacao', erros);
    }
}