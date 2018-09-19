<template>
    <div id="app">
        <TopHeader :path="currentTabPath" @refresh="refresh()"/>
        <HomeSearch v-if="isShowSearch"/>
        <div class="app-main">
            <router-view :key="activeDate"/>
        </div>
        <Loading v-show="SHOW_LOADING"/>
    </div>
</template>
<script>
    import TopHeader from "./components/TopHeader";
    import Loading from "./components/Loading";
    import {mapGetters} from 'vuex';
    import {SHOW_LOADING} from "./store/getter-types";
    import HomeSearch from "./components/HomeSearch";

    export default {
        components: {HomeSearch, TopHeader, Loading},
        data: function () {
            return {
                isShowSearch: true,
                currentTabPath: '/',
                activeDate: null
            };
        },
        mounted() {
            this.resizeWindow();
            window.addEventListener('resize', this.resizeWindow);
            this.activeDate = new Date().getTime()
        },
        computed: {
            ...mapGetters([SHOW_LOADING])
        },
        watch: {
            $route(to) {
                this.isShowSearch = to.path === '/';
                this.currentTabPath = to.path;

            }
        },
        methods: {
            resizeWindow() {
                let width = window.innerWidth;
                if (width > 1300) {
                    width = 1280;
                } else if (width < 900 && width > 750) {
                    width = 900;
                }
                document.querySelector('html').style.fontSize = (width / (width <= 750 ? 750 : 1280)) * 100 + 'px';
            },
            refresh() {
                this.activeDate = new Date().getTime();
            }
        },
        destroyed() {
            window.removeEventListener('resize', this.resizeWindow)
        }
    }
</script>
<style lang="less">
    @import "assets/global";

    #app {
        font-size: @middle;
        .app-main {
            width: 12rem;
            margin: 0 auto;
        }
    }
</style>