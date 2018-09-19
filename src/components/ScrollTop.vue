<template>
    <span @click="scrollToTop()" :style="{bottom:bottom}" class="btn-scroll-top" :class="{'active':isShow}"><i
            class="iconfont icon-btn_top"></i></span>
</template>

<script>
    export default {
        name: "ScrollTop",
        props: {
            bottom: {
                type: String,
                default: '10px',
            },
            isShow: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
        },
        methods: {
            scrollToTop() {
                window.scrollTo(0, 0);
                this.$emit('hidescrolltop', false);
            }
        },
        destroyed() {

        }
    }
</script>

<style scoped lang="less">
    .btn-scroll-top {
        display: none;
        position: fixed;
        bottom: 0.9rem;
        left: 50%;
        padding: 0.2rem;
        margin-left: 6.2rem;
        text-align: center;
        background: white;
        cursor: pointer;
        &.active {
            display: inline-block;
        }
        .iconfont {
            float: left;
            font-size: 0.2rem;
            color: #7C8996;
        }
    }

</style>