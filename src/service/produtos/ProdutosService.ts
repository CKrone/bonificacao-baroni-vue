import axios from 'axios'

class ProdutosService {
    public readonly URL_PADRAO = 'http://localhost:8000/api'
    public async getProdutosExportar(): Promise<any> {
        return new Promise<any>( (resolve) => {
            axios.get(this.URL_PADRAO + '/produto/get-produtos-exportacao')
                .then((r) => resolve(r.data))
                .catch((error) => {
                    console.log(error)
                })
        })
    }

    public async getIdRowsDeleted(): Promise<any> {
        return new Promise<any>( (resolve) => {
            axios.get(this.URL_PADRAO + '/produto/get-ids-deleted')
                .then((r) => resolve(r.data))
                .catch((error) => {
                    console.log(error)
                })
        })
    }
}

const produtosService = new ProdutosService()
export default produtosService