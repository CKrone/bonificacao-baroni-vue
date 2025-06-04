<template>
    <v-container>
        <v-toolbar-title>Baroni Bebidas</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn text to="/">Home</v-btn>
        <v-btn text to="/exportar-bonificacao">Exportar Bonificação</v-btn>
        <v-btn text to="/produtos">Produtos</v-btn>
    </v-container>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'

@Component({})
export default class NavBar extends Vue {

}
</script>


<style scoped lang="scss">

</style>