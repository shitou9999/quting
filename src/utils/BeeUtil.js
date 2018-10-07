/**
 * Created by cyh on 2018/7/17.
 */
//空字符串
function isEmpty(input) {
    return input == null || input == '';
}

//不是空字符串
function isNotEmpty(input) {
    return !this.isEmpty(input);
}

//空字符串，可为空格
function isBlank(input) {
    return input == null || /^\s*$/.test(input);
}

// 不是空字符串,空格也算空字符串
function isNotBlank(input) {
    return !this.isBlank(input);
}

// 不是空字符串,空格也算空字符串
function trim(input) {
    return input.replace(/^\s+|\s+$/, '');
}

//若为null则转为''
function trimToEmpty(input) {
    return input == null ? "" : this.trim(input);
}

//以某个字符串开头
function startsWith(input, prefix) {
    return input.indexOf(prefix) === 0;
}

// 以某个字符串开头
function endsWith(input, suffix) {
    let regex = new RegExp(this.escapeMetacharacterOfStr(suffix) + "$");
    return regex.test(input);
}

//以某个字符串开头
function contains(input, searchSeq) {
    return input.indexOf(searchSeq) >= 0;
}

//判断字符串是否相等
function equals(input1, input2) {
    return input1 == input2;
}

//判断字符串是否相等，不区分大小写
function equalsIgnoreCase(input1, input2) {
    return input1.toLocaleLowerCase() == input2.toLocaleLowerCase();
}

// 是否包含空白字符
function containsWhitespace(input) {
    return this.contains(input, ' ');
}

//生成指定个数的字符
function repeat(ch, repeatTimes) {
    let result = "";
    for (let i = 0; i < repeatTimes; i++) {
        result += ch;
    }
    return result;
}

//删除空白字符
function deleteWhitespace(input) {
    return input.replace(/\s+/g, '');
}

//右侧补全
function rightPad(input, size, padStr) {
    return input + this.repeat(padStr, size);
}

//左侧补全
function leftPad(input, size, padStr) {
    return this.repeat(padStr, size) + input;
}

//首小写字母转大写
function capitalize(input) {
    let strLen = 0;
    if (input == null || (strLen = input.length) == 0) {
        return input;
    }
    return input.replace(/^[a-z]/, function (matchStr) {
        return matchStr.toLocaleUpperCase();
    });
}

//首大写字母转小写
function uncapitalize(input) {
    let strLen = 0;
    if (input == null || (strLen = input.length) == 0) {
        return input;
    }
    return input.replace(/^[A-Z]/, function (matchStr) {
        return matchStr.toLocaleLowerCase();
    });
}

//大写转小写，小写转大写
function swapCase(input) {
    return input.replace(/[a-z]/ig, function (matchStr) {
        if (matchStr >= 'A' && matchStr <= 'Z') {
            return matchStr.toLocaleLowerCase();
        } else if (matchStr >= 'a' && matchStr <= 'z') {
            return matchStr.toLocaleUpperCase();
        }
    });
}

//统计含有的子字符串的个数
function countMatches(input, sub) {
    if (this.isEmpty(input) || this.isEmpty(sub)) {
        return 0;
    }
    let count = 0;
    let index = 0;
    while ((index = input.indexOf(sub, index)) != -1) {
        index += sub.length;
        count++;
    }
    return count;
}

//只包含字母
function isAlpha(input) {
    return /^[a-z]+$/i.test(input);
}

//只包含字母、空格
function isAlphaSpace(input) {
    return /^[a-z\s]*$/i.test(input);
}

//只包含字母、数字
function isAlphanumeric(input) {
    return /^[a-z0-9]+$/i.test(input);
}

//只包含字母、数字和空格
function isAlphanumericSpace(input) {
    return /^[a-z0-9\s]*$/i.test(input);
}

//数字
function isNumeric(input) {
    return /^(?:[1-9]\d*|0)(?:\.\d+)?$/.test(input);
}

//小数
function isDecimal(input) {
    return /^[-+]?(?:0|[1-9]\d*)\.\d+$/.test(input);
}

//负小数
function isNegativeDecimal(input) {
    return /^\-(?:0|[1-9]\d*)\.\d+$/.test(input);
}

//正小数
function isPositiveDecimal(input) {
    return /^\+?(?:0|[1-9]\d*)\.\d+$/.test(input);
}

//整数
function isInteger(input) {
    return /^[-+]?(?:0|[1-9]\d*)$/.test(input);
}

//正整数
function isPositiveInteger(input) {
    return /^\+?(?:0|[1-9]\d*)$/.test(input);
}

//负整数
function isNegativeInteger(input) {
    return /^\-(?:0|[1-9]\d*)$/.test(input);
}

//只包含数字和空格
function isNumericSpace(input) {
    return /^[\d\s]*$/.test(input);
}

//*是否为空白字符
function isWhitespace(input) {
    return /^\s*$/.test(input);
}

//是否全为小写字母
function isAllLowerCase(input) {
    return /^[a-z]+$/.test(input);
}

//是否全为大写字母
function isAllUpperCase(input) {
    return /^[A-Z]+$/.test(input);
}

//字符串为空时，默认值
function defaultString(input, defaultStr) {
    return input == null ? defaultStr : input;
}

//字符串为空时，默认值
function defaultIfBlank(input, defaultStr) {
    return this.isBlank(input) ? defaultStr : input;
}

//字符串为空时，默认值
function defaultIfEmpty(input, defaultStr) {
    return this.isEmpty(input) ? defaultStr : input;
}

//字符串反转
function reverse(input) {
    if (this.isBlank(input)) {
        input;
    }
    return input.split("").reverse().join("");
}

//删掉特殊字符(英文状态下)
function removeSpecialCharacter(input) {
    return input.replace(/[!-/:-@\[-`{-~]/g, "");
}

//只包含特殊字符、数字和字母（不包括空格，若想包括空格，改为[ -~]）
function isSpecialCharacterAlphanumeric(input) {
    return /^[!-~]+$/.test(input);
}

/**
 * @param {String} message
 * @param {Array} arr
 * 消息格式化
 */
function format(message, arr) {
    return message.replace(/{(\d+)}/g, function (matchStr, group1) {
        return arr[group1];
    });
}

/**
 * 把连续出现多次的字母字符串进行压缩。如输入:aaabbbbcccccd  输出:3a4b5cd
 * @param {String} input
 * @param {Boolean} ignoreCase : true or false
 */
function compressRepeatedStr(input, ignoreCase) {
    let pattern = new RegExp("([a-z])\\1+", ignoreCase ? "ig" : "g");
    let result = input.replace(pattern, function (matchStr, group1) {
        return matchStr.length + group1;
    });
    return result
}

//中文校验
function isChinese(input) {
    return /^[\u4E00-\u9FA5]+$/.test(input);
}

//去掉中文字符
function removeChinese(input) {
    return input.replace(/[\u4E00-\u9FA5]+/gm, "");
}

//转义元字符
function escapeMetacharacter(input) {
    let metacharacter = "^$()*+.[]|\\-?{}";
    if (metacharacter.indexOf(input) >= 0) {
        input = "\\" + input;
    }
    return input;
}

//转义字符串中的元字符
function escapeMetacharacterOfStr(input) {
    return input.replace(/[-$^()*+.\[\]|\\?{}]/gm, "\\$&");
}

//中文转为unicode编码
function chineseToUnicode(input) {
    return input.replace(/[\u4E00-\u9FA5]/g, function (matchStr) {
        return "\\u" + matchStr.charCodeAt(0).toString(16);
    });
}

/**
 * 判断字符串是否是嵌套结构
 * 自定义嵌套符号rule={'(':')','[':']','{':'}','<':'>'};
 * @param {Object} rule
 * @param {String} str
 */
function isNest(rule, str) {
    if (!(rule && str)) {
        return false;
    }
    let keys = [];
    let values = [];
    for (let key in rule) {
        if (rule.hasOwnProperty(key)) {
            keys.push(key);
            values.push(rule[key]);
        }
    }
    let chs = str.split("");
    let len = chs.length;
    let stack = [];
    for (let i = 0; i < len; i++) {
        if (Bee.ArrayUtils.inArray(keys, chs[i])) {
            stack.push(rule[chs[i]]);
        } else {
            if (chs[i] === stack[stack.length - 1]) {
                stack.pop();
            } else if (Bee.ArrayUtils.inArray(values, chs[i])) {
                return false;
            }
        }
    }
    return stack.length === 0;
}

/**
 * 显示小数点，当value为null或undefined时显示defaultValue
 * fixedNumber 默认为2
 * defaultValue 默认为‘0.00’
 */
function toFixed(value, fixedNumber = 2, defaultValue = '0.00') {
    if (value == undefined || value == null) {
        return defaultValue;
    } else {
        if (typeof value === 'number' && !isNaN(value)) {
            return value.toFixed(fixedNumber);
        } else {
            return value;
        }
    }
}

/**
 * 对象的值转换为数字
 * 获取性别,,js,true1,false0
 * @param sex
 * @returns {string}
 */
function getGender(sex) {
    if (Number(sex) === 0) {
        return '女'
    } else if (Number(sex) === 1) {
        return '男'
    }
    return '男';
}


export default {
    isEmpty,
    isNotEmpty,
    equals,
    isBlank,
    getGender,
}
