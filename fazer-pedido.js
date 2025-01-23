var filtroListener = document.getElementById('filtro');
filtroListener.addEventListener('mouseout', addNaTela, false)

function inicializar(){
    addNaTela();
}

// Mostra todas os alimentos
function addNaTela(){
    var table = document.getElementById('exibirComidas');
    var comidas = JSON.parse(localStorage.getItem('comida'));
   
    var filtro = document.getElementById('filtro').value;
    console.log('Função chamada addNaTela()' + filtro);
    
    table.innerHTML = '<tr class="cabecalho" id="cabecalhoTable"><th>Tipo</th><th>Comida</th><th>Ingredientes</th><th>Add ao pedido</th></tr> ';
    
    for (var i =  0; i < comidas.length ; i++) {
        var nome = comidas[i].nome;
        var preco = comidas[i].preco;
        var tipo = comidas[i].tipo;
        
        // Se a comida for igual ao filtro escolhido mostrará ela
        if(comidas[i].tipo == filtro){
            table.innerHTML += '<tr><td> <img class="icone-comida" src="icones-comida/'+tipo + '.png"/> </td><td>'  + nome + '</td><td>' + preco + '</td><td> <img class="icone-funcional" src="icones-funcionais/add-alimento.png" onclick="addAlimento('+i+')"/>    </td></tr>';
        //se o filtro for pra mostrar tudo ele executa o código de baixo
        }else if(filtro == 'tudo'){
            table.innerHTML += '<tr><td> <img class="icone-comida" src="icones-comida/'+tipo + '.png"/> </td><td>'  + nome + '</td><td>' + preco + '</td><td> <img class="icone-funcional" src="icones-funcionais/add-alimento.png" onclick="addAlimento('+i+')"/>    </td></tr>';
        }
    }
}

// ADICIONAR ITEM AO PEDIDO E TIRAR O ITEM
var precoTotal = 0.0;
var pedidos = []

function addAlimento(id){
    var comidas = JSON.parse(localStorage.getItem('comida'));
    var tablePedido = document.getElementById('pedidoTable');
    var divPrecoTotal = document.getElementById('divTotal');
    
    console.log("alimento: " +  id + "  " + comidas[id].nome + "  " + comidas[id].preco);
    
    var nome = comidas[id].nome;
    var tipo = comidas[id].tipo;
    
    var precoComida = parseFloat(comidas[id].preco);
    
    this.precoTotal += precoComida;
    console.log(this.precoTotal);
    
    var pedido = {
        nome_alimento : nome,
        preco_alimento : precoComida,
        tipo_alimento : tipo
    };
    
    this.pedidos.push(pedido);
    
    console.log(pedidos);	
    divPrecoTotal.innerHTML = '<h2>TOTAL: ' + this.precoTotal.toFixed(2) + ' </h2>';
    
    tablePedido.innerHTML  = '';
    
    for(i = 0; i < this.pedidos.length; i++){
        tablePedido.innerHTML += '<tr><td> <img class="icone-comida" src="icones-comida/'+ this.pedidos[i].tipo_alimento + '.png"/> </td><td>'  + this.pedidos[i].nome_alimento + '</td><td>' +  this.pedidos[i].preco_alimento + '</td><td> <img class="icone-funcional" src="icones-funcionais/remover.png" onclick="removerItemPedido('+i+')"/>    </td></tr>';
    }
}

// Ao clicar no ícone vermelho de remover ele executará esse código
function removerItemPedido(preco){
    var tablePedido = document.getElementById('pedidoTable');
    var divPrecoTotal = document.getElementById('divTotal');

    this.precoTotal -=  this.pedidos[preco].preco_alimento;
    
    this.pedidos.splice(preco, 1); // Excluir item
    
    tablePedido.innerHTML  = ''; 
    divPrecoTotal.innerHTML = '<h2>TOTAL: ' + this.precoTotal.toFixed(2) + ' </h2>';
    
    for(i = 0; i < this.pedidos.length; i++){	
        tablePedido.innerHTML += '<tr><td> <img class="icone-comida" src="icones-comida/'+ this.pedidos[i].tipo_alimento + '.png"/> </td><td>'  + this.pedidos[i].nome_alimento + '</td><td>' +  this.pedidos[i].preco_alimento + '</td><td> <img class="icone-funcional" src="icones-funcionais/remover.png" onclick="removerItemPedido('+i+')"/>    </td></tr>';
    }
}

// REGISTRAR PEDIDOS FEITOS NO NAVEGADOR
var regPedido = document.getElementById('btnRegPedido');
regPedido.addEventListener('click', salvarPedido ,false);

function salvarPedido(){
    var data = new Date();
    var dia     = data.getDate();           // 1-31
    var mes     = data.getMonth();          // 0-11 (zero=janeiro)     
    var ano4    = data.getFullYear();       // 4 dígitos
    
    var hora    = data.getHours();          // 0-23
    var min     = data.getMinutes();        // 0-59
    
    var nomeCliente = document.getElementById('nomeCliente').value;
    
    var PedidoSalvar = {
        nomeCliente : nomeCliente.toUpperCase(),
        dia : dia,
        mes : mes + 1,
        ano : ano4,
        hora : hora,
        min : min,
        comida : pedidos	
    };
    
    if(nomeCliente){	
        if(localStorage.getItem('PedidoCliente') == null){
            var PedidosFeitos = [];
            PedidosFeitos.push(PedidoSalvar);
            localStorage.setItem('PedidoCliente', JSON.stringify(PedidosFeitos));
        }else{
            var PedidosFeitos = JSON.parse(localStorage.getItem('PedidoCliente'));
            PedidosFeitos.push(PedidoSalvar);
            localStorage.setItem('PedidoCliente', JSON.stringify(PedidosFeitos));
        }
        console.log('Executado Salvar pedido');
        alert('PEDIDO SALVO COM SUCESSO!');
        window.location.href = 'fazer-pedido.html';
    }else{
        alert('Confira se o campo nome do cliente está vazio!');
    }
}

// Limpar dados dos pedidos salvos no local storage
function limparPedidos(){
    localStorage.setItem('PedidoCliente', JSON.stringify([]));
}
