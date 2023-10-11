const objetos =  [
	{
		macas:3,
		peras:2,
		carne:1,
		frango:5,
		doces:2
	},
	{
		macas:1,
		cafes:1,
		ovos:6,
		frango:1,
		paes:4
	}
]


let produtos = objetos.map((objeto) => {
    return Object.keys(objeto)
});

let produtosUnicos = [];
produtos.forEach((produto) => {
    produto.forEach((item) => {
        if (!produtosUnicos.includes(item)) {
            produtosUnicos.push(item);
        }
    });
});

console.log(produtosUnicos);

let valores = objetos.map((objeto) => {
    return Object.values(objeto)
}
);

let valoresProdutos = [];
valores.forEach((valor) => {
    valor.forEach((item) => {
        valoresProdutos.push(item);
    });
});

console.log(valoresProdutos);

// console.log(valores);

let valorTotal = valoresProdutos.reduce((acc, valor) => {
    return acc + valor;
}, 0);


console.log(valorTotal);
