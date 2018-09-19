<template>
    <div class="node-detail-container">
        <sub-title :title='$t("node-detail.node-detail-1")'></sub-title>
        <div class="box-container">
            <div class="title-box">
                <div class="title"><span class="label">IP</span><span class="content">{{pageData.ip}}</span></div>
            </div>
            <div class="container-body">
                <dl class="clearfix">
                    <dt>{{$t("node-detail.node-detail-2")}}</dt>
                    <dd>{{pageData.host_name}}</dd>
                    <dt>{{$t("node-detail.node-detail-3")}}</dt>
                    <dd>{{pageData.is_leader ? '是' : '否'}}</dd>
                    <dt>{{$t("node-detail.node-detail-4")}}</dt>
                    <dd>
                        <radio-button :checked="pageData.is_online"></radio-button>
                    </dd>
                    <dt>{{$t("node-detail.node-detail-5")}}</dt>
                    <dd>{{pageData.fired_cnt}}</dd>
                </dl>
            </div>
        </div>
        <sub-title title="Watcher"></sub-title>
        <div class="table-list">
            <table>
                <thead>
                <tr>
                    <th>{{$t("node-detail.node-detail-7")}}</th>
                    <th>{{$t("node-detail.node-detail-8")}}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>BTC</td>
                    <td>{{pageData.btc_height}}</td>
                </tr>
                <tr>
                    <td>BCH</td>
                    <td>{{pageData.bch_height}}</td>
                </tr>
                <tr>
                    <td>ETH</td>
                    <td>{{pageData.eth_height}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import SubTitle from "../../components/SubTitle";
    import RadioButton from "../../components/RadioButton";
    import {CURRENT_NODE} from "../../constant/constant";

    export default {
        name: "Detail",
        data: function () {
            return {
                pageData: JSON.parse(localStorage.getItem(CURRENT_NODE))
            }
        },
        components: {RadioButton, SubTitle}
    }
</script>

<style scoped lang="less">
    @import "../../assets/global";

    .node-detail-container {
        padding: 0.08rem 0 0 0;
        .box-container {
            background: @whiteColor;
            .title-box {
                padding: 0.05rem 0;
                background: @totalCountBg;
                .title {
                    line-height: 0.4rem;
                    padding: 0 0.4rem;
                    color: @whiteColor;
                    font-size: @lager;
                    .label {
                        display: inline-block;
                        width: 1.1rem;
                        font-weight: normal;
                    }
                    .content{
                    }
                }
            }
            .container-body {
                padding: 0.1rem 0.4rem;
                dl {
                    font-size: @small;
                    dt {
                        float: left;
                        width: 1.1rem;
                        line-height: 0.4rem;
                        color: @detailLabelColor;
                        font-size: @small;
                    }
                    dd {
                        height: 0.4rem;
                        line-height: 0.4rem;
                        color: @detailLabelColor;
                        font-size: @small;
                    }
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
                            width: 50%;
                            height: 0.6rem;
                            line-height: 0.6rem;
                            background: @whiteColor;
                            padding: 0 10px;
                            font-size: @middle;
                            font-weight: bold;
                            color: @homeListItemColor;
                            &:first-child {
                                padding: 0 0 0 0.8rem;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
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
                        &:hover {
                            background: @trHoverBg;
                        }
                        cursor: pointer;
                        td {
                            width: 50%;
                            height: 0.5rem;
                            line-height: 0.5rem;
                            padding: 0 10px;
                            font-size: @small;
                            font-weight: normal;
                            color: @homeListItemColor;
                            &:first-child {
                                padding: 0 0 0 0.8rem;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                        }
                    }
                }
            }
        }
    }
</style>