export function isNumber(val) {
    // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
    if (val === "" || val === null) {
        return false;
    }
    return !isNaN(val);
}

/**
 * 单位转换
 * @param value
 * @param type
 * @returns {string}
 */
export function unitConversion(value, type) {
    if (value || value === 0) {
        if (type.toUpperCase() === 'ETH') {
            return value ? (Number(value) / Math.pow(10, 18)).toFixed(9) : '0.000000000';
        } else {
            return value ? (Number(value) / Math.pow(10, 8)).toFixed(8) : '0.00000000';
        }
    } else {
        return '0.00';
    }
}

/**
 * 交易值单位转换
 * @param value
 * @param decimals
 * @returns {string}
 */
export function transactionUnitConversion(value, decimals) {
    if (value || value === 0) {
        const dec = decimals ? decimals : 8;
        return value ? value / (Math.pow(10, dec)).toFixed(dec) : '0.00000000';
    } else {
        return '0.00000000';
    }
}

/**
 * 转换成大写
 * @param value
 * @returns {any}
 */
export function toUpperCase(value) {
    return value ? value.toUpperCase() : null;
}

/**
 * 给大数加千分位的逗号
 * @param value
 * @returns {*}
 */
export function thousandBitSeparator(value) {
    if (value) {
        return (value + '').replace(/(\d)(?=(\d{3})+$)/g, "$1,");
    } else {
        return 0;
    }
}