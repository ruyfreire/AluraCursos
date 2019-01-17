import {ProxyFactory} from "../services/ProxyFactory";

export class Bind {

    constructor(object, view, ...props){

        let proxy = ProxyFactory.create(
                object,
                props,
                object => view.update(object)
            );

        view.update(object);

        return proxy;
    }
}