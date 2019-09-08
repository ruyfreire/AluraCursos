let estante = document.querySelector('.dados');

fetch('http://localhost:3000/livros', 
{
    method: 'GET'
})
.then(res => res.json())
.then(livros => {
    livros.forEach(livro => {
        
        let divli = document.createElement('li');
        divli.classList.add('livro');

        let li1 = document.createElement('li');
        let li2 = document.createElement('li');
        let li3 = document.createElement('li');
        // li.innerHTML = `<li class="titulo"><span>${livro.titulo}</span><li>`;
        // estante.innerHTML = `<li class="preco"><span>${livro.preco}</span><li>`;
        // estante.innerHTML = `<li class="descricao"><span>${livro.descricao}</span><li>`;
        li1.innerHTML = livro.titulo;
        li2.innerHTML = livro.preco;
        li3.innerHTML = livro.descricao;

        divli.appendChild(li1);
        divli.appendChild(li2);
        divli.appendChild(li3);

        estante.appendChild(divli);
        // estante.appendChild(li2);
        // estante.appendChild(li3);
        // ul.appendChild(li2);
        // ul.appendChild(li3);
        // estante.appendChild(ul);
    })
}).catch(erro => console.log('não retornou dados!'));