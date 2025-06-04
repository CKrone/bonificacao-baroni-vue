import axios, {AxiosResponse} from 'axios'

class UploadService {
    public importarPdfRelatorio(pdf: any): Promise<AxiosResponse<any>> {
        return axios.post('http://localhost:8000/upload', pdf)
    }

    public importarExcelBase(excel: any): Promise<AxiosResponse<any>> {
        return axios.post('http://localhost:8000/upload-excel-base', excel)
    }

}

const uploadService = new UploadService()
export default uploadService