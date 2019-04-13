<template>
       <!--轮播图-->
       <mt-swipe :auto="4000">
           <mt-swipe-item v-for="item in swipeData" :key="item.id">
               <a href="javascript:;"><img :src="item.img" alt="" :class="{fullscreen: isFull}"></a>
           </mt-swipe-item>
       </mt-swipe>
</template>

<script>
    export default {
        name: "Swipe",
        props: ['swipeData', 'isFull']
    }
</script>

<style scoped lang="scss">
    .mint-swipe {
        height: 200px;
        text-align: center;
        background-color: #fff;

        .mint-swipe-item .fullscreen {
            width: 100%;
            height: 200px;
        }

        .mint-swipe-item img {
            height: 200px;
            width: 50%;
        }
    }


</style>