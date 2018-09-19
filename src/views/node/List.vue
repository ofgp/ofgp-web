<template>
    <div class="node-container">
        <div class="header clearfix">
            <div class="title"><i class="iconfont icon-title_icon_point"></i>{{$t('node-list.node-1')}}</div>
            <div class="header-right"><span class="total-count">{{$t('node-list.node-2')}}：{{total}}</span><span class="node-count">{{$t('node-list.node-3')}}：{{online}}</span></div>
        </div>
        <div class="table-list">
            <table>
                <thead>
                <tr>
                    <th>IP</th>
                    <th>{{$t('node-list.node-4')}}</th>
                    <th>{{$t('node-list.node-5')}}</th>
                    <th>{{$t('node-list.node-6')}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in nodeList" :key="index" @click="goToDetail(item)">
                    <td>{{item.ip}}</td>
                    <td>{{item.host_name}}</td>
                    <td>{{item.is_leader ? '是' : '否'}}</td>
                    <td>
                        <radio-button :checked="item.is_online"></radio-button>
                    </td>
                </tr>
                <tr v-if="nodeList.length === 0">
                    <td colspan="4">暂无数据</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import RadioButton from "../../components/RadioButton";
    import {NodeUrl} from "../../config/config";
    import {CURRENT_NODE} from "../../constant/constant";

    export default {
        name: "List",
        components: {RadioButton},
        data: function () {
            return {
                nodeList: [],
                total: 0,
                online: 0,
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.get(NodeUrl.list, null, (res) => {
                    this.nodeList = res.data ? res.data : [];
                    this.total = res.count;
                    this.online = res.online;
                })
            },
            goToDetail(item) {
                this.$router.push({name: 'node-detial'});
                localStorage.setItem(CURRENT_NODE, JSON.stringify(item));
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/global";

    .node-container {
        padding: 0 0 0.4rem 0;
        .header {
            width: 100%;
            height: 0.4rem;
            line-height: 0.4rem;
            padding: 0.3rem 0;
            .title {
                float: left;
                font-size: @biger;
                font-weight: normal;
                color: @homeListItemColor;
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
                .node-count {
                    display: inline-block;
                    padding: 0 0.35rem;
                    background: @nodeCount;
                }
            }
        }

        .table-list {
            table {
                width: 100%;
                table-layout: fixed;
                thead {
                    tr {
                        th {
                            width: 25%;
                            height: 0.6rem;
                            line-height: 0.6rem;
                            padding: 0 10px;
                            background: @whiteColor;
                            text-align: center;
                            font-size: @middle;
                            font-weight: bold;
                            color: @homeListItemColor;
                        }
                    }
                }
                tbody {
                    tr {
                        &:nth-child(odd) {
                            background: @trOddBg;
                        }
                        &:nth-child(even) {
                            background: @whiteColor;
                        }
                        cursor: pointer;
                        &:hover {
                            background: @trHoverBg;
                        }
                        td {
                            width: 25%;
                            height: 0.5rem;
                            line-height: 0.5rem;
                            padding: 0 10px;
                            text-align: center;
                            font-size: @small;
                            color: @homeListItemColor;
                        }
                    }
                }
            }
        }
    }
</style>