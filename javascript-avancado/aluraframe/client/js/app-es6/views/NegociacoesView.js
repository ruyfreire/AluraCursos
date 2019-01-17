import {View} from "./View";
import {DateHelper} from "../helpers/DateHelper";
import {currentInstance} from '../controllers/NegociacaoController';

export class NegociacoesView extends View {

    constructor(elemento) {
        super(elemento);

        elemento.addEventListener('click', function(event){
                if(event.target.nodeName == 'TH')
                    currentInstance().ordena(event.target.textContent.toLowerCase());
        });

    }

    template(modelo) {

        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th style="cursor: pointer">DATA</th>
                    <th style="cursor: pointer">QUANTIDADE</th>
                    <th style="cursor: pointer">VALOR</th>
                    <th style="cursor: pointer">VOLUME</th>
                </tr>
            </thead>
            
            <tbody>
                ${modelo.listaNegociacoes.map(n => `
                    <tr>
                        <td>${DateHelper.dataParaTexto(n.data)}</td>
                        <td>${n.quantidade}</td>
                        <td>${n.valor}</td>
                        <td>${n.volume}</td>
                    </tr>
                `).join('')}
            </tbody>
            
            <tfoot>
                <td colspan="3"></td>
                <td> ${modelo.volumeTotal} </td>
            </tfoot>
        </table>
        `;
    }

}