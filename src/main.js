import Vue from 'vue'
import router from './router.js'
import App from './App.vue'
import VueResource from 'vue-resource'
import moment from 'moment'

Vue.use(VueResource)
Vue.http.options.root = 'http://www.liulongbin.top:3005/'

// mui
import './assets/mui/css/mui.css'
import './assets/mui/css/icons-extra.css'

// 缩略图组件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 组件导入
/*import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.use(Lazyload)*/
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)



// 全局过滤器定义
Vue.filter('formatDate', (dataStr, pattern = 'YYYY-MM-DD HH:MM:SS') => {
    return moment(dataStr).format(pattern)
})


const vm = new Vue({
    render(creatElement) {
        return creatElement(App)
    },
    router
}).$mount('#app')