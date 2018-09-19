<template>
    <div class="block-detail-container">
        <sub-title :title='$t("transaction-detail.transaction-detail-1")'></sub-title>
        <div class="box-container">
            <div class="title-box">
                <div class="title"><span class="label">{{$t("transaction-detail.transaction-detail-2")}}</span><span class="content">{{pageData.dgw_hash}}</span></div>
            </div>
            <div class="transaction-pair">
                <div class="title clearfix">
                    <span class="label">{{pageData.from_chain | toUpperCase}} TxHash<span class="mark">{{$t("transaction-detail.transaction-detail-11")}}</span></span>
                    <div class="content-wrap">
                        <span class="content">{{pageData.from_tx_hash}}</span>
                    </div>
                </div>
                <div class="title clearfix">
                    <span class="label">{{pageData.to_chain | toUpperCase}} TxHash<span class="mark">{{$t("transaction-detail.transaction-detail-12")}}</span></span>
                    <div class="content-wrap">
                        <span class="content">{{pageData.to_tx_hash}}</span>
                    </div>
                </div>
            </div>
            <div class="container-body">
                <dl class="clearfix">
                    <dt>{{$t("transaction-detail.transaction-detail-3")}}</dt>
                    <dd><span class="status">{{$t("transaction-detail.transaction-detail-4")}}</span></dd>
                    <dt>{{$t("transaction-detail.transaction-detail-5")}}</dt>
                    <dd>{{pageData.time | format}}</dd>
                    <dt>{{$t("transaction-detail.transaction-detail-7")}}</dt>
                    <dd>{{pageData.amount | transactionUnitConversion(pageData.token_decimals)}} {{pageData.token_symbol}}</dd>
                    <dt class="special">{{$t("transaction-detail.transaction-detail-8")}}</dt>
                    <dd>{{pageData.block_height}}/{{configCount}}</dd>
                </dl>
            </div>
        </div>
        <div class="box-container marginT10">
            <div class="from-to-box">
                <div class="from-to">
                    <div class="from frombg clearfix">
                        <div class="left-b">From</div>
                        <div class="right-b">
                            <ul>
                                <li v-for="(item,index) in fromAddressList" :key="index">{{item}}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="from to clearfix">
                        <div class="left-b">To</div>
                        <div class="right-b">
                            <ul>
                                <li v-for="(item,index) in toAddressList" :key="index">{{item}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-body">
                <dl class="clearfix">
                    <dt>{{pageData.from_chain}}{{$t("transaction-detail.transaction-detail-9")}}</dt>
                    <dd>{{pageData.from_fee | unitConversion(pageData.from_chain)}} {{pageData.from_chain}}</dd>
                    <dt>{{$t("transaction-detail.transaction-detail-10")}}</dt>
                    <dd>{{pageData.dgw_fee | unitConversion(pageData.from_chain)}} {{pageData.from_chain}}</dd>
                    <dt>{{pageData.to_chain}}{{$t("transaction-detail.transaction-detail-9")}}</dt>
                    <dd>{{pageData.to_fee | unitConversion(pageData.to_chain)}} {{pageData.to_chain}}</dd>
                </dl>
            </div>
        </div>
    </div>
</template>

<script>
    import SubTitle from "../../components/SubTitle";
    import {TransactionUrl, BlockUrl} from "../../config/config";
    import {transactionUnitConversion} from "../../utils/common";

    export default {
        name: "Detail",
        data: function () {
            return {
                pageData: {},
                fromAddressList: [],
                toAddressList: [],
                configCount: 0,
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.get(TransactionUrl.detail, {dgw_hash: this.$route.params.id}, (res) => {
                    this.pageData = res;
                    this.pageData.to_chain = res.to_chain.toUpperCase();
                    this.pageData.from_chain = res.from_chain.toUpperCase();
                    this.toAddressList = this.pageData.to_addrs.split(',');
                    this.fromAddressList = this.pageData.from_addrs.split(',');
                    this.getCurrentBlock();
                })
            },
            getCurrentBlock() {
                this.get(BlockUrl.currentblock, null, (res) => {
                    this.configCount = (res.height - this.pageData.block_height) + 1;
                })
            }
        },
        components: {SubTitle}
    }
</script>

<style scoped lang="less">
    @import "../../assets/global";

    .block-detail-container {
        padding: 0.08rem 0 0 0;
        .box-container {
            &.marginT10 {
                margin-top: 0.2rem;
                padding: 0 0 0.2rem 0;
            }
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
                    .content {
                    }
                }
            }
            .transaction-pair {
                padding: 0.15rem 0;
                margin: 0 0.25rem;
                border-bottom: 0.01rem solid @borderColor;
                .title {
                    line-height: 0.3rem;
                    padding: 0 0.15rem;
                    color: @homeListItemColor;
                    font-size: @middle;
                    .mark {
                        padding: 0 0.02rem;
                        margin: 0 0 0 0.1rem;
                        background: #F3F4F7;
                        color: @totalCountBg;
                        font-size: 0.1rem;
                    }
                    .label {
                        float: left;
                        display: inline-block;
                        width: 1.6rem;
                        font-weight: 400;
                    }
                    .content-wrap {
                        float: left;
                        .content {
                            display: block;
                            font-weight: 400;
                        }
                    }
                }
            }
            .container-body {
                padding: 0.1rem 0.4rem;
                dl {
                    font-size: @small;
                    color: @homeListItemColor;
                    dt {
                        float: left;
                        width: 1.1rem;
                        line-height: 0.4rem;
                        color: @topTitleColor;
                        &.special {
                            width: 1.8rem;
                        }
                    }
                    dd {
                        height: 0.4rem;
                        line-height: 0.4rem;
                        font-weight: 400;
                        .status {
                            padding: 0 0.08rem;
                            color: white;
                            background: @totalCountBg;
                        }
                    }
                }
            }
            .from-to-box {
                padding: 0.2rem 0;
                margin: 0 0.25rem;
                border-bottom: 0.01rem solid @borderColor;
                .from-to {
                    .from {
                        &.frombg {
                            position: relative;
                            background: url("../../assets/images/transfer_pic_arrow_tail.png") repeat-y 0.22rem;
                            background-size: 16px 1px;
                            &:before {
                                position: absolute;
                                top: 0.28rem;
                                display: block;
                                content: '';
                                width: 0.6rem;
                                height: 0.1rem;
                                background: @whiteColor;
                            }
                        }
                        &.to {
                            padding: 0.26rem 0 0 0;
                            background: url("../../assets/images/transfer_pic_arrow_top.png") no-repeat 0.22rem top;
                            background-size: 16px 12px;
                            .right-b {
                                float: left;
                                ul {
                                    li {
                                        line-height: 0.24rem;
                                    }
                                }
                            }
                        }
                        .left-b {
                            float: left;
                            display: inline-block;
                            width: 0.6rem;
                            line-height: 0.3rem;
                            margin: 0 0.3rem 0 0;
                            text-align: center;
                            background: @fromToBg;
                            color: #ffffff;
                        }
                        .right-b {
                            float: left;
                            ul {
                                li {
                                    line-height: 0.34rem;
                                    color: @homeListItemColor;
                                    font-weight: 400;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>