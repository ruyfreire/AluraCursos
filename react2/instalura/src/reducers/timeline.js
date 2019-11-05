import { List } from 'immutable'; 

function trocaFoto(lista, fotoId, callbackAtualizaPropriedades){

    const fotoEstadoAntigo = lista.find(foto => foto.id === fotoId);        
    const novasPropriedades = callbackAtualizaPropriedades(fotoEstadoAntigo);

    const fotoEstadoNovo = Object.assign({},fotoEstadoAntigo,novasPropriedades);
    const indiceDaLista = lista.findIndex(foto => foto.id === fotoId);

    return lista.set(indiceDaLista, fotoEstadoNovo);
}

export default function timeline (state=[], action) {

    switch(action.type) {

        case 'LISTAGEM':
        return new List(action.fotos);


        case 'LIKE':
            return trocaFoto(state, action.fotoId, (fotoAchada) => {
                const liked = fotoAchada.likers.find(liker => liker.login === action.novosLikers.login );
                let likersAtt;
                if(liked === undefined) {
                    likersAtt = fotoAchada.likers.concat(action.novosLikers);
                }
                else {
                    likersAtt = fotoAchada.likers.filter(liker => liker.login !== action.novosLikers.login);
                }
                const likeada = !fotoAchada.likeada;
                return {likeada, likers: likersAtt};
            });
            

        case 'COMENTAR':
            return trocaFoto(state, action.fotoId, (fotoAchada) => {
                const novosComentarios = fotoAchada.comentarios.concat(action.comentarios);
                return {comentarios: novosComentarios};
            });


        case 'PESQUISA':
        return new List(action.fotos);

        
        default:
        return state;
    }
}