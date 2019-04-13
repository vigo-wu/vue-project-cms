<template>
        <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" value="1" @change="getNum" ref="numbox" />
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
</template>

<script>
    import mui from '../assets/mui/js/mui.js'

    export default {
        mounted(){
            //初始化数字选择组件
            mui('.mui-numbox').numbox()
        },
        name: "NumberSelector",
        data() {
            return {
            }
        },
        props: ["max"],
        methods: {
            getNum() {
                this.$emit('getSelNum', this.$refs.numbox.value)
            }
        }
    }
</script>

<style scoped lang="scss">

</style>