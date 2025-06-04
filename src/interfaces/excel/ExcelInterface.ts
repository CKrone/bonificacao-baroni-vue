export interface Produtos {
    id: number|null,
    codigo: number,
    produto: string,
    qtde: number,
    preco: number,
}

export interface ProdutosRelatorio {
    codigo: number,
    produto: string,
    bonif: number,
    vendas: number,
    pMedio: number,
    qntFinal: number,
}

export interface ExcelFinal {
    codigo: number,
    produto: string,
    qntFinal: number,
    valorFinal: number,
}