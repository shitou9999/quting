/**
 * Created by PVer on 2018/7/21.
 */
//简单四则运算

//运算符优先级
operatorPrecedence = {
    '+': 0,
    '-': 0,
    '*': 1,
    '×': 1,
    '÷': 1,
    '\/': 1
};

//运算符
operator = {
    '+': '+',
    '-': '-',
    '*': '*',
    '×': '*',
    '÷': '/',
    '\/': '/'
};

//加法
export const add = function (operandLeft, operandRight) {
    let operand1 = operandLeft.toString();
    let operand2 = operandRight.toString();
    let decimalPlace1 = operand1.indexOf('.') >= 0 ? operand1.split('.')[1].length : 0;
    let decimalPlace2 = operand2.indexOf('.') >= 0 ? operand2.split('.')[1].length : 0;
    let multiple = Math.pow(10, Math.max(decimalPlace1, decimalPlace2));
    return (operandLeft * multiple + operandRight * multiple) / multiple;
}

//减法
export const subtract = function
    (operandLeft, operandRight) {
    let operand1 = operandLeft.toString();
    let operand2 = operandRight.toString();
    let decimalPlace1 = operand1.indexOf('.') >= 0 ? operand1.split('.')[1].length : 0;
    let decimalPlace2 = operand2.indexOf('.') >= 0 ? operand2.split('.')[1].length : 0;
    let multiple = Math.pow(10, Math.max(decimalPlace1, decimalPlace2));
    //toFixed避免多出来小数位，如 11.3-10.12000=1.1800000000000015
    let decimalPlace = (decimalPlace1 >= decimalPlace2) ? decimalPlace1 : decimalPlace2;
    return ((operandLeft * multiple - operandRight * multiple) / multiple).toFixed(decimalPlace);
}

//乘法
export const multiply = function
    (operandLeft, operandRight) {
    let operand1 = operandLeft.toString();
    let operand2 = operandRight.toString();
    let decimalPlace1 = operand1.indexOf('.') >= 0 ? operand1.split('.')[1].length : 0;
    let decimalPlace2 = operand2.indexOf('.') >= 0 ? operand2.split('.')[1].length : 0;
    let multiple1 = Math.pow(10, decimalPlace1);
    let multiple2 = Math.pow(10, decimalPlace2);
    return ((operandLeft * multiple1) * (operandRight * multiple2)) / Math.pow(10, decimalPlace1 + decimalPlace2);
}

//除法
export const divide = function
    (operandLeft, operandRight) {
    let operand1 = operandLeft.toString();
    let operand2 = operandRight.toString();
    let decimalPlace1 = operand1.indexOf('.') >= 0 ? operand1.split('.')[1].length : 0;
    let decimalPlace2 = operand2.indexOf('.') >= 0 ? operand2.split('.')[1].length : 0;
    let multiple1 = Math.pow(10, decimalPlace1);
    let multiple2 = Math.pow(10, decimalPlace2);
    return ((operandLeft * multiple1) / (operandRight * multiple2)) * Math.pow(10, decimalPlace2 - decimalPlace1);
}

//校验表达式的合法性
export const isArithmeticExpression = function
    (expression) {
    try {
        expression = expression.replace(/÷/g, '/').replace(/×/g, '*');
        let result = eval(expression);
    } catch (e) {
        return false;
    }
    return true;
}

//计算
export const calculate = function
    (expression) {
    let value = eval(expression);
    return value;
}

//中缀表达式转后缀表达式
export const infixToPostfixExpression = function
    (expression) {
    expression = Bee.StringUtils.deleteWhitespace(expression);
    expression = this.eliminatePositiveOrNegativeSign(expression);
    let operatorStack = [];
    let resultStack = [];
    let elementArr = expression.match(/[-+\/÷*×()]|(?:[1-9]\d*|0)(?:\.\d+)?/g);
    let size = elementArr.length;
    for (let i = 0; i < size; i++) {
        if (Bee.StringUtils.isNumeric(elementArr[i])) {
            //如果是数值
            resultStack.push(elementArr[i]);
        } else {
            //操作符栈顶元素
            let operatorStackTopElement = operatorStack.length === 0 ? '' : operatorStack[operatorStack.length - 1];
            //运算符
            if (operatorStack.length === 0 || elementArr[i] === '(' || operatorStackTopElement === '(' || this.operatorPrecedence[elementArr[i]] > this.operatorPrecedence[operatorStackTopElement]) {
                //操作符栈为空或栈顶元素为右括号')'，或操作符的优先级比栈顶运算符高或相等，直接入栈
                operatorStack.push(elementArr[i]);
            } else {
                //如果是右括号")"，则依次弹出操作符栈顶的运算符，并压入结果栈，直到遇到左括号'('为止，左右括号不压入结果栈；
                if (elementArr[i] === ')') {
                    for (let index = operatorStack.length - 1; index >= 0; index--) {
                        if (operatorStack[index] === '(') {
                            operatorStack.pop();
                            break;
                        } else {
                            resultStack.push(operatorStack.pop());
                        }
                    }
                } else {
                    //将符号栈顶的运算符弹出并压入到结果栈中，再次与符号栈中新的栈顶运算符相比较
                    resultStack.push(operatorStack.pop());
                    i--;
                    continue;
                }
            }
        }
    }
    //处理操作符栈剩余的符号
    if (operatorStack.length > 0) {
        for (let j = operatorStack.length - 1; j >= 0; j--) {
            resultStack.push(operatorStack.pop());
        }
    }
    //结果返回
    return resultStack.join(' ');
}

//中缀表达式转前缀表达式(结果以空格隔开)
export const infixToPrefixExpression = function
    (expression) {
    expression = Bee.StringUtils.deleteWhitespace(expression);
    expression = this.eliminatePositiveOrNegativeSign(expression);
    let operatorStack = [];
    let resultStack = [];
    let elementArr = expression.match(/[-+\/÷*×()]|(?:[1-9]\d*|0)(?:\.\d+)?/g);
    let size = elementArr.length;
    for (let i = size - 1; i >= 0; i--) {
        if (Bee.StringUtils.isNumeric(elementArr[i])) {
            //如果是数值
            resultStack.push(elementArr[i]);
        } else {
            //操作符栈顶元素
            let operatorStackTopElement = operatorStack.length === 0 ? '' : operatorStack[operatorStack.length - 1];
            //运算符
            if (operatorStack.length === 0 || elementArr[i] === ')' || operatorStackTopElement === ')' || this.operatorPrecedence[elementArr[i]] >= this.operatorPrecedence[operatorStackTopElement]) {
                //操作符栈为空或栈顶元素为右括号')'，或操作符的优先级比栈顶运算符高或相等，直接入栈
                operatorStack.push(elementArr[i]);
            } else {
                //如果是左括号"("，则依次弹出操作符栈顶的运算符，并压入结果栈，直到遇到右括号')'为止，左右括号不压入结果栈；
                if (elementArr[i] === '(') {
                    for (let index = operatorStack.length - 1; index >= 0; index--) {
                        if (operatorStack[index] === ')') {
                            operatorStack.pop();
                            break;
                        } else {
                            resultStack.push(operatorStack.pop());
                        }
                    }
                } else {
                    //将符号栈顶的运算符弹出并压入到结果栈中，再次与符号栈中新的栈顶运算符相比较
                    resultStack.push(operatorStack.pop());
                    i++;
                    continue;
                }

            }
        }
    }
    //处理操作符栈剩余的符号
    if (operatorStack.length > 0) {
        for (let j = operatorStack.length - 1; j >= 0; j--) {
            resultStack.push(operatorStack.pop());
        }
    }
    //结果返回
    return resultStack.reverse().join(' ');
}

//解决正负号问题-1转为0-1;+1转为0+1
export const eliminatePositiveOrNegativeSign = function
    (expression) {
    return expression.replace(/(\(|^)([-+])/g, '$10$2');
}

//把中缀表达式转为前缀表达式，再计算
export const calculateByPrefixExpression = function
    (expression) {
    let elementArr = this.infixToPrefixExpression(expression).split(' ');
    let size = elementArr.length;
    let resultStack = [];
    for (let i = size - 1; i >= 0; i--) {
        if (Bee.StringUtils.isNumeric(elementArr[i])) {
            //如果是数值
            resultStack.push(elementArr[i]);
        } else {
            let operand1 = resultStack.pop();
            let operand2 = resultStack.pop();
            let result;
            switch (elementArr[i]) {
                case '+':
                    result = Bee.ElementaryArithmeticUtils.add(operand1, operand2);
                    break;
                case '-':
                    result = Bee.ElementaryArithmeticUtils.subtract(operand1, operand2);
                    break;
                case '×':
                case '*':
                    result = Bee.ElementaryArithmeticUtils.multiply(operand1, operand2);
                    break;
                case '\/':
                case '÷':
                    result = Bee.ElementaryArithmeticUtils.divide(operand1, operand2);
                    break;
                default:
                    result = '';
                    alert("The operator 【" + elementArr[i] + "】 is not legal");
                    break;
            }
            resultStack.push(result);
        }
    }
    return resultStack;
}
//把中缀表达式转为后缀表达式，再计算
export const calculateByPostfixExpression = function
    (expression) {
    let elementArr = this.infixToPostfixExpression(expression).split(' ');
    let size = elementArr.length;
    let resultStack = [];
    for (let i = 0; i < size; i++) {
        if (Bee.StringUtils.isNumeric(elementArr[i])) {
            //如果是数值
            resultStack.push(elementArr[i]);
        } else {
            let operand1 = resultStack.pop();
            let operand2 = resultStack.pop();
            let result;
            switch (elementArr[i]) {
                case '+':
                    result = Bee.ElementaryArithmeticUtils.add(operand2, operand1);
                    break;
                case '-':
                    result = Bee.ElementaryArithmeticUtils.subtract(operand2, operand1);
                    break;
                case '×':
                case '*':
                    result = Bee.ElementaryArithmeticUtils.multiply(operand2, operand1);
                    break;
                case '\/':
                case '÷':
                    result = Bee.ElementaryArithmeticUtils.divide(operand2, operand1);
                    break;
                default:
                    result = '';
                    alert("The operator 【" + elementArr[i] + "】 is not legal");
                    break;
            }
            resultStack.push(result);
        }
    }
    return resultStack;
}

//横式计算
export const horizontalCalculation = function
    (expression) {
    expression = Bee.StringUtils.deleteWhitespace(expression);
    expression = this.eliminatePositiveOrNegativeSign(expression);
    let result = expression;
    while (expression.indexOf('(') >= 0) {
        expression = expression.replace(/\([^()]+\)/g, function (matchStr) {
            return eval(matchStr);
        });
        result += '=' + expression;
    }
    while (expression.indexOf('[') >= 0) {
        expression = expression.replace(/\[[^\[\]]+\]/g, function (matchStr) {
            return eval(matchStr);
        });
        result += '=' + expression;
    }
    while (expression.indexOf('{') >= 0) {
        expression = expression.replace(/\{[^{}]+\}/g, function (matchStr) {
            return eval(matchStr);
        });
        result += '=' + expression;
    }
    let pattern = /(?:[1-9]\d*|0)(?:\.\d+)?[*/](?:[1-9]\d*|0)(?:\.\d+)?/;
    while (expression.indexOf('*') >= 0 || expression.indexOf('/') >= 0) {
        expression = expression.replace(pattern, function (matchStr, index) {
            return eval(matchStr);
        });
        result += '=' + expression;
    }
    if (/[-+*/]/.test(expression)) {
        result += '=' + eval(expression);
    }
    return result;
}

//竖式计算
export const verticalCalculation = function (expression) {
    let result = this.horizontalCalculation(expression);
    return result.replace(/=/g, "\n$&");
};