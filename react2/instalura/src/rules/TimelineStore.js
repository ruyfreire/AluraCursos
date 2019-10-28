import pubsub from 'pubsub-js';

export default class TimelineStore {

    constructor(fotos) {
        this.fotos = fotos;
    }

    subscribe(callback){
        pubsub.subscribe('timeline', (topico, fotos) => {
            callback(fotos);
        });        
    }

    carregaFotos(login) {
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
                this.fotos = fotos;
                pubsub.publish('timeline', this.fotos);
            });
    }

    likear = (fotoId) => {
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
                const fotoAchada = this.fotos.find(foto => foto.id === fotoId);
                const liked = fotoAchada.likers.find(liker => liker.login === novosLikers.login);
                if(liked === undefined) {
                    fotoAchada.likers.push(novosLikers);
                }
                else {
                    const likersAtt = fotoAchada.likers.filter(liker => liker.login !== novosLikers.login);
                    fotoAchada.likers = likersAtt;
                }
                fotoAchada.likeada = !fotoAchada.likeada;
                pubsub.publish('timeline', this.fotos);
            })
            .catch(error => {console.log(error)});
    }

    comentar = (fotoId, comentario) => {
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
            comentario.value = '';
            const fotoAchada = this.fotos.find(foto => foto.id === fotoId);
            fotoAchada.comentarios.push(comentarios);
            pubsub.publish('timeline', this.fotos);
        })
        .catch(error => { console.log(error) });
    }

    pesquisar = (pesquisa) => {
        fetch(`https://instalura-api.herokuapp.com/api/public/fotos/${pesquisa.value}`)
            .then(resp => resp.json())
            .then(fotos => {
                pubsub.publish('timeline', fotos);
                pesquisa.value = '';
            })
            .catch(erro => { console.log('usuário não encontrado!')});
    }
}