<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator'

@Component({})
export default class ModalConfirmacao extends Vue {
    @Prop()
    public value!: boolean

    @Prop()
    public titulo!: string

    @Prop({ default: 400 })
    public maxWidth!: number

    @Prop()
    public loading!: boolean

    @Prop({ default: 'Confirmar' })
    public labelConfirmacao?: string

    @Prop({ default: '#015b41' })
    public corConfirmacao?: string

    @Emit()
    public confirmAction(): void {}

    get show(): boolean {
        return this.value
    }

    set show(value) {
        this.$emit('input', value)
    }
}
</script>

<template>
    <v-dialog v-model="show" :max-width="maxWidth">
        <v-card>
            <v-card-title class="heading">{{ titulo }}</v-card-title>
            <v-card-text>
                <slot />
            </v-card-text>
            <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn small @click="show = false" :disabled="loading">Cancelar</v-btn>
                <v-btn small :color="corConfirmacao" :loading="loading" @click="confirmAction" class="white--text">{{ labelConfirmacao }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped lang="scss">

</style>