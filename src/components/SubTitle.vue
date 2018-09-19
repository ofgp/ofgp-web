<template>
    <div class="sub-title">{{title}}</div>
</template>

<script>
    export default {
        name: "SubTitle",
        props: {
            title: ''
        }
    }
</script>

<style scoped lang="less">
    .sub-title {
        height: 0.64rem;
        line-height: 0.64rem;
        text-align: left;
        font-size: 0.22rem;
        color: #383838;
        font-weight: 400;
    }
</style>