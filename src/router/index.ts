import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Home from '@/components/Home.vue'
import BonificacaoExportar from '@/components/BonificacaoExportar.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/exportar-bonificacao',
        name: 'exportar-bonificacao',
        component: BonificacaoExportar,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
