<template>
    <div>

        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">

                    <a href="#item1mobile" data-wid="tab-top-subpage-1.html"
                       v-for = "item in categories"
                       :key = "item.id"
                       :class="['mui-control-item', item.id === 0 ? 'mui-active' : '']"
                       @click="getPhotoData(item.id)"
                    >
                        {{ item.title }}
                    </a>
                    
                </div>
            </div>
        </div>

        <ul class="photo-list">
            <router-link
                    v-for="item in photoData"
                    :key="item.id"
                    tag="li"
                    :to="'/home/photo/detail/'+item.id"
            >
                <img v-lazy="item.img_url">

                <div class="content">
                    <h3>{{ item.title }}</h3>
                    <p>{{ item.zhaiyao }}</p>
                </div>
            </router-link>
        </ul>

    </div>
</template>

<script>
    import mui from '../../assets/mui/js/mui.js'
    import {Toast} from 'mint-ui'

    export default {
        name: "PhotoList",
        data() {
            return {
                categories: [],
                photoData: []
            }
        },
        methods: {
            getPhotoCategory() {
                this.$http.get('api/getimgcategory').then(res => {
                    if (res.body.status === 0) {
                        this.categories = res.body.message
                        this.categories.unshift({title: '全部', id: 0})

                    } else {
                        Toast('获取图片分类数据失败')
                    }
                })
            },
            getPhotoData(id = 0) {
                this.$http.get(`api/getimages/${id}`).then(res => {
                    if (res.body.status === 0) {
                        console.log(this.res);
                        this.photoData= res.body.message

                    } else {
                        Toast('获取图片类别数据失败')
                    }
                })
            }
        },
        created() {
            this.getPhotoCategory()
            this.getPhotoData()
        },
        mounted() {
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        }
    }
</script>

<style scoped lang="scss">

    .photo-list {
        list-style: none;
        padding-left: 0;
        margin: 0;

        img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
        li {
            background-color: #e4e6f9;
            text-align: center;
            position: relative;

            img {
                width: 100%;
            }

            padding: 0 5px;
        }

        .content {
            position: absolute;
            bottom: 0;
            left: 0;
            text-align: left;
            padding: 0 10px;
            color: #fff;

            p {
                color: #fff;
            }
            h3 {
                font-size: 16px;
            }
        }
    }
    

</style>