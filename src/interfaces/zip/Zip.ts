import JSZip, {JSZipGeneratorOptions} from 'jszip'

export default class Zip {

    public files: File[] = []
    public zip: JSZip
    public zipName = ''
    public zipOptions: JSZipGeneratorOptions = {
        type: 'blob',
        compression: 'DEFLATE',
    }

    constructor(files: File[], zipName: string) {
        this.files = files
        this.zipName = zipName

        this.zip = new JSZip()
        this.zipFiles()
    }

    public zipFiles() {
        for (const file of this.files) {
            this.zip.file(file.name, file)
        }
    }

    public async generateZip(): Promise<File> {
        return new Promise( (resolve) => {
             this.zip.generateAsync(this.zipOptions)
                .then(async (content: any) => {
                    const zipblob: any = new Blob([content])
                    const zipFile = new File([zipblob], this.zipName, { type: 'application/zip' })
                    resolve(zipFile)
                })
        })
    }
}