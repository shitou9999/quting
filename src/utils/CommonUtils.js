import {
    PixelRatio,
    Dimensions,
    Platform,
    AsyncStorage
} from 'react-native';

export class CommonUtils {

    /**
     * 判断对象，数组，字符串是否为空
     * @param str  (null|undefined|''|'   '|[]|{}) 均判断为空，返回true
     * @returns {boolean}
     */
    static isSuperEmpty(str) {
        if (!str) {
            return true;
        } else if (typeof str === 'object' && Object.keys(str).length === 0) {
            return true;
        } else if (str.replace(/(^\s*)|(\s*$)/g, "").length === 0) {
            return true;
        }
        return false;
    }


    /**
     * 检测字符串是否为空
     * @param s
     * @returns {boolean}
     */
    static isEmpty(s) {
        if (typeof(s) === "undefined") return true;
        if (s === null) return true;
        if (s === '') return true;
        return false;
    }

    /**
     * js类型判断
     * @param obj
     * @returns {*}
     * @constructor
     */
    static JsType(obj) {
        let class2type = {};
        // 生成class2type映射
        "Boolean Number String Function Array Date RegExp Object Error".split(" ").map(function(item, index) {
            class2type["[object " + item + "]"] = item.toLowerCase();
        })

        // 一箭双雕 undefined null 值相等 类型不等
        if (obj == null) {
            return obj + "";
        }

        // 优先ES6方法判断数组类型
        if(Array.isArray(obj)){
            return "array"
        }

        return typeof obj === "object" || typeof obj === "function" ?
            class2type[Object.prototype.toString.call(obj)] || "object" :
            typeof obj;
    }

    /**
     * Js 数据容量单位转换(kb,mb,gb,tb)
     * @param bytes
     * @returns {*}
     */
    static bytesToSize(bytes) {
        if (bytes === 0) return '0 B';
        let k = 1000, // or 1024
            sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));

        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
    }


    /**
     * 根据是否是iPhoneX返回不同的样式
     * @param iphoneXStyle
     * @param iosStyle
     * @param androidStyle
     * @returns {*}
     */
    static ifIphoneX(iphoneXStyle, iosStyle = {}, androidStyle) {
        if (gDevice.iphoneX) {
            return iphoneXStyle;
        } else if (gDevice.ios) {
            return iosStyle
        } else {
            if (androidStyle) return androidStyle;
            return iosStyle
        }
    }
    ///////////////////////////////////////////////////////

// static setItem(key: string, value: string, callback?: ?(error: ?Error) => void)
//将key字段的值设置成value，并在完成后调用callback函数。如果有任何错误发生，则会传递一个Error对象作为第一个参数。返回一个Promise对象

//    json转成字符串 let jsonStr = JSON.stringify(person)
    /**
     * 存储->只能存储字符串，需要把对象转换为字符串才行
     * @param key
     * @param value
     * @param successCallback
     * @param errorCallback
     */
    static saveAsyncStorage(key, value, successCallback, errorCallback) {
        AsyncStorage.setItem(key, value, error => {
            if (error) {
                errorCallback(error)
            } else {
                successCallback()
            }
        })
    }

    /**
     * 取值
     * @param key
     * @param successCallback
     * @param errorCallback
     */
    static getAsyncStorage(key, successCallback, errorCallback) {
        AsyncStorage.getItem(key, (error, result) => {
            if (error) {
                errorCallback(error)
            } else {
                successCallback(result)
            }
        })
    }

    /**
     * 删除对应key的
     * @param key
     * @param successCallback
     * @param errorCallback
     */
    static removeAsyncStorage(key, successCallback, errorCallback) {
        AsyncStorage.getItem(key, error => {
            if (error) {
                errorCallback(error)
            } else {
                successCallback()
            }
        })
    }

    // static removeItem(key: string, callback?: ?(error: ?Error) => void)
//删除一个字段。返回一个Promise对象。
//     static clear(callback?: ?(error: ?Error) => void)
//删除全部的AsyncStorage数据，即直接删除该缓存文件


    ///////////////////////////////////////////////////////
// // 将当前时间换成时间格式字符串
// var timestamp3 = 1403058804;
// var newDate = new Date();
// newDate.setTime(timestamp3);
// // Wed Jun 18 2014
// console.log(newDate.toDateString());
// // 2014-06-18T02:33:24.000Z
// console.log(newDate.toISOString());
// // 2014-06-18T02:33:24.000Z
// console.log(newDate.toJSON());
// // 2014年6月18日
// console.log(newDate.toLocaleDateString());
// // 2014年6月18日 上午10:33:24
// console.log(newDate.toLocaleString());
// // 上午10:33:24
// console.log(newDate.toLocaleTimeString());
// // Wed Jun 18 2014 10:33:24 GMT+0800 (中国标准时间)
// console.log(newDate.toString());
// // 10:33:24 GMT+0800 (中国标准时间)
// console.log(newDate.toTimeString());
// // Wed, 18 Jun 2014 02:33:24 GMT
// console.log(newDate.toUTCString());
// // 2014-07-10 10:21:12
// console.log(newDate.format('yyyy-MM-dd h:m:s'))

    //获取时间差 current:1497235409744 当前时间  start:1497235419744 开始时间
// export function getRemainingime(current: Number, start: Number) {
    static getRemainingime(current, start) {
        let time = start - current;
        if (time < 0) {
            return ["0", "0", "0", "0", "0", "0"];
        }
        let year = Math.floor(time / (365 * 30 * 24 * 3600 * 1000));//年

        let month = Math.floor(time / (30 * 24 * 3600 * 1000));//月

        let days = Math.floor(time / (24 * 3600 * 1000));//日
        let temp1 = time % (24 * 3600 * 1000);
        let temp2 = temp1 % (3600 * 1000);
        let minutes = Math.floor(temp2 / (60 * 1000));//分
        let hours = Math.floor(temp1 / (3600 * 1000));//时
        let temp3 = temp2 % (60 * 1000);
        let seconds = Math.round(temp3 / 1000);//秒

        let strs = [year, toNormal(month), toNormal(days), toNormal(hours), toNormal(minutes), toNormal(seconds)];
        return strs;//["0", "0", "2", "7", "33", "30"]0年0月2日 7时33分30秒
    }


    //1497235419
    static getRemainingimeDistance(distance) {
        let time = distance * 1000;
        if (time < 0) {
            return ["0", "0", "0", "0", "0", "0"];
        }

        let year = Math.floor(time / (365 * 30 * 24 * 3600 * 1000));//年

        let month = Math.floor(time / (30 * 24 * 3600 * 1000));//月

        let days = Math.floor(time / (24 * 3600 * 1000));//日
        let temp1 = time % (24 * 3600 * 1000);
        let hours = Math.floor(temp1 / (3600 * 1000));//时
        let temp2 = temp1 % (3600 * 1000);
        let minutes = Math.floor(temp2 / (60 * 1000));//分
        let temp3 = temp2 % (60 * 1000);
        let seconds = Math.round(temp3 / 1000);//秒

        let strs = [year, this.toNormal(month), this.toNormal(days), this.toNormal(hours), this.toNormal(minutes), this.toNormal(seconds)];
        // strs.splice(0, 1, String(Number(strs[0]) - 1970));//年
        // strs.splice(1, 1, String(Number(strs[1]) - 1));
        // strs.splice(2, 1, (Number(strs[2]) - 1) < 10 ? '0' + (Number(strs[2]) - 1) : String(Number(strs[2]) - 1));
        // strs.splice(3, 1, (Number(strs[3]) - 8) < 10 ? '0' + (Number(strs[3]) - 8) : String(Number(strs[3]) - 8));
        // strs.splice(4, 1, Number(strs[4]) < 10 ? '0' + Number(strs[4]) : String(Number(strs[4])));
        // strs.splice(5, 1, Number(strs[5]) < 10 ? '0' + Number(strs[5]) : String(Number(strs[5])));
        return strs;//["0", "0", "2", "7", "33", "30"]0年0月2日 7时33分30秒
    }


    static toNormal(time) {
        return time >= 10 ? time : '0' + time
    }

//转换成日期
// export function toDate(timestamp: Number, format1 = 'yyyy-MM-dd hh:mm:ss') {
    static toDate(timestamp, format1 = 'yyyy-MM-dd hh:mm:ss') {
        try {
            if (timestamp > 10000) {
                let date = new Date();
                date.setTime(timestamp);
                return date.format(format1);//2014-07-10 10:21:12
            } else {
                return '';
            }
        } catch (erro) {
            return '';
        }
        return '';
    }

//转换成时间搓
// export function toTimestamp(date: String) {
    static toTimestamp(date) {
        let timestamp = Date.parse(date);
        return timestamp / 1000;  // 1497233827569/1000
    }

//CST时间=>转换成日期yyyy-MM-dd hh:mm:ss
    static getTaskTime(strDate) {
        if (null == strDate || "" == strDate) {
            return "";
        }
        let dateStr = strDate.trim().split(" ");
        let strGMT = dateStr[0] + " " + dateStr[1] + " " + dateStr[2] + " " + dateStr[5] + " " + dateStr[3] + " GMT+0800";
        let date = new Date(Date.parse(strGMT));
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        let minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        let second = date.getSeconds();
        second = second < 10 ? ('0' + second) : second;

        return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    };

//1497235419
    static getRemainingimeDistance2(distance) {
        let time = distance;
        let days = Math.floor(time / (24 * 3600 * 1000));
        let temp1 = time % (24 * 3600 * 1000);
        let hours = Math.floor(temp1 / (3600 * 1000));
        let temp2 = temp1 % (3600 * 1000);
        let minutes = Math.floor(temp2 / (60 * 1000));
        if (time <= 60 * 1000) {
            minutes = 1;
        }
        let temp3 = temp2 % (60 * 1000);
        let seconds = Math.round(temp3 / 1000);
        return [hours, minutes];//["0", "0", "2", "7", "33", "30"]0年0月2日 7时33分30秒
    }


}
