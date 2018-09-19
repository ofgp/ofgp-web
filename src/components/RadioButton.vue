<template>
    <div class="radio-wrap" :class="{'checked':checked}">
        <span class="btn"></span>{{checked ? $t('radio.radio-1') : $t('radio.radio-2')}}
    </div>
</template>

<script>
    export default {
        name: "RadioButton",
        props: {
            checked: {
                type: Boolean,
                default: false,
            }
        }
    }
</script>

<style scoped lang="less">
    .radio-wrap {
        line-height: 0.4rem;
        color: #828282;
        font-size: 0.14rem;
        &.checked {
            color: #FF8C5F;
            .btn {
                border: 0.04rem solid #ffccb7;
                background: #ff8c5f;
            }
        }
        .btn {
            display: inline-block;
            width: 0.08rem;
            height: 0.08rem;
            margin: -0.02rem 0.1rem 0 0;
            border: 0.04rem solid #d9d9db;
            border-radius: 50%;
            background: #bababa ;
            vertical-align: middle;
        }
    }
</style>