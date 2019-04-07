<template>
    <div class="newsinfo-container">
        <h3 class="title">{{ detailData.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ detailData.add_time | formatDate }}</span>
            <span>点击：{{ detailData.click }}次</span>
        </p>
        <div class="content" v-html="detailData.content"></div>
        <comment-box></comment-box>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import CommentBox from '../../components/CommentBox.vue'
    export default {
        name: "NewDetail",
        data() {
            return {
                id: this.$route.params.id,
                detailData: {}
            }
        },
        methods: {
            getNewDetail() {
                this.$http.get("api/getnew/"+this.id).then(res => {
                    if (res.body.status === 0) {
                        this.detailData = res.body.message[0]
                    }
                    else {
                        Toast('获取新闻详情失败')
                    }
                })
            }
        },
        created() {
            this.getNewDetail()
        },
        components: {
            CommentBox
        }

    }
</script>

<style scoped lang="scss">
    .newsinfo-container {
        padding: 0 4px;

        .title {
            font-size: 16px;
            text-align: center;
            margin: 15px 0;
            color: red;
        }

        .subtitle {
            font-size: 13px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
    }
</style>
<style lang="scss">
    .newsinfo-container .content {
        img {
            width: 100%;
        }
    }
</style>