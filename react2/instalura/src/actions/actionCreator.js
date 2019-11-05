export function listagem(fotos){
    return {type:'LISTAGEM',fotos};
}

export function comenta(fotoId, comentarios){
    return {type:'COMENTAR', fotoId, comentarios};
}

export function like(fotoId, novosLikers){
    return {type:'LIKE',fotoId, novosLikers};    
}

export function pesquisa(fotos){
    return { type:'PESQUISA', fotos };  
}

export function notifica(msg){
    return {type:'ALERT',msg};
}