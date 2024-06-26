let input = document.getElementById("input");
let searchBtn = document.getElementById("search-btn");
let resultado = document.getElementById("resultado");

let filmesAssistir = [];
let filmesAssistidos = [];
let minhaLista = [];

// Função para salvar a lista de filmes no localStorage
function salvarLista() {
    localStorage.setItem('filmesAssistir', JSON.stringify(filmesAssistir));
}

// Função para carregar a lista de filmes do localStorage
function carregarLista() {
    const filmes = localStorage.getItem('filmesAssistir');
    if (filmes) {
        filmesAssistir = JSON.parse(filmes);
    }
}

// Função para adicionar um filme à lista
function marcarComo(status) {
    let select = document.getElementById('selectFilmes');
    let nomeFilme = select.options[select.selectedIndex].text;

    if (status === 'assistir' && select.selectedIndex !== 0) {
        // Verifica se o filme já está na lista
        if (filmesAssistir.includes(nomeFilme)) {
            alert(`O filme "${nomeFilme}" já está na lista.`);
        } else {
            filmesAssistir.push(nomeFilme);
            salvarLista();
            atualizarLista();
            alert(`Filme "${nomeFilme}" adicionado à lista para assistir!`);
        }
    } else {
        alert('Por favor, selecione um filme antes de adicionar à lista.');
    }
}

// Função para atualizar a lista de filmes exibida na página
function atualizarLista() {
    let filmesSelecionados = document.getElementById('filmesSelecionados');
    filmesSelecionados.innerHTML = ''; // Limpa a lista antes de atualizar

    // Adiciona cada filme à lista
    filmesAssistir.forEach((filme) => {
        let novoItem = document.createElement('li');
        novoItem.textContent = filme;
        filmesSelecionados.appendChild(novoItem);
    });
}

// Função para carregar a lista de filmes ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarLista();
    atualizarLista(); // Adiciona os filmes à lista ao carregar a página
});

// Função para remover um filme da lista
function removerFilme(nomeFilme) {
    filmesAssistir = filmesAssistir.filter(filme => filme !== nomeFilme);
    salvarLista();
    atualizarLista();
    alert(`Filme "${nomeFilme}" removido da lista!`);
}

// Função para atualizar a lista de filmes exibida na página
function atualizarLista() {
    let filmesSelecionados = document.getElementById('filmesSelecionados');
    filmesSelecionados.innerHTML = ''; // Limpa a lista antes de atualizar

    // Adiciona cada filme à lista com um botão de remover
    filmesAssistir.forEach((filme) => {
        let novoItem = document.createElement('li');
        novoItem.textContent = filme;

        // Criação do botão de remover
        let btnRemover = document.createElement('button');
        btnRemover.textContent = 'Remover';
        btnRemover.className = 'botao-remover';
        btnRemover.onclick = function () { removerFilme(filme); };

        novoItem.appendChild(btnRemover);
        filmesSelecionados.appendChild(novoItem);
    });
}

let getMovie = () => {
    const value = input.value;
    let url = `https://sujeitoprogramador.com/r-api/?api=filmes/${value}`;

    console.log(url);
    // Caso o campo de entrada esteja vazio
    if (value.length <= 0) {
        resultado.innerHTML = `<h3 class="msg">Por favor insira um nome de um filme</h3>`;
    } else {
        fetch(url)
            .then(resp => resp.json())
            .then((data) => {
                console.log(data.foto);
                console.log(data.id);
                console.log(data.nome);
                console.log(data.sinopse);

                resultado.innerHTML = `
                    <div class="info">
                        <img src="${data.foto}" class="foto">
                        <h2>${data.nome}</h2>
                        <p>${data.sinopse}</p>
                        <div class="tarefas">
                        <button id="btnMinhaLista" onclick="adicionarALista(${data.id})">Minha Lista</button>
                    </div>
                </div>
            
                    </div>
                `;
                // Adiciona evento de clique ao botão "Minha Lista" que foi inserido no resultado
                document.querySelector('.info button:last-of-type').addEventListener('click', function () {
                    window.location.href = 'minhaLista.html';
                });

            })
            .catch(error => {
                resultado.innerHTML = `<h3 class="msg">Ocorreu um erro ao buscar o filme. Tente novamente mais tarde.</h3>`;
                console.error('Erro:', error);
            });
    }
};

searchBtn.addEventListener("click", getMovie);
