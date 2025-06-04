import Vue from 'vue'
import FormatterHelper from '@/helper/FormatterHelper'
Vue.filter('toMoedaBr', (val: number | string | null) => {
    if (typeof val === 'string' && val === 'N/A') {
        return 'Não Informado'
    }
    if (val === null) {
        return ''
    }

    val = (typeof val === 'string') ? parseFloat(val) : val
    return (!isNaN(val)) ? FormatterHelper.currencyBRL(val) : ''
})

Vue.filter('toUpperCase', (valor: string) => {
    return (valor) ? valor.toUpperCase() : valor
})

Vue.filter('numberToPercent', (valor: number | string | null) => {
    valor = (typeof valor === 'string') ? parseFloat(valor) : (valor === 0 ? 0.0 : valor)
    return valor === null ? '' : FormatterHelper.numberToPercent(valor)
})