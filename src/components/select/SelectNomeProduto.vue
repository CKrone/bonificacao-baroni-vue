<template>
    <v-autocomplete
        dense
        outlined
        item-value="value"
        item-text="label"
        :loading="loading"
        v-model="selecionado"
        :multiple="selectOptions.multiple"
        :items="nomeProduto"
        label="Produto"
    />
</template>
<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator'
import {DefaultSelect} from '@/helper/TypeHelper'
import produtosService from '@/service/produtos/ProdutosService'

@Component({})
export default class SelectNomeProduto extends Vue {

    @Prop()
    public value: any

    @Prop()
    public multiple?: any

    public loading: boolean = false
    public nomeProduto: DefaultSelect[] = []
    public selecionado: any = null
    public selectOptions: any = {
        multiple: true,
    }

    public mounted(): void {
        this.getCodigoProduto()
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
        produtosService.getNomeProduto()
            .then((r) => {
                this.nomeProduto = r.data.map((nome: any) => {
                    return {
                        value: nome.produto,
                        label: nome.produto.toUpperCase(),
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