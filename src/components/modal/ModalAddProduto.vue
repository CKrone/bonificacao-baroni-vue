<template>
    <div>
        <v-btn @click="addProduto">
            Adicionar Produto
        </v-btn>
        <modal v-model="showModalAddProduto" titulo="Cadastrar Novo Produto" @salvarProduto="salvar">
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
                        <v-row>
                            <v-col cols="12">
                                <select-codigo-produto
                                    v-model="addNewProduto.afterCodigo"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="3">
                                <v-text-field
                                    v-model="addNewProduto.produto.codigo"
                                    label="Código do Produto"
                                    dense
                                    :rules="fieldRules.codigo"
                                    outlined
                                    required
                                    type="number"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="9">
                                <v-text-field
                                    v-model="addNewProduto.produto.produto"
                                    style="width: 400px"
                                    label="Nome do Produto"
                                    :rules="fieldRules.produto"
                                    required
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="addNewProduto.produto.medio"
                                    label="Preço Médio"
                                    :rules="fieldRules.medio"
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
import {Vue, Component, Ref} from 'vue-property-decorator'
import Modal from '@/components/modal/Modal.vue'
import {AddProduto} from '@/interfaces/produtos/Produtos'
import SelectCodigoProduto from '@/components/select/SelectCodigoProduto.vue'
import produtosService from '@/service/produtos/ProdutosService'
import {CommonModule} from '@/store/common'
import FormatterHelper from "@/helper/FormatterHelper";

@Component({
    components: {SelectCodigoProduto, Modal}
})
export default class ModalAddProduto extends Vue {

    @Ref() form!: any

    public valid: boolean = true
    public loading: boolean = false
    public showModalAddProduto: boolean = false
    public moneyField = { decimal: ',', thousands: '.', prefix: 'R$ ', suffix: '', precision: 2, masked: false }
    public addNewProduto: AddProduto = {
        afterCodigo: [],
        produto: {
            codigo: null,
            produto: null,
            pisCof: null,
            medio: null,
            custo: null,
        }
    }

    public fieldRules = {
        produto: [
            (v: any) => !!v || 'Informe o nome do produto',
        ],
        codigo: [
            (v: any) => !!v || 'Informe o código do produto',
        ],
        medio: [
            (v: any) => !!v || 'Informe o preço médio do produto',
        ]
    }

    public addProduto(): void {
        this.showModalAddProduto = true
    }

    public async salvar(): Promise<void> {
        this.formatValueMedio()
        if (!this.form.validate() || !this.validateFields()) {
            return
        }

        try {
            await produtosService.salvarProduto(this.addNewProduto)
        }  catch (error: any) {
            CommonModule.showMessage({message: error.response.data.error, type: 'error'})
        } finally {
            this.$emit('refresh')
            this.limparCampos()
            this.showModalAddProduto = false
            CommonModule.showMessage({message: 'Produto Adicionado com Sucesso!', type: 'success'})
        }
    }

    public validateFields(): boolean {
        if (!this.addNewProduto.afterCodigo.length) {
            CommonModule.showMessage({message: 'Por favor, insira o código do produto', type: 'error'})
            return false
        }

        if (!this.addNewProduto.produto.produto) {
            CommonModule.showMessage({message: 'Por favor, insira o nome do produto', type: 'error'})
            return false
        }

        if (!this.addNewProduto.produto.codigo) {
            CommonModule.showMessage({message: 'Por favor, insira o código do produto', type: 'error'})
            return false
        }

        if (this.addNewProduto.produto.medio === 0) {
            CommonModule.showMessage({message: 'Por favor, insira o preço médio do produto', type: 'error'})
            return false
        }
        return true
    }

    public formatValueMedio(): void {
        if (this.addNewProduto.produto.medio) {
            let precoMedio = this.addNewProduto.produto.medio.toString()
            this.addNewProduto.produto.medio = FormatterHelper.valueBRLToNumber(precoMedio)
        }
    }

    public limparCampos(): void {
        this.addNewProduto.produto.codigo = null
        this.addNewProduto.produto.produto = null
        this.addNewProduto.produto.medio = null
        this.addNewProduto.afterCodigo = []
    }
}
</script>

<style scoped lang="scss">

</style>