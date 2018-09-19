import axios from 'axios';
import Qs from 'qs'
import CryptoJS from "./aes.js";
import stores from '../store/store';
import * as Types from '../store/mutation-types';
import {EDUUID, KEY} from "../constant/constant";
import {URL} from "../config/config";

const iv = CryptoJS.enc.Utf8.parse('rst@123456--java');

axios.defaults.baseURL = URL;
// axios.defaults.baseURL = "";
axios.defaults.withCredentials = true;

// 拦截
axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

const ajax = {};
ajax.install = (Vue) => {

//AES解密
    Vue.prototype.getDAesString = (encrypted) => {
        let key = CryptoJS.enc.Utf8.parse(sessionStorage.getItem(KEY));
        let decrypt = CryptoJS.AES.decrypt(encrypted, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    };

    //数据解密后改为JSON格式
    Vue.prototype.getStringJson = (resultstr, flag) => {
        //将escape加密后的信息
        resultstr = escape(resultstr);
        //替换特殊符号并unescape解密
        resultstr = unescape(resultstr.replace(new RegExp("%0A", "gm"), ""));
        //数据解密后改为JSON格式
        return JSON.parse(Vue.prototype.getDAesString(resultstr, flag));
    };

    //AES加密
    Vue.prototype.getAesString = (data) => {
        let key = CryptoJS.enc.Utf8.parse(sessionStorage.getItem(KEY));
        return CryptoJS.AES.encrypt(data, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    };

    /**
     * 获取key
     */
    Vue.prototype.getKey = (fun) => {
        axios.post("/mobile/account/getKey", {}).then((res) => {
            console.log(res);
            if (res) {
                let result = res.data;
                switch (result.code) {
                    case 1:
                        if (res.headers.ED_UUID) {
                            sessionStorage.setItem(EDUUID, res.headers.ED_UUID); //每个POST接口必带
                        } else if (res.headers.ed_uuid) {
                            sessionStorage.setItem(EDUUID, res.headers.ed_uuid); //每个POST接口必带
                        }
                        if (typeof res.data === 'string') {
                            res.data = JSON.parse(res.data);
                        }
                        sessionStorage.setItem(KEY, res.data.data); //每个需要加密的接口参数数据必用
                        break;
                }
                if (fun) {
                    fun()
                }
            }
        }).catch((error) => {
            console.error(error);
        });
    };

    /**
     * get 请求
     */
    Vue.prototype.get = (url, param, fun, isLoading) => {
        if (!isLoading && isLoading !== false) {
            stores.dispatch(Types.SHOWLOADING); // 默认显示loading
        }
        const paramStr = param ? '?' + Qs.stringify(param) : '';
        axios.get(url + paramStr).then((res) => {
            stores.dispatch(Types.HIDELOADING); // 隐藏loading
            const result = res.data;
            if (result.code === 0) {
                if (fun) {
                    fun(result.data)
                }
            } else {
                Vue.prototype.$toast(result.msg,'error')
            }
        }).catch((error) => {
            stores.dispatch(Types.HIDELOADING); // 隐藏loading
            Vue.prototype.$toast('服务器错误','error');
            console.error(error)
        });
    };
    /**
     *  post请求
     */
    Vue.prototype.post = (url, isEncrypt, params, isLoading, fun, isBody) => {
        if (isLoading) {
            stores.dispatch(Types.SHOWLOADING); // 显示loading
        }
        params = JSON.stringify(params);
        //aes加密数据并传给后台
        params = isEncrypt ? Vue.prototype.getAesString(params, true).toString() : params;
        axios.post(url, params, {
            headers: {
                "ED_UUID": sessionStorage.getItem(EDUUID),
                'Content-Type': isBody ? 'application/x-www-form-urlencoded' : 'application/json',
            },
        }).then((res) => {
            stores.dispatch(Types.HIDELOADING); // 隐藏loading
            if (res) {
                let result = res.data;
                let resultObj = result;
                if (result['sData']) {
                    resultObj = Vue.prototype.getStringJson(result.sData.toString(), true);
                }
                console.log(resultObj);
                switch (resultObj.code) {
                    case 1:
                        if (fun) {
                            fun(resultObj.data)
                        }
                        break;
                    case -10076:

                        break;
                    default:

                        break;
                }
            }
        }).catch((error) => {
            stores.dispatch(Types.HIDELOADING); // 隐藏loading
            Vue.prototype.$toast('服务器错误','error');
            console.error(error)
        });
    };
};
export default ajax;
