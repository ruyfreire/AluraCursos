export default class TimelineStore {

    static carregaFotos(login) {
        return dispatch => {
            let url = '';
            if(login !== undefined) {
                url = `https://instalura-api.herokuapp.com/api/public/fotos/${login}`;
            }
            else {
                url = `https://instalura-api.herokuapp.com/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
            }
    
            fetch(url)
                .then(resp => resp.json())
                .then(fotos => {
                    dispatch({ type: 'LISTAGEM', fotos });
                    return fotos;
                });
        }
    }

    static likear = (fotoId) => {
        return dispatch => {
            fetch(`https://instalura-api.herokuapp.com/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, { method: 'POST' })
                .then(resp => {
                    if(resp.ok) {
                        return resp.json();
                    }
                    else {
                        throw new Error('Não foi possível dar like!');
                    }
                })
                .then(novosLikers => {
                    dispatch({ type: 'LIKE', fotoId, novosLikers });
                    return novosLikers;
                })
                .catch(error => {console.log(error)});
        }
    }

    static comentar = (fotoId, comentario) => {
        return dispatch => {
            fetch(`https://instalura-api.herokuapp.com/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,
            {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({texto: comentario.value})
            })
            .then(resp => {
                if(resp.ok) {
                    return resp.json();
                }
                else {
                    throw new Error('Não foi possível comentar na foto!');
                }
            })
            .then(comentarios => {
                dispatch({ type:'COMENTAR', fotoId, comentario, comentarios });
                comentario.value = '';
                return comentarios;
            })
            .catch(error => { console.log(error) });
        }
    }

    static pesquisar = (pesquisa) => {
        return dispatch => {
            fetch(`https://instalura-api.herokuapp.com/api/public/fotos/${pesquisa.value}`)
                .then(resp => resp.json())
                .then(fotos => {
                    dispatch({ type:'PESQUISA', pesquisa, fotos });
                    pesquisa.value = '';
                    return fotos;
                })
                .catch(erro => { console.log('usuário não encontrado!')});
        }
    }
}