<template>
    <div class="toast-container" :class="classObject" v-if="isShow">
        <div class="toast">{{messages}}</div>
    </div>
</template>

<script>
    export default {
        name: "Toast",
        data: function () {
            return {
                isShow: true,
                messages: '',
                type: 'info'
            }
        },
        computed: {
            classObject: function () {
                return {
                    'info': this.type === 'info',
                    'warn': this.type === 'warn',
                    'success': this.type === 'success',
                    'error': this.type === 'error',
                }
            }
        },
        methods: {
            close() {
                this.isShow = false;
            }
        }
    }
</script>

<style scoped lang="less">
    .toast-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 50px;
        z-index: 999;
        &.info {
            background: #6995fe;
        }
        &.warn {
            background: orange;
        }
        &.success {
            background: green;
        }
        &.error {
            background: #cb3837;
        }
        .toast {
            line-height: 50px;
            text-align: center;
            color: white;
        }
    }
</style>