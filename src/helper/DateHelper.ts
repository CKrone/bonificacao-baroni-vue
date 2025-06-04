
export default new class DateHelper {

    public dtNowBr(separador = '/', days = 0) {
        const data: Date = new Date()
        data.setDate(data.getDate() + days)
        const dia: string = (data.getDate() < 10) ? ('0' + data.getDate()) : data.getDate().toString()

        let mes: any = data.getMonth() + 1
        mes = (mes < 10) ? ('0' + mes) : mes.toString()

        return `${dia}${separador}${mes}${separador}${data.getFullYear()}`
    }
}