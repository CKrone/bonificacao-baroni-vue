<template>
    <v-dialog v-model="show" :max-width="maxWidth">
        <v-card>
            <v-card-title class="title">
                {{ titulo }}
                <div class="flex-grow-1"></div>
                <v-icon @click="closeModal">mdi-close</v-icon>
            </v-card-title>
            <hr class="hr-modal">
            <v-card-text class="content-modal">
                <slot name="text" />
            </v-card-text>
            <template v-if="action">
                <hr class="hr-modal">
                <v-card-actions style="height: 50px; padding: 16px 24px 10px;">
                    <div class="flex-grow-1"></div>
                    <v-btn @click="fechar">
                        Fechar
                    </v-btn>
                    <v-btn @click="salvar">
                        Salvar
                    </v-btn>
                </v-card-actions>
            </template>
        </v-card>
    </v-dialog>
</template>
<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';

@Component({})
export default class Modal extends Vue {
    @Prop()
    public value!: boolean

    @Prop({ default: 'Titulo' })
    public titulo?: string

    @Prop({ default: true })
    public action?: boolean

    @Prop()
    public width?: number | string

    public maxWidth: number | string= this.width ? this.width :  900

    get show() {
        return this.value
    }

    set show(value: boolean) {
        this.$emit('input', value)
        this.emitOnChangeShow(value)
    }

    @Watch('value')
    public onChangeValue(value: boolean) {
        this.emitOnChangeShow(value)
    }

    public emitOnChangeShow(value: boolean): void {
        this.$emit('onChangeShow', value)
    }

    public closeModal(): void {
        this.show = false
    }

    public salvar(): void {
        this.$emit('salvarProduto')
    }

    public fechar(): void {
        this.show = false
    }
}
</script>

<style lang="scss">
        .content-modal {
            min-height: 100px;
            margin-top: 25px;
        }

</style>