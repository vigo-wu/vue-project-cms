<template>
    <div class="goodsinfo-container">
        <swipe :swipeData="imgList" :isFull="false"></swipe>
        <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter"
        >
            <i class="ball" v-show="isShow" ref="ball"></i>
        </transition>
        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header"></div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>&yen;2399</del>&nbsp;&nbsp;销售价：<span class="now_price">&yen;2199</span>
                    </p>

                    <p>购买数量：<number-selector :max="maxNum" @getSelNum="selNum"></number-selector></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addTran">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>

        <!-- 商品参数区域 -->
        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：</p>
                    <p>库存情况：</p>
                    <p>上架时间：</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain>图文介绍</mt-button>
                <mt-button type="danger" size="large" plain>商品评论</mt-button>
            </div>
        </div>


    </div>
</template>

<script>
    import Swipe from '../../components/Swipe.vue'
    import NumberSelector from '../../components/NumberSelector.vue'

    export default {
        name: "ProductInfo",
        data() {
            return {
                imgList: [],
                infoData: [],
                isShow: false,
                maxNum: 20,
                selectNumber: 0
            }
        },
        methods: {
            getDesc() {
                this.$http.get(`api/goods/getdesc/${this.$route.params.id}`).then(res => {
                    if (res.body.status === 0) {
                        this.infoData = res.body.message
                    }
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
            },
            beforeEnter(el) {
                el.style.transform = "translate(0, 0)"
            },
            enter(el, done) {
                const ballPos = this.$refs.ball.getBoundingClientRect()

                const carPos = document.querySelector("#car").getBoundingClientRect()

                let ballTop = ballPos.top
                let carTop = carPos.top

                let top = carTop - ballTop

                let ballLeft = ballPos.left
                let carLeft = carPos.left

                setTimeout(() => {
                    el.style.transition = "all 1s ease"
                    el.style.transform = `translate(${carLeft}px, ${top}px)`
                }, 0)
                done()
            },
            afterEnter() {
                this.isShow = false
            },
            addTran() {
                this.isShow = true
            },
            selNum(num) {
                this.selectNumber = num
                console.log(this.selectNumber);
            }
        },
        created() {
            this.getDesc()
            this.getThumimg()
        },
        components: {
            Swipe,
            NumberSelector
        }

    }
</script>

<style scoped>
    .ball {
        width: 20px;
        height: 20px;
        background-color: #f00;
        border-radius: 50%;
        position: absolute;
        left: 63px;
        top: 347px;
        z-index: 9999;
    }
</style>