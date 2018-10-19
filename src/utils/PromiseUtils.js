import {Platform, Alert, PermissionsAndroid} from 'react-native'
import Permissions from 'react-native-permissions'
//requestMultiple(permissions)请求多个权限
//
/**
 * 检查权限
 * @param promise 权限
 * @returns {Promise<boolean|*>}
 */
// export const checkPermission = async ({promise = 'camera'} = {}) => {
export const checkPermission = async (promise = 'camera') => {
    try {
        const res = await Permissions.check(promise);
        if (__DEV__) {
            console.log('check', res);
        }
        return await decideAction(res, promise);
    } catch (e) {
        if (__DEV__) {
            console.log('error', e);
        }
        return false;
    }
}

/**
 * 用户是否授权过的
 * @param res
 * @param promise
 * @returns {Promise<*>}
 */
const decideAction = async (res, promise) => {
    switch (res) {
        case 'authorized':
            return true;
        case 'denied':
        case 'restricted':
            const canOpen = await Permissions.canOpenSettings();
            if (canOpen && Platform.OS === 'ios') {
                await new Promise(resolve => {
                    Alert.alert('您已关闭此授权', '请前往设置开启权限', [
                        {
                            text: '立即前往',
                            onPress: () => resolve(Permissions.openSettings())
                        },
                        {text: '取消', onPress: () => resolve(false)}
                    ]);
                });
            }
            return false;
        case 'undetermined':
            const request = await Permissions.request(promise);
            if (__DEV__) {
                console.log('request', request);
            }
            return await decideAction(request, promise);
    }
}

// let sss = checkPermission().then(result => {
//     console.log('权限-----ss>' + result)
// })
// console.log(sss)

//     location: PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//     camera: PermissionsAndroid.PERMISSIONS.CAMERA,
//     microphone: PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//     contacts: PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
//     event: PermissionsAndroid.PERMISSIONS.READ_CALENDAR,
//     storage: PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//     photo: PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//     callPhone: PermissionsAndroid.PERMISSIONS.CALL_PHONE,
//     readSms: PermissionsAndroid.PERMISSIONS.READ_SMS,
//     receiveSms: PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,

