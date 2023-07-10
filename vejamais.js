// função pra ler querystring
function queryString(parameter) {  
    var loc = location.search.substring(1, location.search.length);   
    var param_value = false;   
    var params = loc.split("&");   
    for (i=0; i<params.length;i++) {   
        param_name = params[i].substring(0,params[i].indexOf('='));   
        if (param_name == parameter) {                                          
            param_value = params[i].substring(params[i].indexOf('=')+1)   
        }   
    }   
    if (param_value) {   
       PuxarDetalhes(param_value);   
    }   
    else {   
        alert("Código incorreto!");   
    }   
}

function PuxarDetalhes(id){
    var detalhes = ""; 
    var codigo = id;
    var descricao = "";
    var estrelas = "";

    fetch('https://diwserver.vps.webdock.cloud/products/'+ codigo)
        .then(res=>res.json())
        .then(data=>{

            if(data.description == "-"){
                descricao = "Sem descrição.";
            }else{
                descricao = data.description;
            }

            
        if(data.rating.rate < 1){
            estrelas = `
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            `
        }else if(data.rating.rate < 1.4){
            estrelas = `
            <span class="fa fa-star" style="color:orange;"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            `
        }else if(data.rating.rate < 2.4){
            estrelas = `
            <span class="fa fa-star" style="color:orange;"></span>
            <span class="fa fa-star" style="color:orange;"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            `
        }else if(data.rating.rate < 3.4){
            estrelas = `
            <span class="fa fa-star" style="color:orange;"></span>
            <span class="fa fa-star" style="color:orange;"></span>
            <span class="fa fa-star" style="color:orange;"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            `
        }else if(data.rating.rate < 4.4){
            estrelas = `
            <span class="fa fa-star" style="color:orange;"></span>
            <span class="fa fa-star" style="color:orange;"></span>
            <span class="fa fa-star" style="color:orange;"></span>
            <span class="fa fa-star" style="color:orange;"></span>
            <span class="fa fa-star"></span>
            `
        }else if(data.rating.rate < 5){
            estrelas = `
            <span class="fa fa-star" style="color:orange;"></span>
            <span class="fa fa-star" style="color:orange;"></span>
            <span class="fa fa-star" style="color:orange;"></span>
            <span class="fa fa-star" style="color:orange;"></span>
            <span class="fa fa-star" style="color:orange;"></span>
            `
        }
            
            detalhes = `
            <div class="card mx-2 mb-2" style="width: 80%; border-radius:2px;box-shadow: 6px 6px 10px;">
                <div class="card-body">
                
                    <div class="row justify-content-center">
                        <div class="col-lg-4">
                            <img src="${data.image}" class="card-img-top" alt="..." style="width:220px">
                        </div>
                        <div class="col-lg-7 pt-5">
                            <b>${data.title}</b>
                            <br>
                            ${data.brandName}
                            <br>
                            ${data.baseColour}
                            <br>
                            ${data.gender}
                            <br>
                            ${data.usage}
                            <br>
                            ${data.season}
                            <br>
                         R$ ${data.price}
                         <br>
                            ${estrelas} (${data.rating.count})
                            
                        </div>
                    </div>
                    <div class = "row pt-2">
                     ${descricao}
                    </div>
            
             
                </div>
            </div>
            `
            document.querySelector('#vejamais1').innerHTML = detalhes;
        }
        )

        
}



onload = () => {
 queryString("codigo");
}
