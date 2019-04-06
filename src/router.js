import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeContainer from "./views/HomeContainer.vue";
import MemberContainer from "./views/MemberContainer.vue";
import ShopcarContainer from "./views/ShopcarContainer.vue";
import SearchContainer from "./views/SearchContainer.vue";

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {path: '/', redirect: '/home'},
        {path: '/home', component: HomeContainer},
        {path: '/member', component: MemberContainer},
        {path: '/shopcar', component: ShopcarContainer},
        {path: '/search', component: SearchContainer}
    ],
    linkActiveClass: 'mui-active'
})