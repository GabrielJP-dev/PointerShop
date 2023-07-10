let bancodeProdutos = []
var vetorFinal = "";
var vetorTop10 = [];
var banco = [];

//Função estrelas

function rating(produto) {
    var estrelas = "";
    if (produto < 1 || produto.rating.rate == '') {
        estrelas = `
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            `
    } else if (produto.rating.rate < 1.4) {
        estrelas = `
            <span class="fa fa-star" style="color:orange;"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            `
    } else if (produto.rating.rate < 2.4) {
        estrelas = `
            <span class="fa fa-star" style="color:orange;"></span>
            <span class="fa fa-star" style="color:orange;"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            `
    } else if (produto.rating.rate < 3.4) {
        estrelas = `
            <span class="fa fa-star" style="color:orange;"></span>
            <span class="fa fa-star" style="color:orange;"></span>
            <span class="fa fa-star" style="color:orange;"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            `
    } else if (produto.rating.rate < 4.4) {
        estrelas = `
            <span class="fa fa-star" style="color:orange;"></span>
            <span class="fa fa-star" style="color:orange;"></span>
            <span class="fa fa-star" style="color:orange;"></span>
            <span class="fa fa-star" style="color:orange;"></span>
            <span class="fa fa-star"></span>
            `
    } else if (produto.rating.rate <= 5) {
        estrelas = `
            <span class="fa fa-star" style="color:orange;"></span>
            <span class="fa fa-star" style="color:orange;"></span>
            <span class="fa fa-star" style="color:orange;"></span>
            <span class="fa fa-star" style="color:orange;"></span>
            <span class="fa fa-star" style="color:orange;"></span>
            `
    }

    return estrelas;
}

//Função para popular vetor com produtos

function popularVetor(dados) {
    var ReceberDados = dados;

    for (var i = 0; i < ReceberDados.products.length; i++) {
        bancodeProdutos.push(ReceberDados.products[i])

    }

    maisProdutos();
    barraLateral();
}

//Função para exibir os produtos na pagina

function listarprodutos(page, limite) {
    var cards = "";
    var produtos = vetorFinal;
    var pageAtual = page;
    var limiteitems = limite;
    var totalPage = Math.ceil(produtos.length / limiteitems);
    let cont = (pageAtual * limiteitems) - limiteitems;
    let delimitador = cont + limiteitems;
    console.log(bancodeProdutos.length)


    if (pageAtual <= totalPage) {

        if (delimitador > produtos.length) {
            delimitador = delimitador - (delimitador - produtos.length);
        }



        for (var i = cont; i < delimitador; i++) {

            cards += `
        <div class="card mx-2 mt-2" style="width: 18rem;">
            <img src="${produtos[i].image}" class="card-img-top" alt="...">
            <div class="card-body">
                 <h6 class="card-text text-primary" style = "height: 60px;">${produtos[i].title}</h6>

                ${rating(produtos[i])} (${produtos[i].rating.count})
                <div class="row mt-2">
                     <div class="col">
                         <h6><strong> R$${produtos[i].price} </strong> </h6>
                    </div>
                    <div class="col">
                        <h6><b>${produtos[i].brandName}</b></h6>
                    </div>
                </div>
                <div class ="row align-items-end">
                    <button type = "button" onclick="detalhes(${produtos[i].id})" class = "btn btn-primary">Veja mais</button>
                </div>
            </div>
        </div>`

        }
    }
    document.querySelector('#card1').innerHTML = cards;

    if ((pageAtual == 1 && produtos.length > 15) || (pageAtual == 1 && produtosFiltrados == '')) {

        document.querySelector('#mais').innerHTML = `<button type="button" class="btn btn-primary disabled">Anterior</button> <button type="button" class="btn btn-primary" onclick="listarprodutos(${pageAtual + 1},${15})">Próximo</button>`;
    } else if ((pageAtual == 1 && produtos.length <= 15)) {

        document.querySelector('#mais').innerHTML = `<button type="button" class="btn btn-primary disabled">Anterior</button> <button type="button" class="btn btn-primary disabled">Próximo</button>`;
    } else if (delimitador == produtos.length) {

        document.querySelector('#mais').innerHTML = `<button type="button" class="btn btn-primary" onclick="listarprodutos(${pageAtual - 1},${15})">Anterior</button> <button type="button" class="btn btn-primary disabled">Próximo</button>`;
    } else {
        document.querySelector('#mais').innerHTML = `<button type="button" class="btn btn-primary" onclick="listarprodutos(${pageAtual - 1},${15})">Anterior</button> <button type="button" class="btn btn-primary" onclick="listarprodutos(${pageAtual + 1},${15})">Próximo</button>`;
    }

}

//Função para o veja mais 

function detalhes(id) {
    var ReceberId = id;

    window.open("vejamais.html?codigo=" + ReceberId);


}

//Função filtro

var produtosFiltrados = [];

function filtro() {
    var cardfilt = "";
    var color = document.getElementById("selectcolor").value;
    var brand = document.getElementById("selectbrand").value;
    var gender = document.getElementById("selectgender").value;
    var precate = document.getElementById("precate").value;
    var precde = document.getElementById("precde").value;

    produtosFiltrados = bancodeProdutos.filter(function (produto) {
        return (
            (color === 'All Colors' || produto.baseColour === color) &&
            (brand === 'All Brands' || produto.brandName === brand) &&
            (gender === 'All Gender' || produto.gender === gender) &&
            (precde === '' || produto.price >= precde) &&
            (precate === '' || produto.price <= precate)
        );
    });



    if (produtosFiltrados == '') {
        cardfilt = ` <h4 class = "text-center pt-2"><strong>Não existem produtos com essas especificações!! <br> Por favor, altere seu filtro.</strong></h4>
            `
        document.querySelector('#card1').innerHTML = cardfilt;
        document.querySelector('#mais').innerHTML = "";
    } else {
        maisProdutos();
    }


}



//Função barra de pesquisa
function barraPesquisa() {

    banco = []

    var texto = document.getElementById("Busca").value;

    fetch('https://diwserver.vps.webdock.cloud/products/search?query=' + texto + '&page_items=12133')
        .then(res => res.json())
        .then(json => carregarVetor(json))
}

function carregarVetor(dados) {

    var produtos = dados

    for (let index = 0; index < produtos.length; index++) {
        let produto = produtos[index];

        if (produto.category == "Accessories - Watches") {
            banco.push(produto)
        }
    }


    if (banco.length === 0) {
        document.querySelector('#card1').innerHTML = ` <h4 class = "text-center pt-2"><strong>Não existem produtos com essas especificações pesquisadas!!</strong></h4>
        <br><button type = "button" onclick = "maisProdutos()" class = "bg-danger text-white" style = "
        border-radius: 7px; width: 190px; height:50px;">Remover pesquisa</button>
        `

        document.querySelector('#mais').innerHTML = "";

    } else if (produtosFiltrados.length === 0) {
        
        vetorFinal = []
        for (let index = 0; index < banco.length; index++) {
            vetorFinal.push(banco[index])
        }

        listarprodutos(1, 15)
    } else {

        vetorFinal = []
        for (let index = 0; index < banco.length; index++) {
            for (let i = 0; i < produtosFiltrados.length; i++) {
                if (banco[index].id == produtosFiltrados[i].id) {
                    vetorFinal.push(banco[index])
                }
            }

        }
        

        listarprodutos(1, 15)
    }

    document.getElementById("Busca").value = "";
}



//Função para barra lateral

function barraLateral() {
    var cardLateral = "";

    vetorTop10.forEach(produto => {
        cardLateral += `
            <div class="row">
            <hr class="ms-2 my-2 " style = " color: white;">
                    <div class="col text-center align-self-center">
                   
                      

                      <img src="${produto.image}" alt="" style = "width: 80px;">
                        <br>
                      <button type = "button" onclick="detalhes(${produto.id})" class = "mt-4" style = "background: #30d6d3; box-shadow: 2px ;
                      border-radius: 7px; color: #fff; width: 90px; height: 40px;">Veja mais</button>
                    </div>
                    <div class="col p-0">
                      
                      <p class="text-primary"><strong>${produto.title}</strong></p>
                      <p class="text-white"><strong>${produto.brandName}</strong></p>

                      
                      <p class="text-white"><strong>R$${produto.price}</strong> </p>

                      
                     
                
                    </div>
                  
            </div>`
    });

    document.querySelector('#barraLateral').innerHTML = cardLateral;
}


//Função para verificar filtro e exibir

function maisProdutos() {
    if (produtosFiltrados == "") {
        vetorFinal = bancodeProdutos;
    } else
        vetorFinal = produtosFiltrados;

    listarprodutos(1, 15);
}

//Função para popular barra lateral

function popularBarraLateral(produto) {
    var igual = 0;
    if(vetorTop10.length!=0){
        for (let index = 1; index < vetorTop10.length; index++) {
            if(produto.id==vetorTop10[index].id){
                igual = 1;
            }          
        }
    }

    if((igual==0 || vetorTop10.length==0) && vetorTop10.length<10){
        vetorTop10.push(produto);
    }

    barraLateral();
}

//Carregamento inicial

onload = () => {
    var qtd = 0;
    //Estrutura de repetição para percorrer paginas 
    for (var i = 1; i <= 254; i++) {
        fetch('https://diwserver.vps.webdock.cloud/products/category/Accessories - Watches?page=' + i)
            .then(res => res.json())
            .then(dados => {

                while (qtd < 10) {
                    for (var j = 0; j <= dados.products.length; j++) {
                        
                        if (dados.products[j].rating.rate >= 4.5){
                            popularBarraLateral(dados.products[j]);
                            qtd++;
                        }
                    }
                }



                popularVetor(dados)
            })

    }


}


