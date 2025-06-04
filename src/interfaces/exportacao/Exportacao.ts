import FileSaver from 'file-saver'

export default class Exportacao {
    public fileName: string
    public type: string
    public extension: string

    constructor(fileName: string, type: string, extension: string) {
        this.fileName = fileName
        this.type = type
        this.extension = extension
    }

    public async export(buffer: any) {
        return new Promise<File>((resolve) => {
            const data: Blob = new Blob([buffer], { type: this.type })
            FileSaver.saveAs(data, this.fileName + this.extension)
            resolve(new File([data], this.fileName + this.extension, { type: this.type }))
        })
    }
}