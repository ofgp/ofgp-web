<template>
    <div class="transaction-container">
        <div class="header clearfix">
            <div class="title"><i class="iconfont icon-title_icon_block"></i>{{$t('transaction-list.transaction-1')}}</div>
            <div class="header-right"><span class="total-count">{{$t('transaction-list.transaction-2')}}：{{count}}</span><span class="search"><i class="iconfont icon-icon_search"></i><input @keyup.enter="init()" v-model="paramData.search" :placeholder='$t("transaction-list.transaction-3")'/></span></div>
        </div>
        <div class="table-list">
            <table>
                <thead>
                <tr>
                    <th>TxHash</th>
                    <th>{{$t('transaction-list.transaction-4')}}</th>
                    <th>{{$t('transaction-list.transaction-5')}}</th>
                    <th>{{$t('transaction-list.transaction-6')}}</th>
                    <th>{{$t('transaction-list.transaction-7')}}</th>
                    <th>{{$t('transaction-list.transaction-8')}}</th>
                    <th>{{$t('transaction-list.transaction-9')}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in tranxList" :key="index" @click="goToDetail(item.dgw_hash)">
                    <td v-tooltip="item.dgw_hash">{{item.dgw_hash}}</td>
                    <td>{{item.block_height}}</td>
                    <td>{{item.time | format}}</td>
                    <td>{{item.from_chain | toUpperCase}}</td>
                    <td>{{item.to_chain | toUpperCase}}</td>
                    <td v-tooltip="item.deal_amount">{{item.deal_amount}}</td>
                    <td v-tooltip="item.deal_fee">{{item.deal_fee}}</td>
                </tr>
                <tr v-if="tranxList.length === 0">
                    <td colspan="7" style="text-align: center">{{$t('transaction-list.transaction-15')}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="page-container clearfix">
            <div class="change-page-size-container">
                {{$t('transaction-list.transaction-10')}}<input class="page-size" type="number" @blur="init()" @keyup.enter="init()" v-model="paramData.page_size"/>{{$t('transaction-list.transaction-14')}}<span class="total-count">{{count}}</span>{{$t('transaction-list.transaction-11')}}
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
    import {TransactionUrl} from "../../config/config";
    import {toUpperCase, unitConversion, transactionUnitConversion} from "../../utils/common";

    export default {
        name: "List",
        data: function () {
            return {
                paramData: {
                    page: 1,
                    page_size: 20,
                    search: this.$route.query.searchText,
                },
                tranxList: [],
                count: 0,
                pageCount: 0,
            }
        },
        mounted() {
            this.init();

        },
        methods: {
            init() {
                this.get(TransactionUrl.list, this.paramData, (res) => {
                    this.tranxList = res.data ? res.data : [];
                    this.tranxList.forEach((item) => {
                        item.deal_amount = transactionUnitConversion(item.amount, item.token_decimals) + toUpperCase(item.token_symbol);
                        item.deal_fee = unitConversion(item.from_fee, item.from_chain) + toUpperCase(item.from_chain) + '+' + unitConversion(item.dgw_fee, item.from_chain) + toUpperCase(item.from_chain) + '+' + unitConversion(item.to_fee, item.to_chain) + toUpperCase(item.to_chain);
                    });
                    this.count = res.count;
                    this.pageCount = Math.ceil(this.count / this.paramData.page_size);
                });
            },
            goToDetail(id) {
                this.$router.push({name: 'transaction-detail', params: {id: id}});
            },
            clickCallback(pageNumber) {
                this.paramData.page = pageNumber;
                this.init();
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/global";

    .transaction-container {
        padding: 0 0 0.4rem 0;
        .header {
            width: 100%;
            height: 0.4rem;
            line-height: 0.4rem;
            padding: 0.3rem 0;
            .title {
                float: left;
                font-size: @big;
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
                    line-height: 0.4rem;
                    background: @whiteColor;
                    input {
                        float: right;
                        width: 2.6rem;
                        height: 0.4rem;
                        border: none;
                        background: transparent;
                        color: @homeListItemColor;
                        font-weight: normal;
                    }
                    i {
                        margin: 0 0 0 0.1rem;
                        color: #697cfe;
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
                            padding: 0 10px;
                            background: @whiteColor;
                            font-size: @middle;
                            font-weight: normal;
                            &:first-child {
                                width: 20%;
                                padding: 0 0 0 0.4rem;
                            }
                            &:nth-child(2) {
                                width: 7%;
                            }
                            &:nth-child(3) {
                                width: 10%;
                            }
                            &:nth-child(6) {
                                width: 10%;
                            }
                            &:last-child {
                                width: 18%;
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
                            width: 5%;
                            height: 0.5rem;
                            line-height: 0.5rem;
                            padding: 0 10px;
                            font-size: @small;
                            font-weight: normal;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            &:first-child {
                                width: 20%;
                                padding: 0 0 0 0.4rem;
                            }
                            &:nth-child(2) {
                                width: 7%;
                            }
                            &:nth-child(3) {
                                width: 10%;
                            }
                            &:nth-child(6) {
                                width: 10%;
                            }
                            &:last-child {
                                width: 18%;
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