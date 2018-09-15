/**
 * Created by PVer on 2018/9/15.
 */

//排序
const sort = function (array, roleFun) {
    return array.sort(roleFun);
}


//校验是否提供排序函数
const hasSortFun = function (roleFun) {
    if (undefined === roleFun) {
        return false;
    }
    return true;
}

//检验参数是否合法
const checkArgs = function (array) {
    if (array.length == 0 || array instanceof Array === false) {
        return false;
    }
    return true;
}

/**
 * @description 升序排序
 * @param array 被排序的数组
 * @param roleFun 排序函数 见：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 * @returns {*}
 */
export const sortByAsc = function (array, roleFun) {
    if (!checkArgs(array)) {
        return array;
    }
    let _roleFun = roleFun;
    if (!hasSortFun(roleFun)) {
        _roleFun = function (pre, next) {
            return pre - next;
        }
    }
    return sort(array, _roleFun);
}

/**
 *
 * @description 降序排序
 * @param array 被排序的数组
 * @param roleFun 排序函数 见：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 * @returns {*}
 */
export const sortByDesc = function (array, roleFun) {
    if (!checkArgs(array)) {
        return array;
    };
    let _roleFun = roleFun;
    if (!hasSortFun(roleFun)) {
        _roleFun = function (pre, next) {
            return next - pre;
        }
    }
    return sort(array, _roleFun);
}

/**
 *
 * @description 获取最大值
 * @param array 被排序的数组
 * @param roleFun 排序函数 见：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 * @returns {*}
 */
export const getMax = function (array, roleFun) {
    if (!checkArgs(array)) {
        return undefined;
    }
    if (!hasSortFun(roleFun)) {
        let _max = array[0];
        for (let i = 1; i < array.length; i++) {
            _max = array[i] > _max ? array[i] : _max;
        }
        return _max;
    }
    if (typeof roleFun !== 'function') {
        throw new Error("参数错误");
    }
    return roleFun(array);
}

/**
 *
 * @description 获取最小值
 * @param array 被排序的数组
 * @param roleFun 排序函数 见：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 * @returns {*}
 */
export const getMin = function (array, roleFun) {
    if (!checkArgs(array)) {
        return undefined;
    }
    if (!hasSortFun(roleFun)) {
        let _min = array[0];
        for (let i = 1; i < array.length; i++) {
            _min = array[i] < _min ? array[i] : _min;
        }
        return _min;
    }
    if (typeof roleFun !== 'function') {
        throw new Error("参数错误");
    }
    return roleFun(array);
}
