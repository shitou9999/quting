/**
 * Created by PVer on 2018/7/14.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Dimensions} from 'react-native';
import {connect} from 'react-redux';
// import {
//     ListRow,
// } from 'teaset';
import ListRow from 'teaset/components/ListRow/ListRow';
import Input from 'teaset/components/Input/Input';
import Button from 'teaset/components/Button/Button';
import Toast from 'teaset/components/Toast/Toast';

import Global from '../../constants/global';
import MeStyle from '../../assets/styles/MeStyle';
import * as HttpUtil from '../../net/HttpUtils';
import BeeUtil from '../../utils/BeeUtil';
import * as Storage from '../../utils/storage';

// let screen = {
//     width: screenWidth,
//     height: screenHeight,
// }
//
// export default screen
/**
 * 投诉建议dev
 */
class ComplaintPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            complaintType: '无',
            inputValue: null,
            contactValue: null,
        }
    }

// {
//     "lookupName": "PROBLEM_TYPE",
//     "lookupKey": "1",
//     "lookupValue": "关于缴费"
// },
// {
//     "lookupName": "PROBLEM_TYPE",
//     "lookupKey": "2",
//     "lookupValue": "关于充值"
// },
// {
//     "lookupName": "PROBLEM_TYPE",
//     "lookupKey": "3",
//     "lookupValue": "关于停车"
// },
// {
//     "lookupName": "PROBLEM_TYPE",
//     "lookupKey": "4",
//     "lookupValue": "关于规划"
// },
// {
//     "lookupName": "PROBLEM_TYPE",
//     "lookupKey": "5",
//     "lookupValue": "其他"
// },

    componentWillMount() {
        this._getAppDictionary()
    }

    _getAppDictionary = () => {
        let service = '/dictionary/member'
        HttpUtil.fetchRequest(service, 'GET')
            .then(json => {
                if (json.code === '000000') {
                    let mapVo = new Map()
                    for (let index in json.data) {
                        let vo = {}
                        vo.lookupName = json.data[index].lookupName;
                        vo.lookupKey = json.data[index].lookupKey;
                        vo.lookupValue = json.data[index].lookupValue;
                        if (mapVo.has(vo.lookupName)) {
                            mapVo.get(vo.lookupName).push(vo)
                        } else {
                            mapVo.set(vo.lookupName, [])
                            mapVo.get(vo.lookupName).push(vo)
                        }
                    }
                    Storage.storage.save('dicts', mapVo)
                } else {
                    Toast.fail('获取数据字典异常')
                }
            }).catch()

    }


    _getLookupValueByLookupName = (lookupName, lookupKey) => {
        if (lookupName) {
            let dicts = []
            if (dicts) {
                let tmp = dicts.data[lookupName]
                let _lookupVal = ''
                for (let item of tmp) {
                    if (item.lookupKey == lookupKey) {
                        _lookupVal = item.lookupValue
                    }
                }
                return _lookupVal;
            } else {
                return '';
            }
        } else {
            return '';
        }
    }

    getDictsByLookupName = (lookupName) => {
        if (lookupName) {
            let dicts = '';
            if (dicts) {
                return dicts.data[lookupName]
            } else {
                return []
            }
        } else {
            return []
        }
    }


    _getRequestComplaint = () => {
        const {login,} = this.props;
        const {complaintType, inputValue, contactValue} = this.state;
        console.log('33333333');
        Storage.storage.load("dicts", (result) => {
            result.forEach(item => {
                console.log(item);
            })
        })

        // 获取某个key下的所有id(仅key-id数据)
        Storage.storage.getIdsForKey('dicts', ids => {
            console.log('9999999999');
        });

        // 获取某个key下的所有数据(仅key-id数据)
        Storage.storage.getAllDataForKey('dicts', users => {
            console.log(users);
        });


        if (BeeUtil.equals('无', complaintType)) {
            Toast.fail('请选择投诉分类')
            return
        }
        if (BeeUtil.isEmpty(inputValue)) {
            Toast.fail('请输入投诉内容')
            return
        }
        if (BeeUtil.isEmpty(contactValue)) {
            Toast.fail('请输入联系方式')
            return
        }
        let service = '/complain';
        let params = {
            "userId": login.user.id,
            "problemTitle": "关于缴费",
            "problemContent": inputValue,
            "problemType": "1",
            "contact": contactValue
        }
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.success('提交成功');
                } else {
                    Toast.fail(json.msg)
                }
            })
            .catch()
    }

// {/*// multiline=true*/}
    // onPress={() => this.navigator.push({view: <LabelExample />})}
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <ListRow
                        style={MeStyle.listRow}
                        title='选择投诉分类'
                        detail={this.state.complaintType}
                        onPress={() => {
                            Alert.alert('ListRow');
                        }}
                        bottomSeparator='full'/>
                    <Input
                        style={styles.input}
                        size='lg'
                        value={this.state.inputValue}
                        placeholder='输入投诉内容'
                        onChangeText={text => this.setState({inputValue: text})}
                    />
                    <ListRow title='联系方式'
                             style={MeStyle.listRow}
                             detail={
                                 <Input
                                     style={styles.contact}
                                     size='lg'
                                     value={this.state.contactValue}
                                     placeholder='邮箱或电话'
                                     onChangeText={text => this.setState({contactValue: text})}
                                 />
                             }
                             bottomSeparator='full'
                             topSeparator='full'/>
                </View>
                <Button title="提 交"
                        size='lg'
                        style={MeStyle.bottomBt}
                        onPress={() => {
                            {/*Alert.alert('Button');*/}
                            this._getRequestComplaint()
                        }}
                        type='primary'/>
                {/*onPress={() => this.login()}*/}
            </View>
        );
    }

    login() {

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff7776',
    },
    content: {
        flex: 1,
    },
    input: {
        width: Global.SCREEN_WIDTH,
        height: 200,
        borderColor: '#FFF',
        borderRadius: 0,
    },
    contact: {
        width: 300, borderColor: '#FFF'
    },
});

const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
});

const dispatchAction = (dispatch) => ({
    // loginAction: bindActionCreators(loginActions, dispatch),
});

export default connect(mapState, dispatchAction)(ComplaintPage);
