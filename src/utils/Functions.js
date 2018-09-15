/**
 * Created by PVer on 2018/9/15.
 */
// 时间切割函数

// 这个东东我的小伙伴也写出来了.我的是在它的解答方式上加以注释和对参数的判断做了考虑
// 他的解法方案在他的 github 上 https://github.com/lyh2668/blog/issues/1 , by lyh2668
// 方便一些小伙伴的理解,以下代码包含ES6的姿势(参数默认值,剪头函数)

let inputDateRange = (date, step = 30, separator = '-') => {
    let startTime, endTime; // 开始时间和结束时间

    if (Object.prototype.toString.call(date) === '[object String]') {
        date = date.trim(); // 去除两边的空格
        var tempDate = '';
        if (separator) {
            tempDate = date.split(separator);
        } else {
            if (date.indexOf('-') !== -1) {
                tempDate = date.split('-');
            } else if (date.indexOf('~')) {
                tempDate = date.split('~');
            } else {
                console.log('您传入的也许不是一个时间段!!!');
            }
        }
        startTime = time2min(tempDate[0]); // 传入的开始时间
        endTime = time2min(tempDate[1]); //传入的结束时间
    } else if (Object.prototype.toString.call(date) === '[object Array]') {
        if (date.length === 2) {
            startTime = time2min(date[0]); // 传入的开始时间
            endTime = time2min(date[1]); //传入的结束时间
        }
    } else {
        console.log('您传入的也许不是一个时间段!!!');
    }

    // 传入的 step 是否为数字,否则截图数字部分转化
    // 为什么和 NaN 比较(自身不等性),若是传入的连正则都没法识别,那只能给默认值了
    Object.prototype.toString.call(step) === '[object Number]'
        ? (step = parseInt(step, 10))
        : parseInt(step.replace(/[W\s\b]/g, ''), 10) === NaN
        ? (step = parseInt(step.replace(/[W\s\b]/g, ''), 10))
        : (step = 30);

    // 若是开始时间大于结束时间则结束时间往后追加一天
    startTime > endTime ? (endTime += 24 * 60) : '';

    let transformDate = []; // 储存转换后的数组,时间分段

    // 开始遍历判断,用 while
    while (startTime < endTime) {
        // 如果开始时间+步长大于结束时间,则这个分段结束,否则结束时间是步长递增
        let right = startTime + step > endTime ? endTime : startTime + step;
        transformDate.push(`${min2time(startTime)}-${min2time(right)}`);
        startTime += step; // 步长递增
    }
    return transformDate;
};

// 时间转化为分钟
let time2min = time => {
    // 获取切割的
    time.indexOf(':') ? (time = time.trim().split(':')) : '';
    return time[0] * 60 + parseInt(time[1]); // 返回转化的分钟
};

// 分钟转会字符串时间
let min2time = minutes => {
    let hour = parseInt(minutes / 60); // 返回多少小时
    let minute = minutes - hour * 60; // 扣除小时后剩余的分钟数

    hour >= 24 ? (hour = hour - 24) : ''; // 若是大于等于24小时需要扣除一天得到所剩下的小时
    minute < 10 ? (minute = '0' + minute) : ''; // 小于10的都要补零
    hour < 10 ? (hour = '0' + hour) : ''; // 小于10的都要补零
    return `${hour}:${minute}`;
};


// // test ,支持字符串传入时间段
// inputDateRange('3:00-5:00','20d'); // ["03:00-03:20", "03:20-03:40", "03:40-04:00", "04:00-04:20", "04:20-04:40", "04:40-05:00"]

// // 亦或者数组传入
// inputDateRange(['3:00','5:00'],'45df.3d'); // ["03:00-03:45", "03:45-04:30", "04:30-05:00"]

// // step 支持数字亦或者带特殊字符的数字
// inputDateRange(['6:00','8:00'],'55df.3d'); // ["06:00-06:55", "06:55-07:50", "07:50-08:00"]

// inputDateRange('3:00-5:00',60); // ["03:00-04:00", "04:00-05:00"]

// *********************************************************************
export function getUUID() {
    return 'xxxxxxxx-xxxx-gxxx-hxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
    })
}

export function cleanArray(actual) {
    const newArray = []
    for (let i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i])
        }
    }
    return newArray
}

export function param(json) {
    if (!json) return ''
    return cleanArray(Object.keys(json).map(key => {
        if (json[key] === undefined) return ''
        return encodeURIComponent(key) + '=' +
            encodeURIComponent(json[key])
    })).join('&')
}

export function param2Obj(url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

export function html2Text(val) {
    const div = document.createElement('div')
    div.innerHTML = val
    return div.textContent || div.innerText
}

export function objectMerge(target, source) {
    /* Merges two  objects,
     giving the last one precedence */

    if (typeof target !== 'object') {
        target = {}
    }
    if (Array.isArray(source)) {
        return source.slice()
    }
    Object.keys(source).forEach((property) => {
        const sourceProperty = source[property]
        if (typeof sourceProperty === 'object') {
            target[property] = objectMerge(target[property], sourceProperty)
        } else {
            target[property] = sourceProperty
        }
    })
    return target
}

export function scrollTo(element, to, duration) {
    if (duration <= 0) return
    const difference = to - element.scrollTop
    const perTick = difference / duration * 10
    setTimeout(() => {
        console.log(new Date())
        element.scrollTop = element.scrollTop + perTick
        if (element.scrollTop === to) return
        scrollTo(element, to, duration - 10)
    }, 10)
}

export function toggleClass(element, className) {
    if (!element || !className) {
        return
    }
    let classString = element.className
    const nameIndex = classString.indexOf(className)
    if (nameIndex === -1) {
        classString += '' + className
    } else {
        classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
    }
    element.className = classString
}

/**
 * 获取时间
 * @param {string} type [start]
 */
export function getTime(type) {
    if (type === 'start') {
        return new Date().getTime() - 3600 * 1000 * 24 * 90
    } else {
        return new Date(new Date().toDateString())
    }
}

/**
 * 格式化时间
 * @param {long} time 时间戳
 * @param {string} cFormat 格式
 */
export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}

export function formatTime(time, option) {
    time = +time * 1000
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) { // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
    }
}

export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result

    const later = function() {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp

        // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args)
                if (!timeout) context = args = null
            }
        }
    }

    return function(...args) {
        context = this
        timestamp = +new Date()
        const callNow = immediate && !timeout
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait)
        if (callNow) {
            result = func.apply(context, args)
            context = args = null
        }

        return result
    }
}

export function deepClone(source) {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'shallowClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach((keys) => {
        if (source[keys] && typeof source[keys] === 'object') {
            targetObj[keys] = source[keys].constructor === Array ? [] : {}
            targetObj[keys] = deepClone(source[keys])
        } else {
            targetObj[keys] = source[keys]
        }
    })
    return targetObj
}

// *********************************************************************
const SPACE_BETWEEN_DATE_AND_TIME = ' ';

function checkArgs(date) {
    if (date instanceof Date === false) {
        throw new Error('参数错误');
    }
}
function addZero(number) {
    return (number > 9 ? "" : "0") + number;
}
// 1. 年、月、日
export const getDate = function (date, seprator) {
    checkArgs(date);
    let _year = date.getFullYear();
    let _month = addZero(date.getMonth() + 1);
    let _day = addZero(date.getDate());
    if (!seprator && seprator !== '') {
        return _year + '年' + _month  +  '月' +_day + '日';
    }
    return _year + seprator + _month  +  seprator + _day;
}
//2. 年月日 时间(精确到S)
export const getTime = function (date, dateSeprator, timeSeprator) {
    return getDate(date, dateSeprator) + SPACE_BETWEEN_DATE_AND_TIME + getOnlyTime(date, timeSeprator);
}
//3 时间(精确到S)
export const getOnlyTime = function (date, seprator) {
    checkArgs(date);
    let _hours = addZero(date.getHours());
    let _minutes = addZero(date.getMinutes());
    let _seconds = addZero(date.getSeconds());
    if (!seprator) {
        return _hours + '时' + _minutes +  '分' + _seconds + '秒';
    }
    return _hours + seprator + _minutes +  seprator + _seconds;
}
