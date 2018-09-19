export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

/**
 * 时间搓转时分秒
 * @param value
 * @returns {string}
 */
export function formatDuring(value) {
    const mss = new Date().getTime() - (value * 1000);
    // noinspection JSCheckFunctionSignatures
    const days = parseInt(mss / (1000 * 60 * 60 * 24));
    // noinspection JSCheckFunctionSignatures
    const hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    // noinspection JSCheckFunctionSignatures
    const minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    // noinspection JSCheckFunctionSignatures
    const seconds = parseInt((mss % (1000 * 60)) / 1000);
    if (minutes === 0 && hours === 0 && days === 0) {
        return seconds + '秒前'
    } else if (hours === 0 && days === 0) {
        return minutes + "分" + seconds + '秒前';
    } else if (days === 0) {
        return hours + "小时" + minutes + "分" + seconds + '秒前';
    } else {
        const temp = new Date(value * 1000);
        return temp.toLocaleDateString() + " " + temp.toLocaleTimeString('chinese', {hour12: false});
    }
}