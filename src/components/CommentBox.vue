<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要发表的内容" v-model="commentContent"></textarea>
        <mt-button type="primary" size="large" @click="addComment">发表评论</mt-button>
        <hr>
        <div class="cmt-list">

            <div class="cmt-item" v-for="(item, ind) in commetsList" :key="ind">
                <div class="cmt-title">
                    第{{ ind+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;发表时间：{{ item.add_time | formatDate }}
                </div>
                <div class="cmt-body">
                    {{ item.content }}
                </div>
            </div>

        </div>
        <mt-button type="danger" size="large" plain @click="getMore" v-show="noMore">加载更多</mt-button>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    export default {
        name: "CommentBox",
        props: ['id'],
        data() {
            return {
                index: 1,
                commetsList: [],
                noMore: true,
                commentContent: ""
            }
        },
        methods: {
            getCommonts() {
                this.$http.get(`api/getcomments/${this.id}?pageindex=${this.index}`).then(res => {
                    if (res.body.status === 0) {
                        this.commetsList = res.body.message
                    } else {
                        Toast('获取评论数据失败')
                    }
                })
            },
            getMore() {
                this.$http.get(`api/getcomments/${this.id}?pageindex=${++this.index}`).then(res => {
                    if (res.body.status === 0) {
                        if (res.body.message.length < 1) {
                            this.noMore = false
                            return
                        }
                        this.commetsList = [...this.commetsList, ...res.body.message]
                    } else {
                        Toast('获取更多数据失败')
                    }
                })
            },
            addComment() {
                let context = this.commentContent.trim()

                if (context === '') {

                    Toast('请输入发表内容')

                }
                else {
                    this.$http.post(`api/postcomment/${this.id}`, {

                        content: context

                    }).then(res => {

                        if (res.body.status === 0) {
                            // 创建一个评论对象
                            const clone = JSON.parse(JSON.stringify(this.commetsList[0]))
                            clone.add_time = Date.now()
                            clone.content = this.commentContent

                            this.commetsList.unshift(clone)
                            // 初始化为空
                            this.commentContent = ''
                            Toast('评论发表成功')
                        }
                        else {
                            Toast('评论发表失败')
                        }

                    })
                }
            }
        },
        created() {
            this.getCommonts()
        }
    }
</script>


<style lang="scss" scoped>
    .cmt-container {
        h3 {
            font-size: 18px;
        }

        textarea {
            font-size: 14px;
            height: 85px;
            margin: 0;
        }

        .cmt-list {
            margin: 5px 0;

            .cmt-item {
                font-size: 13px;

                .cmt-title {
                    line-height: 30px;
                    background-color: #ccc;
                }

                .cmt-body {
                    line-height: 35px;
                    text-indent: 2em;
                }
            }
        }
    }
</style>