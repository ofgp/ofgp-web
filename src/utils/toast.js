import Toast from '../components/Toast'

const myToast = {};
myToast.installed = false;
// 插件必须要有一个install方法
myToast.install = function (Vue, options = {}) {

    if (myToast.installed) return;
    let opt = {
        // 默认显示提示类型
        defaultType: "info",
        // 默认持续时间
        duration: "3000"
    };

    for (let i in options) {
        opt[i] = options[i];
    }

    const ToastController = Vue.extend(Toast);

    Vue.prototype.$toast = (toast, type) => {
        const dom = document.getElementsByClassName('toast-container');
        if (dom.length) {
            document.body.removeChild(dom[0]);
        }
        const instance = new ToastController().$mount(document.createElement('div'));

        instance.type = type ? type : opt.defaultType;

        instance.messages = toast ? toast : '提示';

        document.body.appendChild(instance.$el);

        myToast.installed = true;

        setTimeout(function () {
            instance.close()
        }, opt.duration);
        return instance
    };
};

// 最后将以上内容导出，即可在其他地方进行使用
export default myToast