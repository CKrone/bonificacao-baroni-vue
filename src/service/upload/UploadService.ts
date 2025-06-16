import axios, {AxiosResponse} from 'axios'

class UploadService {
    public readonly URL_PADRAO = 'http://localhost:8000/api'
    public importarPdfRelatorio(pdf: any): Promise<AxiosResponse<any>> {
        return axios.post(this.URL_PADRAO + '/upload', pdf)
    }

    public importarExcelBase(excel: any): Promise<AxiosResponse<any>> {
        return axios.post(this.URL_PADRAO + '/upload-excel-base', excel)
    }
}

const uploadService = new UploadService()
export default uploadService