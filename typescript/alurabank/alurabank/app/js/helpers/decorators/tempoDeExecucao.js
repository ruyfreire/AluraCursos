System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function logarTempoDeExecucao(emSegundos = false) {
        return function (target, propertyKey, descriptor) {
            const metodoOriginal = descriptor.value;
            descriptor.value = function (...args) {
                let unidade = 'ms';
                let divisor = 1;
                if (emSegundos) {
                    unidade = 's';
                    divisor = 1000;
                }
                console.log("============ INICIO ============");
                console.log(`Os parâmetros passados para o método ${propertyKey} são ${JSON.stringify(args)}`);
                const t1 = performance.now();
                const retorno = Reflect.apply(metodoOriginal, this, args);
                const t2 = performance.now();
                console.log(`O método demorou ${(t2 - t1) / divisor} ${unidade}`);
                console.log(`O retorno do método ${propertyKey} é ${JSON.stringify(retorno)}`);
                console.log("============ FIM ============");
                return retorno;
            };
            return descriptor;
        };
    }
    exports_1("logarTempoDeExecucao", logarTempoDeExecucao);
    return {
        setters: [],
        execute: function () {
        }
    };
});
