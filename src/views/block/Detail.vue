<template>
    <div class="block-detail-container">
        <sub-title :title='$t("block-detail.block-detail-1")'></sub-title>
        <div class="box-container">
            <div class="title-box">
                <div class="title"><span class="label">Hash</span><span class="content">{{pageData.hash}}</span></div>
                <div class="title"><span class="label">{{$t('block-detail.block-detail-2')}}</span><span class="content">{{pageData.height}}</span></div>
            </div>
            <div class="container-body">
                <dl class="clearfix">
                    <dt>{{$t('block-detail.block-detail-3')}}</dt>
                    <dd>{{pageData.tx_cnt}}</dd>
                    <dt>{{$t('block-detail.block-detail-4')}}</dt>
                    <dd>{{pageData.time | format}}</dd>
                    <dt>{{$t('block-detail.block-detail-5')}}</dt>
                    <dd>{{pageData.size | thousandBitSeparator}} byte</dd>
                    <dt>{{$t('block-detail.block-detail-6')}}</dt>
                    <dd>{{pageData.miner}}</dd>
                    <dt>ParentHash</dt>
                    <dd class="parentHash" @click="prevBlock(pageData.pre_id)">{{pageData.pre_id}}</dd>
                </dl>
            </div>
        </div>
        <sub-title :title='$t("block-detail.block-detail-7")'></sub-title>
        <div class="table-list">
            <table>
                <thead>
                <tr>
                    <th>TxHash</th>
                    <th>{{$t('block-detail.block-detail-8')}}</th>
                    <th>{{$t('block-detail.block-detail-9')}}</th>
                    <th>{{$t('block-detail.block-detail-10')}}</th>
                    <th>{{$t('block-detail.block-detail-11')}}</th>
                    <th>{{$t('block-detail.block-detail-12')}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in watchList" :key="index" @click="goToDetail(item.dgw_hash)">
                    <td v-tooltip="item.dgw_hash">{{item.dgw_hash}}</td>
                    <td>{{item.time | format}}</td>
                    <td>{{item.from_chain | toUpperCase}}</td>
                    <td>{{item.to_chain | toUpperCase()}}</td>
                    <td v-tooltip="item.deal_amount">{{item.deal_amount}}</td>
                    <td v-tooltip="item.deal_fee">{{item.deal_fee}}</td>
                </tr>
                <tr v-if="watchList.length === 0">
                    <td colspan="6" style="text-align: center">{{$t('block-detail.block-detail-13')}}</td>
                </tr>
                </tbody>
            </table>
            <span v-if="watchList.length>10 && isShowLoadMore" @click="loadMore()" class="load-more">{{$t('block-detail.block-detail-14')}}</span>
        </div>
        <scroll-top @hidescrolltop="isShowScrollTop=false" :is-show="isShowScrollTop"></scroll-top>
    </div>
</template>

<script>
    import SubTitle from "../../components/SubTitle";
    import RadioButton from "../../components/RadioButton";
    import {BlockUrl} from "../../config/config";
    import {unitConversion, toUpperCase} from "../../utils/common";
    import ScrollTop from "../../components/ScrollTop";

    export default {
        name: "Detail",
        data: function () {
            return {
                pageData: {},
                isShowLoadMore: true,
                watchList: [],
                isShowScrollTop: false,
                index: 20,
            }
        },
        mounted() {
            this.init(this.$route.params.id);
        },
        methods: {
            init(id) {
                this.get(BlockUrl.detail, {height: id}, (res) => {
                    if (res.trans) {
                        res.trans.forEach((item) => {
                            item.deal_amount = unitConversion(item.amount, item.from_chain) + toUpperCase(item.from_chain);
                            item.deal_fee = unitConversion(item.from_fee, item.from_chain) + toUpperCase(item.from_chain) + '+' + unitConversion(item.dgw_fee, item.from_chain) + toUpperCase(item.from_chain) + '+' + unitConversion(item.to_fee, item.to_chain) + toUpperCase(item.to_chain);
                        });
                    }
                    this.pageData = res;
                    this.watchList = res.trans ? res.trans.slice(0, this.index) : [];
                })
            },
            loadMore() {
                this.watchList = this.watchList.concat(this.pageData.trans.slice(this.index, this.index + 20));
                this.isShowLoadMore = !(this.index >= this.pageData.trans.length);
                this.isShowScrollTop = true;
                this.index += 20;
            },
            goToDetail(id) {
                this.$router.push({name: 'transaction-detail', params: {id: id}});
            },
            prevBlock(id) {
                if (id) {
                    this.$router.replace({name: 'block-detail', params: {id: id}});
                    this.init(id);
                }

            },

        },
        components: {ScrollTop, RadioButton, SubTitle}
    }
</script>

<style scoped lang="less">
    @import "../../assets/global";

    .block-detail-container {
        padding: 0.08rem 0 0.4rem 0;
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
                    }
                    dd {
                        height: 0.4rem;
                        line-height: 0.4rem;
                        color: @detailLabelColor;
                        font-size: @small;
                        &.parentHash {
                            color: @headerItemHover;
                            cursor: pointer;
                        }
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
                            width: 5%;
                            height: 0.6rem;
                            line-height: 0.6rem;
                            background: @whiteColor;
                            padding: 0 10px;
                            font-size: @middle;
                            font-weight: normal;
                            &:first-child {
                                width: 20%;
                                padding: 0 0 0 0.4rem;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            &:nth-child(2) {
                                width: 8%;
                            }
                            &:nth-child(5) {
                                width: 10%;
                            }
                            &:last-child {
                                width: 22%;
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
                        cursor: pointer;
                        td {
                            width: 5%;
                            height: 0.5rem;
                            line-height: 0.5rem;
                            padding: 0 10px;
                            font-size: @small;
                            cursor: pointer;
                            &:first-child {
                                width: 20%;
                                padding: 0 0 0 0.4rem;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            &:nth-child(2) {
                                width: 8%;
                            }
                            &:nth-child(5) {
                                width: 10%;
                            }
                            &:last-child {
                                width: 22%;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                        }
                    }
                }
            }
        }

        .load-more {
            display: block;
            width: 1rem;
            height: 0.4rem;
            line-height: 0.4rem;
            margin: 0.2rem auto;
            text-align: center;
            background: #7a8bfc;
            color: white;
            font-size: @middle;
            cursor: pointer;

        }
    }
</style>