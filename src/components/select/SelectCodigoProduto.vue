<template>
    <v-autocomplete
        dense
        outlined
        item-value="value"
        item-text="label"
        :loading="loading"
        v-model="selecionado"
        :multiple="selectOptions.multiple"
        :items="codigo"
        label="Código"
    />
</template>
<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator'
import {DefaultSelect} from '@/helper/TypeHelper'
import produtosService from '@/service/produtos/ProdutosService'

@Component({})
export default class SelectCodigoProduto extends Vue {

    @Prop()
    public value: any

    @Prop()
    public multiple?: any

    public loading: boolean = false
    public codigo: DefaultSelect[] = []
    public selecionado: any = null
    public selectOptions: any = {
        multiple: true,
    }

    public mounted(): void {
        this.getCodigoProduto()
        this.$on('atualizar-codigos', this.getCodigoProduto)
    }

    @Watch('selecionado')
    public onSelecionadoChanged(val: any): void {
        this.$emit('input', val)
    }

    @Watch('value')
    public onValueChanged(val: any): void {
        this.selecionado = val
    }

    public getCodigoProduto(): void {
        this.loading = true
        produtosService.getCodigoProduto()
            .then((r) => {
                this.codigo = r.data.map((codigos: any) => {
                    return {
                        value: codigos.codigo,
                        label: codigos.codigo,
                    }
                })

            })
            .finally(() => {
                this.loading = false
            })
    }
}
</script>
<style scoped lang="scss">
</style>