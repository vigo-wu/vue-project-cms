import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeContainer from "./views/HomeContainer.vue";
import MemberContainer from "./views/MemberContainer.vue";
import ShopcarContainer from "./views/ShopcarContainer.vue";
import SearchContainer from "./views/SearchContainer.vue";
import NewList from "./views/new/NewList.vue";
import NewDetail from "./views/new/NewDetail.vue";

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {path: '/', redirect: '/home'},
        {path: '/home', component: HomeContainer},
        {path: '/member', component: MemberContainer},
        {path: '/shopcar', component: ShopcarContainer},
        {path: '/search', component: SearchContainer},
        {path: '/home/news', component: NewList},
        {path: '/home/news/newDetail/:id', component: NewDetail}
    ],
    linkActiveClass: 'mui-active'
})