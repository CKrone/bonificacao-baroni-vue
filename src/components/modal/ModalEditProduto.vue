<template>
    <div>
        <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
                <v-icon
                    @click="getProdutoByCodigo"
                    v-bind="attrs"
                    v-on="on"
                    icon>
                    mdi-pencil
                </v-icon>
            </template>
            <span>Editar Produto</span>
        </v-tooltip>
        <modal v-model="modalEditProduto" titulo="Editar Produto" width="200" @salvarProduto="editarProduto">
            <template #text>
                <v-row v-if="loading">
                    <v-col cols="12">
                        <v-progress-circular
                            indeterminate
                            absolute
                            height="2"
                            bottom
                        ></v-progress-circular>
                    </v-col>
                </v-row>
                <v-row v-else>
                    <v-form ref="form" :lazy-validation="valid">
                        <v-row v-if="produto">
                            <v-col cols="12" md="3">
                                <v-text-field
                                    v-model.lazy="produto.codigo"
                                    label="Código do Produto"
                                    dense
                                    outlined
                                    required
                                    type="number"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="9">
                                <v-text-field
                                    style="width: 400px"
                                    v-model.lazy="produto.produto"
                                    label="Nome do Produto"
                                    required
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model.lazy="produto.custo"
                                    label="Custo"
                                    v-money="moneyField"
                                    dense
                                    outlined
                                    required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-row>
            </template>
        </modal>
    </div>
</template>
<script lang="ts">
import {Component, Prop, Ref, Vue} from 'vue-property-decorator'
import Modal from '@/components/modal/Modal.vue'
import produtosService from '@/service/produtos/ProdutosService'
import {Produto} from '@/interfaces/produtos/Produtos'
import FormatterHelper from "@/helper/FormatterHelper";

@Component({
    components: {Modal}
})
export default class ModalEditProduto extends Vue {

    @Ref() form!: any
    @Prop()
    public codigoProduto!: number
    @Prop()
    public item!: any

    public valid: boolean = true
    public modalEditProduto: boolean = false
    public loading: boolean = false
    public produto: Produto = {
        codigo: 0,
        produto: '',
        pisCof: 0,
        medio: 0,
        custo: 0,
    }

    public moneyField = { decimal: ',', thousands: '.', prefix: 'R$', suffix: '', precision: 2, masked: false }

    public async getProdutoByCodigo(): Promise<any> {
        this.loading = true
        this.modalEditProduto = true

        this.produto = await produtosService.getProdutoByCodigo(this.codigoProduto)

        this.loading = false
    }

    public editarProduto(): void {
        this.produto.custo = this.produto.custo ? FormatterHelper.valueBRLToNumber(this.produto.custo.toString()) : 0

        produtosService.editarProduto(this.produto)
    }

    public formatValue(): void {}


}
</script>
<style scoped lang="scss">

</style>