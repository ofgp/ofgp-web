<template>
    <div class="header-container">
        <div class="header">
            <a class="logo" @click="goToHome()"><i class="iconfont icon-top_logo"></i></a>
            <ul class="clearfix">
                <li>
                    <a :class="{'active':path === '/'}" @click="selectItem('/home')">{{$t('top.top-1')}}</a>
                </li>
                <li>
                    <a :class="{'active':path === '/node/list' || path.indexOf('/node/detail') !== -1}" @click="selectItem('/node/list')">{{$t('top.top-2')}}</a>
                </li>
                <li>
                    <a :class="{'active':path === '/block/list' || path.indexOf('/block/detail') !== -1 }" @click="selectItem('/block/list')">{{$t('top.top-3')}}</a>
                </li>
                <li>
                    <a :class="{'active':path === '/transaction/list' || path.indexOf('/transaction/detail') !== -1}" @click="selectItem('/transaction/list')">{{$t('top.top-4')}}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

    export default {
        name: "TopHeader",
        props: {
            path: {
                type: String,
                default: '/'
            }
        },
        data: function () {
            return {}
        },
        methods: {
            /**
             * 设置选中样式以及跳转
             * @param url
             */
            selectItem(url) {
                if (this.$route.fullPath.indexOf(url) > -1) {
                    this.$emit("refresh")
                } else {
                    this.$router.push({path: url});
                }
            },
            /**
             * 返回首页
             */
            goToHome() {
                this.$router.push('/');
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../assets/global.less';

    .header-container {
        width: 100%;
        height: 0.7rem;
        line-height: 0.7rem;
        background: @headerBg;
        font-size: @lager;
        .header {
            padding: 0 0.34rem;
            color: @headerColor;
            .logo {
                float: left;
                display: inline-block;
                width: 1.7rem;
                height: 0.4rem;
                line-height: 0.4rem;
                padding: 0.15rem 0.46rem 0 0;
                text-align: center;
                overflow: hidden;
                i {
                    color: white;
                }
                img {
                    max-width: 100%;
                    max-height: 0.4rem;
                }
            }
            ul {
                li {
                    float: left;
                    a {
                        &.active {
                            background: @headerItemHover;
                            color: @whiteColor;
                            font-weight: bold;
                        }
                        display: block;
                        width: 1.2rem;
                        height: 0.7rem;
                        text-align: center;
                        color: @topTitleColor;
                        font-size: @lager;
                        font-weight: 300;
                        &:hover {
                            background: @headerItemHover;
                            color: @whiteColor;
                            font-weight: normal;
                        }
                    }
                }
            }
        }
    }
</style>