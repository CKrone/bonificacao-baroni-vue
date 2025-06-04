import axios from 'axios'
import {AddProduto, ParamPesquisaProdutos} from '@/interfaces/produtos/Produtos'
import {CommonModule} from "@/store/common";

class ProdutosService {
    public async getProdutosExportar(): Promise<any> {
        return new Promise<any>( (resolve) => {
            axios.get('http://localhost:8000/produto/get-produtos-exportacao')
                .then((r) => resolve(r.data))
                .catch((error) => {
                    console.log(error)
                })
        })
    }

    public async getIdRowsDeleted(): Promise<any> {
        return new Promise<any>( (resolve) => {
            axios.get('http://localhost:8000/produto/get-ids-deleted')
                .then((r) => resolve(r.data))
                .catch((error) => {
                    console.log(error)
                })
        })
    }

    public getProdutos(filtros: ParamPesquisaProdutos): Promise<any> {
        return new Promise<any>( (resolve) => {
            axios.post('http://localhost:8000/produto/get-produtos', JSON.stringify(filtros))
                .then((r) => resolve(r.data))
                .catch((error) => {
                    if (error) {
                        CommonModule.showMessage({ message: 'Conexão deu pt', type: 'error' })
                    }
                })
        })
    }

    public getProdutoByCodigo(codigo: number | null) {
        return new Promise<any>(resolve => {
            axios.get('http://localhost:8000/produto/' + codigo)
                .then((r) => resolve (r.data))
                .catch((error) => {
                    console.log(error)
                })
        })
    }

    public async getCodigoProduto(): Promise<any> {
        return axios.get('http://localhost:8000/produto/codigo')
    }

    public getNomeProduto(): Promise<any> {
        return axios.get('http://localhost:8000/produto/nome-produto')
    }

    public editarProduto(item: any) {
        return axios.post('produto/editar-produto', item)
    }

    public async salvarProduto(produto: any) {
        return new Promise<any>((resolve) => {
            axios.post('http://localhost:8000/produto/add-produto', JSON.stringify(produto))
                .then((r) => resolve(r.data))
                .catch((error) => {
                    if (error) {
                        CommonModule.showMessage({message: 'Conexão deu aaaaaaaaaaaaaaaa', type: 'error'})
                    }
                })
        })
    }

}

const produtosService = new ProdutosService()
export default produtosService