const items = [
    {
        id: 1,
        nome: 'Computador X1',
        preco: 10000.50,
        foto_destaque: 'https://loja.brcorte.com.br/wp-content/uploads/2022/04/3.png',
        descricao: 'Computador Otimo'
    },
    {
        id: 2,
        nome: 'Computador X2',
        preco: 1000.50,
        foto_destaque: '',
        descricao: 'Computador Otimo 2'
    },
    {
        id: 3,
        nome: 'Mouse',
        preco: 10.55,
        foto_destaque: '',
        descricao: 'Computador Otimo'
    },
    {
        id: 4,
        nome: 'Fone',
        preco: 25.90,
        foto_destaque: '',
        descricao: 'Computador Otimo'
    }
]
let carrinho = []
let carrinhoEl = null
let comprar = (id) => {}

const Main = (app) => {
    
    
    function comprar_ (id, onCart = () => { montaCarrinho(carrinhoEl) }) {
        
        let pos = items.findIndex(p => {return p.id == id});
        if (pos === -1) {
            alert('Produto não encontrado!');
            return
        }
        let item = items[pos]
        let posCar = carrinho.findIndex(c => c.id == id);
        if (posCar === -1) {
            carrinho.push({...item, qtd: 0, total: 0})
            posCar = carrinho.length - 1
        }
        carrinho[posCar].qtd += 1
        carrinho[posCar].total = carrinho[posCar].qtd * carrinho[posCar].preco
        onCart()
        return carrinho

    }
    function montaCatalogo (produtosEl) {
        produtosEl.innerHTML += items.map(item => `
            <div class="produto">
                <img class="fotoproduto" src="${item.foto_destaque}"/>
                <div class="titulo">${item.nome}</div>
                <div class="descricao"><small>${item.descricao}</small></div>
                <div class="valor">R$${parseFloat(item.preco).toFixed(2).replace('.', ',')}</div>
                <div class="comprar"><button onClick="comprar(${item.id})">Comprar</button></div>
            </div>
        `).join('');
        return produtosEl;
    }
    function total() {
        let t = carrinho.map(c => c.total).reduce((a, b) => a+b, 0)
        return t
    }
    function montaCarrinho (carrinhoEl) {
        carrinhoEl.innerHTML = `
        <h1>Carrinho</h1>
        <table border="1" style="width: 100%; border: 1px #000 solid;">
        <tr style="width: 100%; border: 1px #000 solid;">
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Total</th>
        </tr>
        ${carrinho.map(item => `
            <tr class="item">
                <td>${item.nome}</td>
                <td>${item.qtd}</td>
                <td>R$${parseFloat(item.total).toFixed(2).replace('.', ',')}</td>
            </tr>
        `).join('')}
        <tr style="width: 100%; border: 1px #000 solid;">
            <th colspan="2">Total</th>
            <th>R$${parseFloat(total()).toFixed(2).replace('.', ',')}</th>
        </tr>
        </table>`;
        
    }
    function montaHTML(app) {
        let produtos = document.createElement('div');
        produtos.id = 'produtos';
        produtos = montaCatalogo(produtos)

        const carrinho = document.createElement('div');
        carrinho.id = 'carrinho';
        montaCarrinho(carrinho)

        app.appendChild(produtos);
        app.appendChild(carrinho);
        carrinhoEl = carrinho
        comprar = comprar_

    }

    montaHTML(app)
    
}

document.addEventListener('DOMContentLoaded', () => {
    Main(document.getElementById('app'));
})