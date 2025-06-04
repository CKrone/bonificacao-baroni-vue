import * as XLSX from 'xlsx'
import Exportacao from '@/interfaces/exportacao/Exportacao'
import { ExportObject } from '@/interfaces/exportacao/ExportacaoTypes'

export default class Excel extends Exportacao {
    public workbook: XLSX.WorkBook|null = null
    public worksheet: XLSX.WorkSheet|null = null
    public buffer: any = null
    public data: any[] = []
    public columns: any = {}

    constructor(exportObject: ExportObject) {
        super(exportObject.fileName, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8', '.xlsx');
        this.columns = exportObject.columns
        this.data = exportObject.data
        this.data.unshift(this.columns)
        this.createExcel(exportObject)
    }

    public createExcel(exportObject: ExportObject): void {
        this.worksheet = XLSX.utils.json_to_sheet(this.data)
        this.workbook = { Sheets: { data: this.worksheet }, SheetNames: ['data'] }
        this.workbook.Props = {
            Title: exportObject.fileTitle,
            Subject: exportObject.fileSubject,
            Author: exportObject.fileAuthor,
            CreatedDate: exportObject.createdDate,
        }

        const range = XLSX.utils.decode_range(String(this.worksheet['!ref']))
        for (let row = 0; row < range.e.r; ++row) {
            for (let column = range.s.c; column <= range.e.c; ++column) {
                this.worksheet[XLSX.utils.encode_cell({ r: row, c: column } )] =
                    this.worksheet[XLSX.utils.encode_cell({ r: row + 1, c: column})]
            }
        }
        range.e.r--
        this.worksheet['!ref'] = XLSX.utils.encode_range(range.s, range.e)
        this.buffer = XLSX.write(this.workbook, { bookType: 'xlsx', type: 'array'})
    }
}
