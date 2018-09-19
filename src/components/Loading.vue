<template>
    <div class="loading">
        <img src="../assets/images/ball-triangle.svg"/>
    </div>
</template>

<script>
    export default {
        name: "Loading"
    }
</script>

<style scoped lang="less">
    .loading {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 2;
        img {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }
</style>