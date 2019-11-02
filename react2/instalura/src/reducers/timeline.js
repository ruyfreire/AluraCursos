export default function timeline (state=[], action) {

    switch(action.type) {

        case 'LISTAGEM':
        return action.fotos;


        case 'LIKE':
            const fotoAchada = state.find(foto => foto.id === action.fotoId);
            const liked = fotoAchada.likers.find(liker => liker.login === action.novosLikers.login);
            if(liked === undefined) {
                fotoAchada.likers.push(action.novosLikers);
            }
            else {
                const likersAtt = fotoAchada.likers.filter(liker => liker.login !== action.novosLikers.login);
                fotoAchada.likers = likersAtt;
            }
            fotoAchada.likeada = !fotoAchada.likeada;
        return state;
            

        case 'COMENTAR':
            const fotoAchadaComentario = state.find(foto => foto.id === action.fotoId);
            fotoAchadaComentario.comentarios.push(action.comentarios);
        return state;


        case 'PESQUISA':
        return action.fotos;

        
        default:
        return state;
    }
}