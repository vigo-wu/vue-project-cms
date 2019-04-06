<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in dataList" :key="item.id">
                <a href="javascript:;"><img :src="item.img" alt=""></a>
            </mt-swipe-item>
        </mt-swipe>
        <h3>home</h3>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';

    export default {
        name: "HomeContainer",
        data() {
            return {
                dataList: []
            }
        },
        methods: {
            getList() {
                this.$http.get('http://www.liulongbin.top:3005/api/getlunbo').then(res => {
                    console.log(res);
                    if (res.body.status === 0) {
                        this.dataList = res.body.message
                    }
                    else {
                        Toast('获取轮播数据失败')
                    }
                })
            }
        },
        created() {
            this.getList()
        }
    }
</script>

<style scoped lang="scss">
.mint-swipe {
    height: 200px;
    .mint-swipe-item img{
        width: 100%;
        height: 200px;
    }
}
</style>