import Vue from 'vue'

import './assets/mui/css/mui.css'

import App from './App.vue'
import router from './router.js'

import { Header } from 'mint-ui'

Vue.component(Header.name, Header);



const vm = new Vue({
    render(creatElement) {
        return creatElement(App)
    },
    router
}).$mount('#app')