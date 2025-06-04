import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import money from 'v-money'
import '@mdi/font/css/materialdesignicons.css'
import vuetify from '@/plugins/vuetify'
import './filter'

Vue.use(money)
Vue.config.productionTip = false
window.addEventListener('unhandledrejection', function (event) {
    if (axios.isCancel(event.reason)) {
        event.preventDefault()
    }
})

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app')
