/**
 * Created by PVer on 2018/7/17.
 */
import BeeUtil from './BeeUtil';
patterns = {
    PATTERN_ERA: 'G', //Era 标志符 Era strings. For example: "AD" and "BC"
    PATTERN_YEAR: 'y', //年
    PATTERN_MONTH: 'M', //月份
    PATTERN_DAY_OF_MONTH: 'd', //月份的天数
    PATTERN_HOUR_OF_DAY1: 'k', //一天中的小时数（1-24）
    PATTERN_HOUR_OF_DAY0: 'H', //24小时制，一天中的小时数（0-23）
    PATTERN_MINUTE: 'm', //小时中的分钟数
    PATTERN_SECOND: 's', //秒
    PATTERN_MILLISECOND: 'S', //毫秒
    PATTERN_DAY_OF_WEEK: 'E', //一周中对应的星期，如星期一，周一
    PATTERN_DAY_OF_YEAR: 'D', //一年中的第几天
    PATTERN_DAY_OF_WEEK_IN_MONTH: 'F', //一月中的第几个星期(会把这个月总共过的天数除以7,不够准确，推荐用W)
    PATTERN_WEEK_OF_YEAR: 'w', //一年中的第几个星期
    PATTERN_WEEK_OF_MONTH: 'W', //一月中的第几星期(会根据实际情况来算)
    PATTERN_AM_PM: 'a', //上下午标识
    PATTERN_HOUR1: 'h', //12小时制 ，am/pm 中的小时数（1-12）
    PATTERN_HOUR0: 'K', //和h类型
    PATTERN_ZONE_NAME: 'z', //时区名
    PATTERN_ZONE_VALUE: 'Z', //时区值
    PATTERN_WEEK_YEAR: 'Y', //和y类型
    PATTERN_ISO_DAY_OF_WEEK: 'u',
    PATTERN_ISO_ZONE: 'X'
};
week = {
    'ch': {
        "0": "\u65e5",
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
    },
    'en': {
        "0": "Sunday",
        "1": "Monday",
        "2": "Tuesday",
        "3": "Wednesday",
        "4": "Thursday",
        "5": "Friday",
        "6": "Saturday"
    }
};

//获取当前时间
function getCurrentTime() {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    let timeString = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    return timeString;
}
/*
 * 比较时间大小
 * time1>time2 return 1
 * time1<time2 return -1
 * time1==time2 return 0
 */
function compareTime(time1, time2) {
    let d1 = time1;
    let d2 = time2;
    if ((typeof d1) === "string") {
        d1 = new Date(Date.parse(d1.replace(/-/g, "/")));
    }
    if ((typeof d2) === "string") {
        d2 = new Date(Date.parse(d2.replace(/-/g, "/")));
    }
    let t1 = d1.getTime();
    let t2 = d2.getTime();
    if (t1 === t2) {
        return 0;
    } else if (t1 > t2) {
        return 1;
    }
    return -1;
}
//是否闰年
function isLeapYear(year) {
    return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
}
//获取某个月的天数，从0开始
function getDaysOfMonth(year, month) {
    return [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}
function getDaysOfMonth2(year, month) {
    // 将天置为0，会获取其上个月的最后一天
    month = parseInt(month) + 1;
    let date = new Date(year, month, 0);
    return date.getDate();
}
/*距离现在几天的日期：负数表示今天之前的日期，0表示今天，整数表示未来的日期
 * 如-1表示昨天的日期，0表示今天，2表示后天
 */
function fromToday(days) {
    let today = new Date();
    today.setDate(today.getDate() + days);
    let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    return date;
}
/**
 * 日期时间格式化
 * @param {Object} dateTime 需要格式化的日期时间
 * @param {String} pattern  格式化的模式，如yyyy-MM-dd hh(HH):mm:ss.S a k K E D F w W z Z
 */
function formt(dateTime, pattern) {
    let date = new Date(dateTime);
    if (BeeUtil.isBlank(pattern)) {
        return date.toLocaleString();
    }
    return pattern.replace(/([a-z])\1*/ig, function (matchStr, group1) {
        let replacement = "";
        switch (group1) {
            case patterns.PATTERN_ERA: //G
                break;
            case patterns.PATTERN_WEEK_YEAR: //Y
            case patterns.PATTERN_YEAR: //y
                replacement = date.getFullYear();
                break;
            case patterns.PATTERN_MONTH: //M
                let month = date.getMonth() + 1;
                replacement = (month < 10 && matchStr.length >= 2) ? "0" + month : month;
                break;
            case patterns.PATTERN_DAY_OF_MONTH: //d
                let daysD = date.getDate();
                replacement = (daysD < 10 && matchStr.length >= 2) ? "0" + daysD : daysD;
                break;
            case patterns.PATTERN_HOUR_OF_DAY1: //k(1~24)
                let hours24 = date.getHours();
                replacement = hours24;
                break;
            case patterns.PATTERN_HOUR_OF_DAY0: //H(0~23)
                let hours24s = date.getHours();
                replacement = (hours24s < 10 && matchStr.length >= 2) ? "0" + hours24s : hours24s;
                break;
            case patterns.PATTERN_MINUTE: //m
                let minutes = date.getMinutes();
                replacement = (minutes < 10 && matchStr.length >= 2) ? "0" + minutes : minutes;
                break;
            case patterns.PATTERN_SECOND: //s
                let seconds = date.getSeconds();
                replacement = (seconds < 10 && matchStr.length >= 2) ? "0" + seconds : seconds;
                break;
            case patterns.PATTERN_MILLISECOND: //S
                let milliSeconds = date.getMilliseconds();
                replacement = milliSeconds;
                break;
            case patterns.PATTERN_DAY_OF_WEEK: //E
                let day = date.getDay();
                replacement = week['ch'][day];
                break;
            case patterns.PATTERN_DAY_OF_YEAR: //D
                replacement = dayOfTheYear(date);
                break;
            case patterns.PATTERN_DAY_OF_WEEK_IN_MONTH: //F
                let daysF = date.getDate();
                replacement = Math.floor(daysF / 7);
                break;
            case patterns.PATTERN_WEEK_OF_YEAR: //w
                let daysW = dayOfTheYear(date);
                replacement = Math.ceil(daysW / 7);
                break;
            case patterns.PATTERN_WEEK_OF_MONTH: //W
                let days = date.getDate();
                replacement = Math.ceil(days / 7);
                break;
            case patterns.PATTERN_AM_PM: //a
                let hours24A = date.getHours();
                replacement = hours24A < 12 ? "\u4e0a\u5348" : "\u4e0b\u5348";
                break;
            case patterns.PATTERN_HOUR1: //h(1~12)
                let hours12 = date.getHours() % 12 || 12; //0转为12
                replacement = (hours12 < 10 && matchStr.length >= 2) ? "0" + hours12 : hours12;
                break;
            case patterns.PATTERN_HOUR0: //K(0~11)
                let hours12K = date.getHours() % 12;
                replacement = hours12K;
                break;
            case patterns.PATTERN_ZONE_NAME: //z
                replacement = getZoneNameValue(date)['name'];
                break;
            case patterns.PATTERN_ZONE_VALUE: //Z
                replacement = getZoneNameValue(date)['value'];
                break;
            case patterns.PATTERN_ISO_DAY_OF_WEEK: //u
                break;
            case patterns.PATTERN_ISO_ZONE: //X
                break;
            default:
                break;
        }
        return replacement;
    });
}
/**
 * 计算一个日期是当年的第几天
 * @param {Object} date
 */
function dayOfTheYear(date) {
    let obj = new Date(date);
    let year = obj.getFullYear();
    let month = obj.getMonth(); //从0开始
    let days = obj.getDate();
    let daysArr = [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    for (let i = 0; i < month; i++) {
        days += daysArr[i];
    }
    return days;
}
//获得时区名和值
function getZoneNameValue(dateObj) {
    let date = new Date(dateObj);
    date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    let arr = date.toString().match(/([A-Z]+)([-+]\d+:?\d+)/);
    let obj = {
        'name': arr[1],
        'value': arr[2]
    };
    return obj;
}

///////////////////////////////////////////////////////////////////////
// 获取date字符函数
function getDateStr(date) {
    if (!(date instanceof Date)) {
        throw '必须为Date';
    }
    const isoStr = date.toISOString();
    return isoStr.slice(0, 10);
}

// 获取倒计时函数
function getTimespan(ts) {
    const now = new Date();
    const today = new Date(getDateStr(now));
    const tmpDate = new Date(+today + ts);
    return tmpDate.toISOString().slice(11, 19);
}

// 获取多久以前函数
function getBeforeTime(opts = {}) {
    // 如参数为日期
    if (opts instanceof Date) {
        opts = {
            date: opts
        };
    }
    // 配置项
    opts = Object.assign({}, getBeforeTime.defaults, opts);
    const {date, splitReg, units, type, rightNow, ago} = opts;

    // 目标时间
    if (!(date instanceof Date)) {
        throw '必须为Date';
    }

    // 时间间隔
    const timeSpan = Date.now() - date;
    // 时间间隔提取出的年月日等数字信息
    const spanNums = new Date(timeSpan).toISOString().split(splitReg);
    // 时间原点提取提取出的年月日等数字信息
    const originNums = new Date(0).toISOString().split(splitReg);
    // 获取的多少年月日前信息数组
    const rsArray = spanNums.map((item, index) => item -= originNums[index]);

    switch (type) {
        // x年x月x天
        case 1: {
            return units.map((item, index) => rsArray[index] + item).join('') + ago;
        }
        // [年, 月, 日]
        case 2: {
            return rsArray;
        }
        // x年前或者x月
        case 3: {
            let rsStr = rightNow;
            for (let i = 0, len = rsArray.length; i < len; i++) {
                const item = rsArray[i];
                if (item) {
                    rsStr = item + units[i];
                    break;
                }
            }
            return rsStr + ago;
        }
    }
}
getBeforeTime.defaults = {
    splitReg: /[^\d]/,
    // 年月日等单位信息
    units: ['年', '月', '天', '小时', '分', '秒'],
    // 返回数据类型(1: x年x月x天前, 2: [年, 月, 日], 3: x年前或者x月前)
    type: 3,
    // 刚刚信息
    rightNow: '刚刚',
    // 以前信息
    ago: '前'
};


// 日期相关处理对象
export default {
    // 获取date字符函数
    getDateStr,
    // 获取倒计时函数
    getTimespan,
    // 获取多久以前函数
    getBeforeTime,
    formt,
};
