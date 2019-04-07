<template>
    <ul class="mui-table-view">

        <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
            <router-link :to="'/home/news/newDetail/' + item.id">
                <img class="mui-media-object mui-pull-left" :src="item.img_url">
                <div class="mui-media-body">
                    <h4>{{ item.title }}</h4>
                    <p class="mui-ellipsis">
                        <span>发表时间:{{ item.add_time | formatDate() }}</span>
                        <span>点击:{{ item.click }}次</span>
                    </p>
                </div>
            </router-link>
        </li>

    </ul>
</template>

<script>
    import {Toast} from 'mint-ui'


    export default {
        name: 'NewList',
        data() {
            return {
                newsList: []
            }
        },
        methods: {
            getNewsList() {
                this.$http.get('api/getnewslist').then(res => {
                    if (res.body.status === 0) {
                        this.newsList = res.body.message
                    }
                    else {
                        Toast('获取新闻数据失败')
                    }
                })
            }
        },
        created() {
            this.getNewsList()
        }
    }
</script>

<style scoped lang="scss">
.mui-media-body {
    p {
        display: flex;
        justify-content: space-between;
        color: #3875fd;
    }
}
</style>