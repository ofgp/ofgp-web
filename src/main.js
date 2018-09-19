import Vue from 'vue';
import App from './App.vue';
import VueI18n from 'vue-i18n';
import router from './router';
import store from './store/store';
import ajax from './utils/ajax';
import echarts from 'echarts';
import VTooltip from 'v-tooltip';
import MyToast from './utils/toast';
import './assets/reset.css';
import './assets/iconfont/iconfont.css';
import Paginate from 'vuejs-paginate'
import {formatDate, formatDuring} from "./utils/date";
import {unitConversion, toUpperCase, thousandBitSeparator, transactionUnitConversion} from "./utils/common";
import {DATEFORMAT} from "./constant/constant";

Vue.component('paginate', Paginate);

Vue.prototype.$echarts = echarts;

Vue.use(VueI18n);
Vue.use(VTooltip);
Vue.use(MyToast);
Vue.config.productionTip = false;
const i18n = new VueI18n({
    locale: 'zh-CN',    // 语言标识
    //this.$i18n.locale // 通过切换locale的值来实现语言切换
    messages: {
        'zh-CN': require('./assets/i18n/zh-CN'),   // 中文语言包
        'en': require('./assets/i18n/en')    // 英文语言包
    }
});
Vue.use(ajax);
Vue.filter('format', function (value) {
    return value ? formatDate(new Date(value * 1000), DATEFORMAT) : '1970/01/01 00:00';
});
Vue.filter('toUpperCase', function (value) {
    return toUpperCase(value);
});
Vue.filter('toMinute', function (value) {
    return formatDuring(value);
});
Vue.filter('unitConversion', function (value, type) {
    return unitConversion(value, type)
});
Vue.filter('transactionUnitConversion', function (value, decimals) {
    return transactionUnitConversion(value, decimals)
});
Vue.filter('thousandBitSeparator', function (value) {
    return thousandBitSeparator(value);
});
new Vue({
    router,
    i18n,
    store,
    render: h => h(App)
}).$mount('#app');
