<template>
    <div class="home-container">
        <!-- tab -->
        <div class="tab-total">
            <ul class="clearfix">
                <li>
                    <div class="item-wrap clearfix">
                        <div class="icon"><i class="iconfont icon-home_icon_height"></i></div>
                        <div class="item-info">
                            <p class="title">{{$t('home.home-1')}}</p>
                            <p class="content">{{infoData.highest_block}}</p>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-wrap clearfix">
                        <div class="icon"><i class="iconfont icon-home_icon_speed"></i></div>
                        <div class="item-info">
                            <p class="title">{{$t('home.home-2')}}</p>
                            <p class="content">{{infoData.last_block_time}}s</p>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-wrap clearfix">
                        <div class="icon"><i class="iconfont icon-home_icon_point"></i></div>
                        <div class="item-info">
                            <p class="title">{{$t('home.home-3')}}</p>
                            <p class="content">{{infoData.node_num}}</p>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-wrap clearfix">
                        <div class="icon"><i class="iconfont icon-home_icon_transfer1"></i></div>

                        <div class="item-info">
                            <p class="title">{{$t('home.home-4')}}</p>
                            <p class="content">{{infoData.tx_num}}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 折线统计图 -->
        <div class="chart-box">
            <div class="chart-title"><i class="iconfont icon-home_icon_line"></i>{{$t('home.home-5')}}</div>
            <div class="chart" id="myChart"></div>
        </div>
        <!-- 块列表和交易列表 -->
        <div class="list-container clearfix">
            <!-- 块列表  -->
            <div class="block-list-container">
                <div class="block-list-wrap">
                    <div class="header">
                        <span class="title">{{$t('home.home-8')}}</span>
                        <span class="more" @click="goToList('/block/list')">{{$t('home.home-9')}}<i class="iconfont icon-home_icon_more"></i></span>
                    </div>
                    <ul v-if="blockList.length !== 0" class="clearfix">
                        <li class="clearfix" v-for="(item,index) in blockList" :key="index" @click="goToDetail('block-detail',item.height)">
                            <div class="block-count">
                                <p class="block-count-label">Block</p>
                                <p>{{item.height}}</p>
                            </div>
                            <div class="block-info clearfix">
                                <div class="dl-row"><span class="label">{{$t('home.home-10')}}</span><span class="content">{{item.miner}}</span></div>
                                <div class="dl-row"><span class="label">{{$t('home.home-11')}}</span><span class="content">{{item.created_used}}s</span></div>
                                <div class="dl-row"><span class="label">{{$t('home.home-12')}}</span><span class="content">{{item.tx_cnt}}</span></div>
                            </div>
                            <!--<div class="time">{{item.time | format}}s{{$t('home.home-13')}}</div>-->
                            <div class="time">{{item.time | toMinute}}</div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 交易列表 -->
            <div class="transaction-list-container">
                <div class="transaction-list-wrap">
                    <div class="header">
                        <span class="title">{{$t('home.home-14')}}</span>
                        <span class="more" @click="goToList('/transaction/list')">{{$t('home.home-9')}}<i class="iconfont icon-home_icon_more"></i></span>
                    </div>
                    <ul v-if="tranxList.length !== 0">
                        <li v-for="(item,index) in tranxList" :key="index" @click="goToDetail('transaction-detail',item.dgw_hash)">
                            <div class="dl-row clearfix">
                                <div class="left"><span class="label">{{$t('home.home-15')}}</span><span class="content tx-hash" v-tooltip="item.dgw_hash">{{item.dgw_hash}}</span></div>
                                <div class="right"><span class="content">{{item.time | toMinute}}</span></div>
                            </div>
                            <div class="dl-row clearfix">
                                <div class="left"><span class="label">{{$t('home.home-16')}}</span><span class="content special">{{item.from_chain | toUpperCase}}/{{item.to_chain | toUpperCase}}</span></div>
                            </div>
                            <div class="dl-row clearfix">
                                <div class="left"><span class="label">{{$t('home.home-17')}}</span><span class="content" v-tooltip="item.deal_amount">{{item.deal_amount}}</span></div>
                                <div class="right"><span class="label">{{$t('home.home-18')}}</span><span class="content total-fee" v-tooltip="item.deal_fee">{{item.deal_fee}}</span></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MyChart from "../utils/chart";
    import {BlockUrl, HomeUrl, OverviewUrl, TransactionUrl, WSURL} from "../config/config";
    import {toUpperCase, unitConversion, transactionUnitConversion} from "../utils/common";

    export default {
        name: "Home",
        data: function () {
            return {
                infoData: {
                    highest_block: 0,
                    last_block_time: 0,
                    node_num: 0,
                    tx_num: 0
                },
                blockList: [],
                tranxList: [],
            }
        },
        mounted() {
            MyChart.initChart(this, 'myChart');
            this.initOverview();
            this.getLineData();
        },
        methods: {
            goToDetail(name, value) {
                this.$router.push({name: name, params: {id: value}});
            },
            goToList(url) {
                this.$router.push({path: url});
            },
            getLineData() {
                this.get(HomeUrl.getLineUrl, null, (res) => {
                    MyChart.initOption(res);
                }, false)
            },
            initWS() {
                const that = this;
                let webSocket;
                if (!webSocket) {
                    webSocket = new WebSocket('wss://' + WSURL);
                    webSocket.onerror = function () {
                        this.$toast('错误', 'error')
                    };
                    webSocket.onopen = function () {
                        console.log('连接成功')
                    };
                    webSocket.onmessage = function (event) {
                        const result = JSON.parse(event.data);
                        if (result.type === 1) {
                            that.infoData = result
                        } else if (result.type === 2) {
                            if (that.blockList.length === 10) {
                                that.blockList.pop()
                            }
                            that.blockList.unshift(result)
                        } else if (result.type === 3) {
                            if (that.tranxList.length === 10) {
                                that.tranxList.pop()
                            }
                            result.deal_fee = unitConversion(result.from_fee, result.from_chain) + toUpperCase(result.from_chain) + '+' + (result.dgw_fee === 0 ? '' : (unitConversion(result.dgw_fee, result.from_chain) + toUpperCase(result.from_chain) + '+')) + unitConversion(result.to_fee, result.to_chain) + toUpperCase(result.to_chain);
                            result.deal_amount = transactionUnitConversion(result.amount, result.token_decimals) + toUpperCase(result.token_symbol);
                            that.tranxList.unshift(result)
                        }
                    };
                }
            },
            initOverview() {
                this.get(OverviewUrl, null, (res) => {
                    this.infoData = res;
                    this.initBlockList();
                }, false)
            },
            initBlockList() {
                const paramData = {
                    page: 1,
                    page_size: 10,
                    search: '',
                };
                this.get(BlockUrl.list, paramData, (res) => {
                    this.blockList = res.data ? res.data.slice(0, 10) : [];
                    this.initTransactionList();
                }, false)
            },
            initTransactionList() {
                const paramData = {
                    page: 1,
                    page_size: 10,
                    search: '',
                };
                this.get(TransactionUrl.list, paramData, (res) => {
                    this.tranxList = res.data ? res.data.slice(0, 10) : [];
                    this.tranxList.forEach((item) => {
                        item.deal_amount = transactionUnitConversion(item.amount, item.token_decimals) + toUpperCase(item.token_symbol);
                        item.deal_fee = unitConversion(item.from_fee, item.from_chain) + toUpperCase(item.from_chain) + '+' + (item.dgw_fee === 0 ? '' : (unitConversion(item.dgw_fee, item.from_chain) + toUpperCase(item.from_chain) + '+')) + unitConversion(item.to_fee, item.to_chain) + toUpperCase(item.to_chain);
                    });
                    this.initWS();
                }, false)
            }
        },
    }
</script>

<style scoped lang="less">
    @import "../assets/global";

    .home-container {
        padding: 0 0 0.4rem 0;
        .top {
            padding: 0.7rem 0 0 0;
            background: @headerBg;
        }
        .tab-total {
            width: 100%;
            height: 0.6rem;
            padding: 0.25rem 0;
            margin: 0.4rem 0 0 0;
            background: @headerItemHover;
            ul {
                li {
                    float: left;
                    width: 25%;
                    &:last-child {
                        .item-wrap {
                            border-right: none;
                        }
                    }
                    .item-wrap {
                        height: 0.6rem;
                        padding: 0.05rem 0 0 0.4rem;
                        border-right: 0.02rem solid @tabBorderColor;
                        .icon {
                            float: left;
                            width: 0.5rem;
                            height: 0.5rem;
                            line-height: 0.5rem;
                            text-align: center;
                            border-radius: 50%;
                            background: rgba(86, 132, 242, 0.6);
                            i {
                                color: #3765d1;
                                font-size: @biger;
                            }
                        }
                        .item-info {
                            float: left;
                            padding: 0 0 0 0.2rem;
                            .title {
                                font-size: @small;
                                color: #d4e1fe;
                            }
                            .content {
                                font-size: @biger;
                            }
                        }
                    }
                }
            }
        }
        .chart-box {
            position: relative;
            padding: 0.2rem 0.2rem 0 0.2rem;
            margin: 0.2rem 0 0 0;
            background: @whiteColor;
            .chart-title {
                position: absolute;
                top: 0.2rem;
                left: 0.3rem;
                z-index: 1;
                color: #343434;
                font-weight: normal;
                font-size: @big;
                i {
                    margin: 0 0.1rem 0 0;
                    font-size: @biger;
                }
            }
            #myChart {
                height: 4.5rem;
            }
        }
        .list-container {
            margin: 0.2rem 0 0 0;
            .block-list-container {
                float: left;
                width: 50%;
                .block-list-wrap {
                    padding: 0.3rem 0.3rem 0.15rem 0.3rem;
                    margin-right: 0.1rem;
                    background: @whiteColor;
                    .header {
                        height: 0.22rem;
                        line-height: 0.22rem;
                        margin: 0 0 0.15rem 0;
                        .title {
                            color: @homeListItemColor;
                            font-size: @lager;
                            font-weight: normal;
                        }
                        .more {
                            float: right;
                            display: inline-block;
                            height: 0.22rem;
                            line-height: 0.22rem;
                            padding: 0 0.1rem;
                            background: @itemBlockLeftBorderColor;
                            font-size: @small;
                            cursor: pointer;
                            &:hover {
                                background: @itemBlockLeftBorderHoverColor;
                            }
                            i {
                                margin: 0 0 0 0.1rem;
                                font-size: @small;
                            }
                        }
                    }
                    ul {
                        li {
                            position: relative;
                            margin: 0 0 0.1rem 0;
                            background: #F3F5FA;
                            cursor: pointer;
                            &:before {
                                position: absolute;
                                display: block;
                                content: '';
                                width: 0.05rem;
                                height: 100%;
                                background: #7a8cff;
                            }
                            &:hover {
                                background: #E7EAF4;
                                &:before {
                                    background: #7a8bfc;
                                }
                                .block-count {
                                    border-right: 0.02rem solid #C8CBD6;
                                }
                            }
                            .block-count {
                                float: left;
                                width: 1rem;
                                padding: 0.04rem 0 0 0.32rem;
                                margin: 0.24rem 0 0 0;
                                border-right: 0.02rem solid #CFD4E5;
                                color: @homeListItemColor;
                                p {
                                    font-weight: normal;
                                }
                                .block-count-label {
                                    font-size: @small;
                                }
                            }
                            .block-info {
                                float: left;
                                width: 1.8rem;
                                padding: 0.095rem 0 0.095rem 0.36rem;
                                .dl-row {
                                    color: @homeListItemColor;
                                    font-size: 0.14rem;
                                    .label {
                                        float: left;
                                        display: inline-block;
                                        line-height: 0.2rem;
                                        padding-right: 0.24rem;
                                        color: #72798D;
                                    }
                                    .content {
                                        display: inline-block;
                                        width: 1rem;
                                        line-height: 0.2rem;
                                        color: @homeListItemColor;
                                        font-weight: normal;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        white-space: nowrap;
                                    }
                                }
                            }
                            .time {
                                float: right;
                                width: 1.4rem;
                                padding: 0.1rem 0.2rem 0 0;
                                text-align: right;
                                font-size: @small;
                                font-weight: normal;
                                color: @homeListItemColor;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                        }
                    }
                }
            }
            .transaction-list-container {
                float: left;
                width: 50%;
                .transaction-list-wrap {
                    padding: 0.3rem 0.3rem 0.15rem 0.3rem;
                    margin-left: 0.1rem;
                    background: @whiteColor;
                    .header {
                        height: 0.22rem;
                        line-height: 0.22rem;
                        margin: 0 0 0.15rem 0;
                        .title {
                            font-size: @lager;
                            color: @homeListItemColor;
                            font-weight: normal;
                        }
                        .more {
                            float: right;
                            display: inline-block;
                            height: 0.22rem;
                            line-height: 0.22rem;
                            padding: 0 0.1rem;
                            background: @itemTransactionLeftBorderColor;
                            font-size: 0.12rem;
                            cursor: pointer;
                            &:hover {
                                background: @itemTransactionLeftBorderHoverColor;
                            }
                            i {
                                margin: 0 0 0 0.1rem;
                                font-size: @small;
                            }
                        }
                    }
                    ul {
                        li {
                            position: relative;
                            margin: 0 0 0.1rem 0;
                            padding: 0.1rem 0 0 0;
                            background: #F3F5FA;
                            cursor: pointer;
                            &:before {
                                position: absolute;
                                top: 0;
                                display: block;
                                content: '';
                                width: 0.05rem;
                                height: 100%;
                                background: #fc8b5f;
                            }
                            &:hover {
                                background: #E7EAF4;
                                &:before {
                                    background: #fc8b5f;
                                }
                            }
                            .dl-row {
                                padding: 0 0 0 0.25rem;
                                color: #72798D;
                                font-size: 0.14rem;
                                .left {
                                    float: left;
                                    line-height: 0.24rem;
                                    .label {
                                        float: left;
                                        display: inline-block;
                                        line-height: 0.24rem;
                                        padding-right: 0.24rem;
                                    }
                                    .content {
                                        display: inline-block;
                                        line-height: 0.24rem;
                                        padding: 0 0.2rem 0 0;
                                        color: @homeListItemColor;
                                        font-weight: normal;
                                        &.tx-hash {
                                            width: 2rem;
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                            white-space: nowrap;
                                        }

                                        &.special {
                                            line-height: 0.18rem;
                                            padding: 0 0.05rem;
                                            border-radius: 0.01rem;
                                            background: @itemTransactionLeftBorderColor;
                                            font-size: 0.1rem;
                                            color: @whiteColor;

                                        }
                                    }
                                }
                                .right {
                                    float: right;
                                    .label {
                                        float: left;
                                        display: inline-block;
                                        line-height: 0.24rem;
                                        padding-right: 0.24rem;
                                    }
                                    .content {
                                        display: inline-block;
                                        line-height: 0.24rem;
                                        padding: 0 0.2rem 0 0;
                                        color: @homeListItemColor;
                                        font-weight: normal;
                                        &.total-fee {
                                            width: 2rem;
                                            text-align: right;
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
            }
        }

    }
</style>