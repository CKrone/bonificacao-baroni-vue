<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-row dense>
                        <v-col cols="12" md="3">
                            <select-codigo-produto v-model="filtros.codigo" :multiple="true" />
                        </v-col>
                        <v-col cols="12" md="3">
                            <select-nome-produto v-model="filtros.produto" :multiple="true" />
                        </v-col>
                        <v-spacer></v-spacer>
                    <span class="float-right mt-1">
                        <v-btn @click="getProdutos">
                            Pesquisar
                        </v-btn>
                        <v-btn @click="limparFiltros" class="ml-2">
                            Limpar Filtros
                        </v-btn>
                    </span>
                        <modal-add-produto class="ml-2 mt-1" @refresh="atualizarDados"/>
                    </v-row>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-data-table
                        :headers="headers"
                        :items="produtos"
                        :footer-props="{ 'items-per-page-options': [10, 15, 30], showFirstLastPage: true }"
                    >
                        <template v-slot:item.produto="{ item }">
                            <span>{{ item.produto | toUpperCase }}</span>
                        </template>
                        <template v-slot:item.custo="{ item }">
                            <span>{{ item.custo | toMoedaBr }}</span>
                        </template>
                        <template v-slot:item.pisCof="{ item }">
                            <span>{{ item.pisCof | toMoedaBr }}</span>
                        </template>
                        <template v-slot:item.medio="{ item }">
                            <span>{{ item.medio | toMoedaBr }}</span>
                        </template>
                        <template v-slot:item.acao="{ item }" style="width: 50px">
                            <modal-edit-produto :codigo-produto="item.codigo" :item="item"  />
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>
            <v-snackbar
                v-if="snackbarMessage != null"
                v-model="snackbarMessage.show"
                :timeout="snackbarMessage.timeout"
                :color="snackbarMessage.type"
            >
                {{ snackbarMessage.message }}
                <v-btn dark text class="float-right" @click="fecharMensagem">
                    Fechar
                </v-btn>
            </v-snackbar>
        </v-container>
    </v-app>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {DefaultHeaderTable} from '@/helper/TypeHelper'
import produtosService from '@/service/produtos/ProdutosService'
import ModalEditProduto from '@/components/modal/ModalEditProduto.vue'
import SelectCodigoProduto from "@/components/select/SelectCodigoProduto.vue";
import {ParamPesquisaProdutos} from "@/interfaces/produtos/Produtos";
import {SnackbarMessage} from "@/store/common/types";
import {CommonModule} from "@/store/common";
import SelectNomeProduto from "@/components/select/SelectNomeProduto.vue";
import ModalAddProduto from "@/components/modal/ModalAddProduto.vue";

@Component({
    components: {ModalAddProduto, SelectNomeProduto, SelectCodigoProduto, ModalEditProduto}
})
export default class Produtos extends Vue {

    public showModalEditProduto: boolean = false
    public produtos: Produtos[] = []
    public headers: DefaultHeaderTable[] = [
        { text: 'Código', value: 'codigo' },
        { text: 'Produto', value: 'produto' },
        { text: 'Custo', value: 'custo' },
        { text: 'PIS - COF', value: 'pisCof' },
        { text: 'Médio', value: 'medio' },
        { text: '', value: 'acao', sortable: false }
    ]

    public filtros: ParamPesquisaProdutos = {
        codigo: [],
        produto: [],
    }

    public async getProdutos(): Promise<void> {
        this.produtos = await produtosService.getProdutos(this.filtros)
    }

    public mounted(): void {
        this.getProdutos()
    }
    public editar(codigo: number) {
        this.showModalEditProduto = true
    }

    get snackbarMessage(): SnackbarMessage | null {
        return CommonModule.message
    }

    public fecharMensagem(): void {
        CommonModule.closeMessage()
    }

    public limparFiltros(): void {
        this.filtros = {
            codigo: [],
            produto: [],
        }
        this.getProdutos()
    }

    public atualizarDados(): void {
        this.getProdutos()
    }
}
</script>

<style scoped lang="scss">
    .mg-top-content {
        margin-top: -8px !important;
    }

</style>