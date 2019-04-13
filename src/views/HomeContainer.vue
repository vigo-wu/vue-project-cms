<template>
    <div>
        <swipe :swipeData="dataList" :isFull="true"></swipe>

        <!--六宫格-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <router-link to="/home/news">
                    <img src="../assets/images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <router-link to="/home/photo">
                    <img src="../assets/images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <router-link to="/home/product">
                    <img src="../assets/images/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <router-link to="/">
                    <img src="../assets/images/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <router-link to="/">
                    <img src="../assets/images/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <router-link to="/">
                    <img src="../assets/images/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import Swipe from '../components/Swipe.vue'

    export default {
        name: "HomeContainer",
        data() {
            return {
                dataList: []
            }
        },
        methods: {
            getList() {
                this.$http.get('api/getlunbo').then(res => {
                    if (res.body.status === 0) {
                        this.dataList = res.body.message
                    } else {
                        Toast('获取轮播图数据失败')
                    }
                })
            }
        },
        created() {
            this.getList()
        },
        components: {
            Swipe
        }

    }
</script>

<style scoped lang="scss">


    /*六宫格*/
    .mui-table-view-cell img {
        width: 60px;
    }

    .mui-grid-view.mui-grid-9 {
        border: none;
        background-color: #fff;
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border: none;
    }
</style>