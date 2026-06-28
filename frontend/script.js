
let carrinho = [];


const resultado = document.getElementById("resultado");


const imagens = {

    "Dragonfly R1": "dragonfly.jpg",
    "M900 Pro": "m900.jpg",
    "G203": "g203.jpg",
    "Kumara K552": "kumara.jpg",
    "K617 Fizz": "k617.jpg",
    "PK Control 1": "pkcontrol.jpg",
    "G240": "g240.jpg",
    "Cloud Stinger": "cloud.jpg",
    "C920": "c920.jpg",
    "DualShock 4": "dualshock4.jpg"

};


function mostrarProdutos(produtos){

    resultado.innerHTML = "";

    produtos.forEach(produto => {

        const imagem = imagens[produto.nome] || "semimagem.jpg";

        resultado.innerHTML += `

        <div class="card">

            <img src="imagens/${imagem}" alt="${produto.nome}">

            <h2>${produto.nome}</h2>

            <p><strong>Marca:</strong> ${produto.marca}</p>

            <p><strong>Preço:</strong> R$ ${Number(produto.preco).toFixed(2)}</p>

            <button onclick='comprar(${JSON.stringify(produto)})'>
                🛒 Comprar
            </button>

        </div>

        `;

    });

}


async function buscarProdutos(){

    const resposta = await fetch(
        "http://localhost:3000/produtos"
    );

    const dados = await resposta.json();

    mostrarProdutos(dados);

}


async function buscarMouses(){

    const resposta = await fetch(
        "http://localhost:3000/produtos/categoria/1"
    );

    const dados = await resposta.json();

    mostrarProdutos(dados);

}


async function buscarCategorias(){

    const resposta = await fetch(
        "http://localhost:3000/categorias"
    );

    const dados = await resposta.json();

    resultado.innerHTML = "";

    dados.forEach(cat=>{

        resultado.innerHTML += `

        <div class="card">

            <h2>${cat.nome}</h2>

            <p>
                Categoria cadastrada no banco de dados.
            </p>

        </div>

        `;

    });

}


function comprar(produto){

    const existente = carrinho.find(item => item.id == produto.id);

    if(existente){

        existente.quantidade++;

    }else{

        carrinho.push({

            ...produto,

            quantidade:1

        });

    }

    atualizarContador();

}


function atualizarContador(){

    let total = 0;

    carrinho.forEach(item=>{

        total += item.quantidade;

    });

    document.getElementById("qtdCarrinho").innerHTML = total;

}

function abrirCarrinho(){

    atualizarCarrinho();

    document.getElementById("carrinho").style.display = "block";
    document.getElementById("overlay").style.display = "block";

}


function fecharCarrinho(){

    document.getElementById("carrinho").style.display = "none";
    document.getElementById("overlay").style.display = "none";

}


function atualizarCarrinho(){

    const lista = document.getElementById("listaCarrinho");

    lista.innerHTML = "";

    let total = 0;

    if(carrinho.length === 0){

        lista.innerHTML = `
            <p style="text-align:center;">
                Seu carrinho está vazio.
            </p>
        `;

        document.getElementById("totalCompra").innerHTML = "R$ 0,00";

        return;

    }

    carrinho.forEach(produto=>{

        const imagem = imagens[produto.nome] || "semimagem.jpg";

        total += Number(produto.preco) * produto.quantidade;

        lista.innerHTML += `

        <div class="itemCarrinho">

            <img src="imagens/${imagem}">

            <div class="infoCarrinho">

                <h3>${produto.nome}</h3>

                <p>${produto.marca}</p>

                <p><strong>R$ ${Number(produto.preco).toFixed(2)}</strong></p>

                <div class="quantidade">

                    <button onclick="diminuir(${produto.id})">-</button>

                    <span>${produto.quantidade}</span>

                    <button onclick="aumentar(${produto.id})">+</button>

                    <button
                        class="remover"
                        onclick="removerProduto(${produto.id})"
                    >
                        🗑
                    </button>

                </div>

            </div>

        </div>

        `;

    });

    document.getElementById("totalCompra").innerHTML =
        "R$ " + total.toFixed(2);

}


function aumentar(id){

    const produto = carrinho.find(item => item.id == id);

    produto.quantidade++;

    atualizarContador();

    atualizarCarrinho();

}


function diminuir(id){

    const produto = carrinho.find(item => item.id == id);

    produto.quantidade--;

    if(produto.quantidade <= 0){

        carrinho = carrinho.filter(item => item.id != id);

    }

    atualizarContador();

    atualizarCarrinho();

}

function removerProduto(id){

    carrinho = carrinho.filter(item => item.id != id);

    atualizarContador();

    atualizarCarrinho();

}


function limparCarrinho(){

    if(carrinho.length == 0){

        alert("O carrinho já está vazio.");

        return;

    }

    if(confirm("Deseja limpar o carrinho?")){

        carrinho = [];

        atualizarContador();

        atualizarCarrinho();

    }

}


function confirmarCompra(){

    if(carrinho.length == 0){

        alert("Seu carrinho está vazio!");

        return;

    }

    let total = 0;

    carrinho.forEach(item=>{

        total += Number(item.preco) * item.quantidade;

    });

    alert(
        "Compra realizada com sucesso!\n\n" +
        "Valor Total: R$ " +
        total.toFixed(2) +
        "\n\nObrigado por comprar na GearHub!"
    );

    carrinho = [];

    atualizarContador();

    atualizarCarrinho();

    fecharCarrinho();

}