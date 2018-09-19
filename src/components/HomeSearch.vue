<template>
    <div class="search-container">
        <div class="logo"><i class="iconfont icon-home_logo"></i></div>
        <div class="search-box">
            <span class="search-wrap"><i class="iconfont icon-home_icon_search"></i><input v-model="searchText" placeholder="请输入TXid/块高度" @keyup.enter="searchData()"/></span>
        </div>
    </div>
</template>

<script>

    export default {
        name: "HomeSearch",
        data: function () {
            return {
                searchText: '',
            }
        },
        methods: {
            searchData() {
                if (Object.prototype.toString.call(this.searchText) === "[object String]" && this.searchText.length > 50) {
                    this.$router.push({path: '/transaction/list', query: {searchText: this.searchText}});
                } else if(Number(this.searchText) || Number(this.searchText) === 0){
                    this.$router.push({path: '/block/list', query: {searchText: this.searchText}})
                }else{
                    this.$toast("请输入正确的TxId",'warn')
                }
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../assets/global";

    .search-container {
        padding: 0.7rem 0 0 0;
        background: @headerBg;
        .logo {
            padding: 0 0 0.2rem 0;
            text-align: center;
            i {
                font-size: 0.2rem;
                color: white;
            }
        }
        .search-box {
            width: 100%;
            height: 1.5rem;
            text-align: center;
            background: url("../assets/images/home_bg_banner.png") repeat-x center bottom;
            .search-wrap {
                display: inline-block;
                width: 7rem;
                height: 0.5rem;
                background: @homeSearchInputBg;
                i {
                    float: left;
                    width: 0.6rem;
                    line-height: 0.5rem;
                    text-align: center;
                    color: #dcdcdd;
                }
                input {
                    float: left;
                    width: 6.2rem;
                    height: 0.5rem;
                    background: transparent;
                    color: @whiteColor;
                    border: none;
                }
            }

        }
    }
</style>