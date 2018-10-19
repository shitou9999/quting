/**
 * Created by PVer on 2018/7/21.
 */
// import * as PhoneUtil from '../../utils/PhoneUtil';
// PhoneUtil.isEmail()

const idCardRegex = {
    //18位身份证简单校验
    IDCARD_18_SIMPLE_PATTERN: /^(?:1[1-5]|2[1-3]|3[1-7]|4[1-6]|5[0-4]|6[1-5])\d{4}(?:1[89]|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}(?:\d|[xX])$/,
    //15位身份证简单校验
    IDCARD_15_SIMPLE_PATTERN: /^(?:1[1-5]|2[1-3]|3[1-7]|4[1-6]|5[0-4]|6[1-5])\d{4}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}$/,
    IDCARD_HIDE: /^(.{6}).{10}(.{2})$/
};


//18位身份证简单校验
export const isSimpleIdCard18 = function (idCard) {
    return idCardRegex.IDCARD_18_SIMPLE_PATTERN.test(idCard);
};
//15位身份证简单校验
export const isSimpleIdCard15 = function (idCard) {
    return idCardRegex.IDCARD_18_SIMPLE_PATTERN.test(idCard);
};
//18位身份证校验码校验
export const checkCode = function (idCard) {
    let multiplier = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    let idDatas = idCard.split("");
    let len = 17;
    let sum = 0;
    for (let i = 0; i < len; i++) {
        sum += idDatas[i] * multiplier[i];
    }
    let remainder = sum % 11;
    let checkCodeArr = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    let checkCode = checkCodeArr[remainder];
    return checkCode === idCard[17];
};
//18位身份证严格校验
export const isIdCard18 = function (idCard) {
    //先校验格式
    if (this.isSimpleIdCard18(idCard)) {
        //校验日期时间是否合法
        let dateStr = idCard.substr(6, 8);
        let dateStrNew = dateStr.replace(/(\d{4})(\d{2})(\d{2})/, "$1/$2/$3");
        let dateObj = new Date(dateStrNew);
        let month = dateObj.getMonth() + 1;
        if (parseInt(dateStr.substr(4, 2)) === month) {
            return this.checkCode(idCard);
        }
    }
    return false;
};
//根据18身份证号码获取人员信息
export const getPersonInfo18 = function (idCard) {
    let age = 0;
    let birthday = '';
    let address = '';
    let sex = '';
    address = Bee.areas[idCard.substr(0, 2) + '0000'] + ' ' + Bee.areas[idCard.substr(0, 4) + '00'] + ' ' + Bee.areas[idCard.substr(0, 6)];
    sex = (idCard.substr(16, 1) % 2 === 0) ? '女' : '男';
    birthday = idCard.substr(6, 8).replace(/(\d{4})(\d{2})(\d{2})/, '$1年$2月$3日');
    age = new Date().getFullYear() - idCard.substr(6, 4) + 1;
    let person = {
        'address': address,
        'sex': sex,
        'birthday': birthday,
        'age': age
    };
    return person;
};

//隐藏中间
export const hideIdCard = (idCard) => {
    return idCard.replace(idCardRegex.IDCARD_HIDE, '$1**********$2')
}
