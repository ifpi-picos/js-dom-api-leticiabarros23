let input = document.getElementById("input");
let searchBtn = document.getElementById("search-btn");
let resultado = document.getElementById("resultado");

let filmesAssistir = [];
let filmesAssistidos = [];
let minhaLista = [];

function marcarComo(status, id) {
    if (status === 'assistir') {
        filmesAssistir.push(id);
    } else if (status === 'assistido') {
        filmesAssistidos.push(id);
    }
    alert(`Filme marcado como "${status}" com sucesso!`);
}

function adicionarALista(id) {
    minhaLista.push(id);
    alert('Filme adicionado à sua lista!');
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
                        <button onclick="marcarComo('assistir', ${data.id})">Assistir</button>
                        <button onclick="marcarComo('assistido', ${data.id})">Assistido</button>
                        <button onclick="adicionarALista(${data.id})">Minha Lista</button>
                    </div>
                </div>
            
                    </div>
                `;
            })
            .catch(error => {
                resultado.innerHTML = `<h3 class="msg">Ocorreu um erro ao buscar o filme. Tente novamente mais tarde.</h3>`;
                console.error('Erro:', error);
            });
    }
};

searchBtn.addEventListener("click", getMovie);
