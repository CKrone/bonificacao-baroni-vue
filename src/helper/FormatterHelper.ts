export default new class FormatterHelper {
    public currencyBRL(value: number | string | null): string {
        if (value === null) {
            return ''
        }

        value = (typeof value === 'string') ? parseFloat(value) : value
        return (!isNaN(value)) ? value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) : ''
    }

    public numberToPercent(value: number): string {
        return value.toFixed(2).toString() + '%'
    }

    public valuePercentToNumber(value: string): number {
        return +value
            .replace('%', '')
            .replace(',', '.')
    }

    public valueBRLToNumber(value: string): number {
        const valor = value
            .replace('R$', '')
            .replace(',', '.')

        return parseFloat(valor)
    }

    public valorBrToDecimal(value: string) {
        return parseFloat(value.replace(/\./g, '').replace(',', '.'))
    }
}