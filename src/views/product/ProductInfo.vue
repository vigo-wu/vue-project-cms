<template>
    <div>
        <swipe :swipeData="imgList"></swipe>
    </div>
</template>

<script>
    import Swipe from '../../components/Swipe.vue'

    export default {
        name: "ProductInfo",
        data() {
            return {
                imgList: [],
                infoData: []
            }
        },
        methods: {
            getDesc() {
                this.$http.get(`api/goods/getdesc/${this.$route.params.id}`).then(res => {
                    console.log(res);
                })
            },
            getThumimg() {
                this.$http.get(`api/getthumimages/${this.$route.params.id}`).then(res => {
                    if (res.body.status === 0) {
                        res.body.message.forEach(item => {
                            item.img = item.src
                        })

                        this.imgList = res.body.message
                    }
                })
            }
        },
        created() {
            this.getDesc()
            this.getThumimg()
        },
        components: {
            Swipe
        }

    }
</script>

<style scoped>

</style>