import Vue from 'vue'
import router from './router.js'
import App from './App.vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

// mui
import './assets/mui/css/mui.css'
import './assets/mui/css/icons-extra.css'

// 组件导入
import { Header, Swipe, SwipeItem } from 'mint-ui'
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Header.name, Header);



const vm = new Vue({
    render(creatElement) {
        return creatElement(App)
    },
    router
}).$mount('#app')