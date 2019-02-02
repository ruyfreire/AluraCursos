export function logarTempoDeExecucao(emSegundos: boolean = false) {

    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const metodoOriginal = descriptor.value;

        descriptor.value = function(...args: any[]) {
            let unidade = 'ms';
            let divisor = 1;
            if(emSegundos){
                unidade = 's';
                divisor = 1000;
            }

            console.log("============ INICIO ============");
            console.log(`Os parâmetros passados para o método ${propertyKey} são ${JSON.stringify(args)}`);
            const t1 = performance.now();
            
            const retorno = Reflect.apply(metodoOriginal, this, args);
            
            const t2 = performance.now();
            console.log(`O método demorou ${(t2 - t1)/divisor} ${unidade}`);
            console.log(`O retorno do método ${propertyKey} é ${JSON.stringify(retorno)}`);
            console.log("============ FIM ============");
            
            return retorno;
        }

        return descriptor;
    }
}