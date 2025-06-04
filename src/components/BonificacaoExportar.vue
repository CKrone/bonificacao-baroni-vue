<template>
    <v-app class="bg-login">
        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" md="4">
                        <v-card class="elevation-12 mx-auto" max-width="1200">
                            <v-card-text>
                                <v-form ref="form" :lazy-validation="lazy">
                                    <v-row>
                                        <v-col cols="9">
                                            <v-file-input
                                                @change="getNamePdf"
                                                background-color="white"
                                                dense
                                                hide-details
                                                outlined
                                                label="Relatório em PDF de Vendas"
                                                v-model="relatorioPdf"
                                            />
                                        </v-col>
                                        <v-col cols="3">
                                            <v-btn
                                                :loading="loading"
                                                :disabled="loading"
                                                @click="importarRelatorio"
                                                class="btn-custom"
                                                block
                                            >
                                                Exportar
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="9">
                                            <v-file-input
                                                background-color="white"
                                                dense
                                                hide-details
                                                outlined
                                                label="Excel Base"
                                                v-model="excelBase"
                                            />
                                        </v-col>
                                        <v-col cols="3">
                                            <v-btn
                                                :loading="loadingExcelBase"
                                                :disabled="loadingExcelBase"
                                                @click="importar"
                                                class="btn-custom"
                                                block
                                            >
                                                Importar
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                            <modal-confirmacao
                                v-model="confirmarUploadBase"
                                titulo="Adicionar Novos Produtos"
                                @confirm-action="importarExcelBase"
                                max-width="600"
                            >
                                <template>
                                    <p>Essa ação irá apagar todos registros do banco e irá inserir novos, deseja continuar?</p>
                                </template>
                            </modal-confirmacao>
                            <v-snackbar
                                v-if="snackbarMessage != null"
                                v-model="snackbarMessage.show"
                                :timeout="snackbarMessage.timeout"
                                :color="snackbarMessage.type"
                            >
                                {{ snackbarMessage.message }}
                                <v-btn dark text @click="fecharMensagem">
                                    Fechar
                                </v-btn>
                            </v-snackbar>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>
<script lang="ts">
import {Component, Ref, Vue} from 'vue-property-decorator'
import uploadService from '@/service/upload/UploadService'
import {CommonModule} from '@/store/common'
import {Produtos, ProdutosRelatorio} from '@/interfaces/excel/ExcelInterface'
import {ExportObject} from '@/interfaces/exportacao/ExportacaoTypes'
import Excel from '@/interfaces/excel/Excel'
import Zip from '@/interfaces/zip/Zip'
import produtosService from '@/service/produtos/ProdutosService'
import {SnackbarMessage} from '@/store/common/types'
import ModalConfirmacao from '@/components/modal/ModalConfirmacao.vue'

@Component({
    components: {ModalConfirmacao}
})
export default class BonificacaoExportar extends Vue {

    @Ref() form!: any
    public loading = false
    public lazy = false
    public relatorioPdf: string | null = null
    public excelBase: string | null = null
    public produtos: Produtos[] = []
    public relatorioProdutos: ProdutosRelatorio[] = []
    public confirmarUploadBase: boolean = false
    public loadingExcelBase: boolean = false
    public nameFilePdf: string = ''
    public idRowsDeleted: any

    public async importarRelatorio() {
        if (!this.relatorioPdf) {
            CommonModule.showMessage({message: 'Por favor, adicione um arquivo', type: 'error'})
            return
        }

        this.loading = true
        let file: string
        file = this.relatorioPdf
        let formData = new FormData()
        formData.append('file', file)

        try {
            const response = await uploadService.importarPdfRelatorio(formData)
            this.relatorioProdutos = response.data
            await this.exportar()
        } catch (error: any) {
            CommonModule.showMessage({message: error.response.data.error, type: 'error'})
            this.relatorioPdf = null
        } finally {
            this.loading = false
        }
    }

    public async exportar(): Promise<void> {
        await this.getProdutos()
        const data = this.gerarItensParaExportacao()

        const colunasExportacao = {
            produto: 'Produto',
            codigo: 'Código',
            qtde: 'Qtde',
            preco: 'Preço',
        }
        const exportObject: ExportObject = {
            data: data,
            columns: colunasExportacao,
            fileName: this.nameFilePdf,
            fileTitle: 'Relatório Bonificação Total',
            fileSubject: 'Relatório Gerado',
            fileAuthor: 'Wesley',
            createdDate: new Date(),
        }

        const excel = new Excel(exportObject)
        const file = await excel.export(excel.buffer)

        const zip = new Zip([file], exportObject.fileName + '.zip')
        await zip.generateZip()
    }

    public async getProdutos() {
        this.produtos = await produtosService.getProdutosExportar()
        this.idRowsDeleted = await produtosService.getIdRowsDeleted()
    }

    public gerarItensParaExportacao(): any {
        return this.produtos.map((el) => {
            const elR = this.relatorioProdutos.find((e) => e.codigo === el.codigo)

            if (elR) {
                return {
                    produto: el.produto,
                    codigo: el.codigo,
                    qtde: elR.qntFinal,
                    preco: elR.pMedio
                }
            } else {
                return {
                    produto: el.produto,
                    codigo: el.codigo,
                    qtde: el.qtde,
                    preco: el.preco,
                }
            }
        })
    }

    public async importarExcelBase(): Promise<void> {
        if (!this.excelBase) {
            CommonModule.showMessage({message: 'Por favor, adicione um arquivo', type: 'error'})
            this.confirmarUploadBase = false
            return
        }

        this.confirmarUploadBase = false
        this.loadingExcelBase = true

        let file: string
        file = this.excelBase
        let formData = new FormData()
        formData.append('file', file)
        try {
            await uploadService.importarExcelBase(formData).then((r) => {
                CommonModule.showMessage({message: r.data.message, type: '#015b41'})
                this.excelBase = null
            })
        } catch (error: any) {
            CommonModule.showMessage({message: error.response.data.error, type: 'error'})
            this.excelBase = null
        } finally {
            this.loadingExcelBase = false
        }
    }

    public getNamePdf(event: any): void {
        this.nameFilePdf = event.name
            .split('.').slice(0, -1).join('.')
    }

    public importar(): void {
        this.confirmarUploadBase = true
    }

    get snackbarMessage(): SnackbarMessage | null {
        return CommonModule.message
    }

    public fecharMensagem(): void {
        CommonModule.closeMessage()
    }
}
</script>
<style>
</style>