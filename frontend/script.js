const resultado =
document.getElementById('resultado');

async function buscarCategorias() {

    const resposta =
    await fetch(
        'http://localhost:3000/categorias'
    );

    const dados =
    await resposta.json();

    resultado.innerHTML =
    JSON.stringify(dados, null, 2);
}

async function buscarProdutos() {

    const resposta =
    await fetch(
        'http://localhost:3000/produtos'
    );

    const dados =
    await resposta.json();

    resultado.innerHTML =
    JSON.stringify(dados, null, 2);
}

async function buscarMouses() {

    const resposta =
    await fetch(
        'http://localhost:3000/produtos/categoria/1'
    );

    const dados =
    await resposta.json();

    resultado.innerHTML =
    JSON.stringify(dados, null, 2);
}