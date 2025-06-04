export interface ParamPesquisaProdutos {
    codigo: number[],
    produto: string[],
}

export interface Produto {
    produto: string|null,
    codigo: number|null,
    custo: number|null,
    pisCof: number|null,
    medio: number|null,
}

export interface AddProduto {
    afterCodigo: number[],
    produto: Produto,
}

export interface RowsDeleted {
    id: number|null,
}
