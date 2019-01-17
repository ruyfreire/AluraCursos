export class ProxyFactory {

    static create(object, props, acao) {

        let proxy = new Proxy( object ,{
            get(target, prop, receiver){
                if(props.includes(prop) && ProxyFactory._ehFuncao(target[prop]) ){
                    return function() {
                        let retorno = Reflect.apply(target[prop], target, arguments);
                        acao(target);
                        return retorno;
                    }
                }                
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver){
                let retorno = Reflect.set(target, prop, value, receiver);
                if(props.includes(prop)) acao(target);
                return retorno;
            }
        });


        return proxy;
    }

    static _ehFuncao(value) {

        return typeof(value) == typeof(Function);
    }
}