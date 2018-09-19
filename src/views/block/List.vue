<template>
    <div class="block-container">
        <div class="header clearfix">
            <div class="title"><i class="iconfont icon-title_icon_block1"></i>{{$t("block-list.block-1")}}</div>
            <div class="header-right"><span class="total-count">{{$t("block-list.block-2")}}：{{count}}</span><span class="search"><i class="iconfont icon-icon_search"></i><input @keyup.enter="init()" v-model="paramData.search" :placeholder='$t("block-list.block-3")'/></span></div>
        </div>
        <div class="table-list">
            <table>
                <thead>
                <tr>
                    <th>{{$t("block-list.block-4")}}</th>
                    <th>{{$t("block-list.block-5")}}</th>
                    <th>{{$t("block-list.block-6")}}</th>
                    <th>{{$t("block-list.block-7")}}</th>
                    <th>{{$t("block-list.block-8")}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in blockList" :key="index" @click="goToDetail(item.height)">
                    <td>{{item.height}}</td>
                    <td>{{item.tx_cnt}}</td>
                    <td>{{item.miner}}</td>
                    <td>{{item.time | format}}</td>
                    <td>{{item.created_used}}s</td>
                </tr>
                <tr v-if="blockList.length === 0">
                    <td colspan="5" style="text-align: center">{{$t("block-list.block-14")}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="page-container clearfix">
            <div class="change-page-size-container">
                {{$t("block-list.block-9")}}<input class="page-size" type="number" @blur="init()" @keyup.enter="init()" v-model="paramData.page_size"/>{{$t("block-list.block-13")}}<span class="total-count">{{count}}</span>{{$t("block-list.block-10")}}
            </div>
            <paginate
                    :page-count="pageCount"
                    :page-range="3"
                    :margin-pages="3"
                    :click-handler="clickCallback"
                    :prev-text="'<'"
                    :next-text="'>'"
                    :first-last-button="true"
                    :first-button-text="'<<'"
                    :last-button-text="'>>'"
                    :disabled-class="'disable-item'"
                    :container-class="'pagination'"
                    :page-class="'page-item'">
            </paginate>
        </div>
    </div>
</template>

<script>
    import {BlockUrl} from "../../config/config";

    export default {
        name: "List",
        data: function () {
            return {
                paramData: {
                    page: 1,
                    page_size: 20,
                    search: this.$route.query.searchText,
                },
                count: 0,
                pageCount: 0,
                blockList: [],
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.get(BlockUrl.list, this.paramData, (res) => {
                    this.count = res.count;
                    if (this.count !== 0 && this.paramData.page_size) {
                        this.pageCount = Math.ceil(this.count / this.paramData.page_size);
                    }
                    this.blockList = res.data ? res.data : [];
                })
            },
            goToDetail(id) {
                this.$router.push({name: 'block-detail', params: {id: id}})
            },
            clickCallback(pageNum) {
                this.paramData.page = pageNum;
                this.init();
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/global";

    .block-container {
        padding: 0 0 0.4rem 0;
        .header {
            width: 100%;
            height: 0.4rem;
            line-height: 0.4rem;
            padding: 0.3rem 0;
            .title {
                float: left;
                font-size: @biger;
                color: @homeListItemColor;
                font-weight: normal;
                i {
                    margin: 0 0.1rem 0 0;
                    font-weight: bold;
                    font-size: @biger;
                    color: @subIconColor;
                }
            }
            .header-right {
                float: right;
                .total-count {
                    display: inline-block;
                    padding: 0 0.35rem;
                    margin: 0 0.2rem 0 0;
                    background: @totalCountBg;
                }
                .search {
                    display: inline-block;
                    width: 3rem;
                    height: 0.4rem;
                    background: @whiteColor;
                    i {
                        margin: 0 0 0 0.1rem;
                        color: #697cfe;
                    }
                    input {
                        float: right;
                        width: 2.6rem;
                        height: 0.4rem;
                        border: none;
                        background: transparent;
                        color: @homeListItemColor;
                        font-weight: normal;
                    }
                }
            }
        }

        .table-list {
            table {
                width: 100%;
                table-layout: fixed;
                color: @homeListItemColor;
                thead {
                    tr {
                        th {
                            height: 0.6rem;
                            line-height: 0.6rem;
                            padding: 0 10px;
                            background: @whiteColor;
                            font-size: @middle;
                            font-weight: normal;
                            &:first-child {
                                width: 25%;
                                padding: 0 0 0 0.6rem;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                        }
                    }
                }
                tbody {
                    tr {
                        cursor: pointer;
                        &:nth-child(odd) {
                            background: @trOddBg;
                        }
                        &:nth-child(even) {
                            background: @whiteColor;
                        }
                        &:hover {
                            background: @trHoverBg;
                        }
                        td {
                            width: 25%;
                            height: 0.5rem;
                            line-height: 0.5rem;
                            padding: 0 10px;
                            font-size: @small;
                            &:first-child {
                                width: 20%;
                                padding: 0 0 0 0.6rem;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                        }
                    }
                }
            }
        }
        .page-container {
            margin: 24px 0 0 0;
            .change-page-size-container {
                float: left;
                height: 40px;
                line-height: 40px;
                padding: 0 15px;
                background: white;
                color: @homeListItemColor;
                .total-count {
                    padding: 0 5px;
                    color: #697cfe;
                }
                .page-size {
                    width: 50px;
                    margin: 0 15px;
                    text-align: center;
                    background: #f3f4f7;
                    color: #505051;
                }
            }
        }

    }
</style>