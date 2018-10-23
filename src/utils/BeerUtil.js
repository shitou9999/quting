/**
 * Created by PVer on 2018/7/17.
 */
/**
 * 字符串常用工具类
 * Author:LinBilin
 * Date:2017-12-23
 */
(function() {
    var Bee = Bee || {};
    //区域
    Bee.areas = window.BEE_AREAS || {};

    //ObjectUtils命名空间
    Bee.ObjectUtils = {

    };

    //自动生成正则表达式
    Bee.RegexUtils = {
        //生成正整数范围的表达式
        positiveIntegerRange: function(minimum, maximum) {},
        /**
         * 排除某些字符串，即不能包含某些字符串.返回值为RegExp对象
         * @param {Object} conditions:里面有多个属性，如下：
         *
         * @param {String} matcherFlag 匹配标识
         * 0:数字；1：字母；2：小写字母；3:大写字母；4：特殊字符,指英文状态下的标点符号及括号等；5:中文;
         * 6:数字和字母；7：数字和小写字母；8：数字和大写字母；9：数字、字母和特殊字符；10：数字和中文；
         * 11：小写字母和特殊字符；12：大写字母和特殊字符；13：字母和特殊字符；14：小写字母和中文；15：大写字母和中文；
         * 16：字母和中文；17：特殊字符、和中文；18：特殊字符、字母和中文；19：特殊字符、小写字母和中文；20：特殊字符、大写字母和中文；
         * 100：所有字符;
         * @param {Array} targetStrArr 排除的字符串，数组格式
         * @param {String} length 长度，可为空。1,2表示长度1到2之间；10，表示10个以上字符；5表示长度为5
         * @param {Boolean} ignoreCase 是否忽略大小写
         *
         * conditions={matcherFlag:"0",targetStrArr:[],length:"",ignoreCase:true}
         */
        createRegexObjMustExclude: function(input, conditions) {

            //参数
            var matcherFlag = conditions.matcherFlag;
            var targetStrArr = conditions.targetStrArr;
            var length = conditions.length;
            var ignoreCase = conditions.ignoreCase;
            //拼正则
            var size = targetStrArr.length;
            var regex = (size == 0) ? "^" : "^(?!.*(?:{0}))";
            var subPattern = "";
            for(var i = 0; i < size; i++) {
                targetStrArr[i] = Bee.StringUtils.escapeMetacharacterOfStr(targetStrArr[i]);
                subPattern += targetStrArr[i];
                if(i != size - 1) {
                    subPattern += "|";
                }
            }
            regex = Bee.StringUtils.format(regex, [subPattern]);
            switch(matcherFlag) {
                case '0':
                    regex += "\\d";
                    break;
                case '1':
                    regex += "[a-zA-Z]";
                    break;
                case '2':
                    regex += "[a-z]";
                    break;
                case '3':
                    regex += "[A-Z]";
                    break;
                case '4':
                    regex += "[!-/:-@\[-`{-~]";
                    break;
                case '5':
                    regex += "[\u4E00-\u9FA5]";
                    break;
                case '6':
                    regex += "[a-zA-Z0-9]";
                    break;
                case '7':
                    regex += "[a-z0-9]";
                    break;
                case '8':
                    regex += "[A-Z0-9]";
                    break;
                case '9':
                    regex += "[!-~]";
                    break;
                case '10':
                    regex += "[0-9\u4E00-\u9FA5]";
                    break;
                case '11':
                    regex += "[a-z!-/:-@\[-`{-~]";
                    break;
                case '12':
                    regex += "[A-Z!-/:-@\[-`{-~]";
                    break;
                case '13':
                    regex += "[a-zA-Z!-/:-@\[-`{-~]";
                    break;
                case '14':
                    regex += "[a-z\u4E00-\u9FA5]";
                    break;
                case '15':
                    regex += "[A-Z\u4E00-\u9FA5]";
                    break;
                case '16':
                    regex += "[a-zA-Z\u4E00-\u9FA5]";
                    break;
                case '17':
                    regex += "[\u4E00-\u9FA5!-/:-@\[-`{-~]";
                    break;
                case '18':
                    regex += "[\u4E00-\u9FA5!-~]";
                    break;
                case '19':
                    regex += "[a-z\u4E00-\u9FA5!-/:-@\[-`{-~]";
                    break;
                case '20':
                    regex += "[A-Z\u4E00-\u9FA5!-/:-@\[-`{-~]";
                    break;
                case '100':
                    regex += "[\s\S]";
                    break;
                default:
                    alert(matcherFlag + ":This type is not supported!");
            }
            regex += Bee.StringUtils.isNotBlank(length) ? "{" + length + "}" : "+";
            regex += "$";
            var pattern = new RegExp(regex, ignoreCase ? "i" : "");
            return pattern;
        },

        /**
         * 校验时排除某些字符串，即不能包含某些字符串
         * @param {Object} conditions:里面有多个属性，如下：
         *
         * @param {String} matcherFlag 匹配标识
         * 0:数字；1：字母；2：小写字母；3:大写字母；4：特殊字符,指英文状态下的标点符号及括号等；5:中文;
         * 6:数字和字母；7：数字和小写字母；8：数字和大写字母；9：数字、字母和特殊字符；10：数字和中文；
         * 11：小写字母和特殊字符；12：大写字母和特殊字符；13：字母和特殊字符；14：小写字母和中文；15：大写字母和中文；
         * 16：字母和中文；17：特殊字符、和中文；18：特殊字符、字母和中文；19：特殊字符、小写字母和中文；20：特殊字符、大写字母和中文；
         * 100：所有字符;
         * @param {Array} targetStrArr 排除的字符串，数组格式
         * @param {String} length 长度，可为空。1,2表示长度1到2之间；10，表示10个以上字符；5表示长度为5
         * @param {Boolean} ignoreCase 是否忽略大小写
         * conditions={matcherFlag:"0",targetStrArr:[],length:"",ignoreCase:true}
         */
        isPatternMustExclude: function(input, conditions) {
            var pattern = this.createRegexObjMustExclude(input, conditions);
            return pattern.test(input);
        },
        /**
         * 必须同时包含某些字符串,返回值为RegExp对象
         * @param {String} input
         * @param {Object} conditions:里面有多个属性，如下：
         *
         * @param {String} matcherFlag 匹配标识
         * 0:数字；1：字母；2：小写字母；3:大写字母；4：特殊字符,指英文状态下的标点符号及括号等；5:中文;
         * 6:数字和字母；7：数字和小写字母；8：数字和大写字母；9：数字、字母和特殊字符；10：数字和中文；
         * 11：小写字母和特殊字符；12：大写字母和特殊字符；13：字母和特殊字符；14：小写字母和中文；15：大写字母和中文；
         * 16：字母和中文；17：特殊字符、和中文；18：特殊字符、字母和中文；19：特殊字符、小写字母和中文；20：特殊字符、大写字母和中文；
         * 100：所有字符;
         * @param {Array} targetStrArr 排除的字符串，数组格式
         * @param {String} length 长度，可为空。1,2表示长度1到2之间；10，表示10个以上字符；5表示长度为5
         * @param {Boolean} ignoreCase 是否忽略大小写
         * conditions={matcherFlag:"0",targetStrArr:[],length:"",ignoreCase:true}
         *
         */
        createRegexObjMustContain: function() {

            //参数
            var matcherFlag = conditions.matcherFlag;
            var targetStrArr = conditions.targetStrArr;
            var length = conditions.length;
            var ignoreCase = conditions.ignoreCase;
            //创建正则
            var size = targetStrArr.length;
            var regex = "^";
            var subPattern = "";
            for(var i = 0; i < size; i++) {
                targetStrArr[i] = Bee.StringUtils.escapeMetacharacterOfStr(targetStrArr[i]);
                subPattern += "(?=.*" + targetStrArr[i] + ")";
            }
            regex += subPattern;
            switch(matcherFlag) {
                case '0':
                    regex += "\\d";
                    break;
                case '1':
                    regex += "[a-zA-Z]";
                    break;
                case '2':
                    regex += "[a-z]";
                    break;
                case '3':
                    regex += "[A-Z]";
                    break;
                case '4':
                    regex += "[!-/:-@\[-`{-~]";
                    break;
                case '5':
                    regex += "[\u4E00-\u9FA5]";
                    break;
                case '6':
                    regex += "[a-zA-Z0-9]";
                    break;
                case '7':
                    regex += "[a-z0-9]";
                    break;
                case '8':
                    regex += "[A-Z0-9]";
                    break;
                case '9':
                    regex += "[!-~]";
                    break;
                case '10':
                    regex += "[0-9\u4E00-\u9FA5]";
                    break;
                case '11':
                    regex += "[a-z!-/:-@\[-`{-~]";
                    break;
                case '12':
                    regex += "[A-Z!-/:-@\[-`{-~]";
                    break;
                case '13':
                    regex += "[a-zA-Z!-/:-@\[-`{-~]";
                    break;
                case '14':
                    regex += "[a-z\u4E00-\u9FA5]";
                    break;
                case '15':
                    regex += "[A-Z\u4E00-\u9FA5]";
                    break;
                case '16':
                    regex += "[a-zA-Z\u4E00-\u9FA5]";
                    break;
                case '17':
                    regex += "[\u4E00-\u9FA5!-/:-@\[-`{-~]";
                    break;
                case '18':
                    regex += "[\u4E00-\u9FA5!-~]";
                    break;
                case '19':
                    regex += "[a-z\u4E00-\u9FA5!-/:-@\[-`{-~]";
                    break;
                case '20':
                    regex += "[A-Z\u4E00-\u9FA5!-/:-@\[-`{-~]";
                    break;
                case '100':
                    regex += "[\s\S]";
                    break;
                default:
                    alert(matcherFlag + ":This type is not supported!");
            }
            regex += Bee.StringUtils.isNotBlank(length) ? "{" + length + "}" : "+";
            regex += "$";
            var pattern = new RegExp(regex, ignoreCase ? "i" : "");
            return pattern;
        },
        /**
         * 校验必须同时包含某些字符串
         * @param {String} input
         * @param {Object} conditions:里面有多个属性，如下：
         *
         * @param {String} matcherFlag 匹配标识
         * 0:数字；1：字母；2：小写字母；3:大写字母；4：特殊字符,指英文状态下的标点符号及括号等；5:中文;
         * 6:数字和字母；7：数字和小写字母；8：数字和大写字母；9：数字、字母和特殊字符；10：数字和中文；
         * 11：小写字母和特殊字符；12：大写字母和特殊字符；13：字母和特殊字符；14：小写字母和中文；15：大写字母和中文；
         * 16：字母和中文；17：特殊字符、和中文；18：特殊字符、字母和中文；19：特殊字符、小写字母和中文；20：特殊字符、大写字母和中文；
         * 100：所有字符;
         * @param {Array} targetStrArr 排除的字符串，数组格式
         * @param {String} length 长度，可为空。1,2表示长度1到2之间；10，表示10个以上字符；5表示长度为5
         * @param {Boolean} ignoreCase 是否忽略大小写
         * conditions={matcherFlag:"0",targetStrArr:[],length:"",ignoreCase:true}
         *
         */
        isPatternMustContain: function(input, conditions) {
            var pattern = this.createRegexObjMustContain(input, conditions);
            return pattern.test(input);
        }
    };
    Bee.UrlUtils = {
        //url参数转obj
        urlToObj: function(url) {
            var regex = /(\w+)=([^&#]*)/igm;
            var matchStr = null;
            var obj = {};
            while((matchStr = regex.exec(url)) != null) {
                obj[matchStr[1]] = matchStr[2];
            }
            return obj;
        },
        //obj转为url参数
        objToUrl: function(baseUrl, obj) {
            var parameters = "";
            var url = "";
            for(var key in obj) {
                parameters += key + "=" + obj[key] + "&";
            }
            parameters = parameters.replace(/&$/, "");
            if(/\?$/.test(baseUrl)) {
                url = baseUrl + parameters;
            } else {
                url = baseUrl.replace(/\/?$/, '?') + parameters;
            }
            return url;
        },
        //url参数转obj,若一个字段有多个值的话,返回数组
        parseQueryString: function(url) {
            var obj = {};
            if(url) {
                url = url.replace(/#[^#]*$/, "");
                var index = url.indexOf("?");
                if(index != -1) {
                    var queryStr = url.substr(index + 1);
                    var marchResult = null;
                    var regex = /(\w+)(=([^&#]+)?)?/g;
                    while((marchResult = regex.exec(queryStr)) != null) {
                        if(marchResult[1] in obj) {
                            var values = obj[marchResult[1]];
                            if(values instanceof Array) {
                                values.push(marchResult[2] ? (marchResult[3] ? marchResult[3] : "") : null);
                                obj[marchResult[1]] = values;
                            } else {
                                var arr = [];
                                arr.push(values);
                                arr.push(marchResult[2] ? (marchResult[3] ? marchResult[3] : "") : null);
                                obj[marchResult[1]] = arr;
                            }
                        } else {
                            obj[marchResult[1]] = marchResult[2] ? (marchResult[3] ? marchResult[3] : "") : null;
                        }
                    }
                }
            }
            return obj;
        }
    };
    //暴露给window
    window['Bee'] = Bee;
})();
