<template>
    <div class="photoinfo-container">
        <h3>{{ photoInfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ photoInfo.add_time | formatDate }}</span>
            <span>点击：{{ photoInfo.click }}次</span>
        </p>
        <hr>
        <!-- 缩略图区域 -->
        <div class="photo-slimg">
            <vue-preview :slides="photoArr" @close="handleClose"></vue-preview>
        </div>
        <!-- 图片内容区域 -->
        <div class="content">
            {{ photoInfo.content }}
        </div>
        <!-- 放置一个现成的评论子组件 -->
        <comment-box :id="id"></comment-box>
    </div>
</template>

<script>
    import CommentBox from '../../components/CommentBox.vue'
    import {Toast} from 'mint-ui'

    export default {
        name: "PhotoDetail",
        data() {
            return {
                id: this.$route.params.id,
                photoArr: [],
                photoInfo: []
            }
        },
        components: {
            CommentBox
        },
        methods: {
            getPhotoImg() {
                this.$http.get(`api/getthumimages/${this.id}`).then(res => {
                    if (res.body.status === 0) {

                        res.body.message.forEach(item => {
                            item.w = 400
                            item.h = 300
                            item.msrc = item.src
                        })

                        this.photoArr = res.body.message

                    } else {
                        Toast('获取缩略图失败')
                    }
                })
            },
            getPhotoInfo() {
                this.$http.get(`api/getimageInfo/${this.id}`).then(res => {
                    if (res.body.status === 0) {
                        this.photoInfo = res.body.message[0]
                    } else {
                        Toast('获取图片信息失败')
                    }
                })
            },
            handleClose() {

            }
        },
        created() {
            this.getPhotoImg()
            this.getPhotoInfo()
        }

    }
</script>

<style scoped lang="scss">

    .photoinfo-container {
        padding: 3px;

        h3 {
            color: #26A2FF;
            font-size: 15px;
            text-align: center;
            margin: 15px 0;
        }

        .subtitle {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }

        .content {
            font-size: 13px;
            line-height: 30px;
        }

    }
</style>

<style lang="scss">
    .photo-slimg {
        overflow: hidden;

        img {
            width: 25%;
            float: left;
            margin: 5px;

        }
    }
</style>