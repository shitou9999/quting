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
import {storage} from '../../utils/storage';

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

    componentWillMount() {
        this._getAppDictionary()
    }

    _getAppDictionary = () => {
        let service = '/dictionary/member'
        HttpUtil.fetchRequest(service, 'GET')
            .then(json => {
                if (json.code === '000000') {
                    // let mapVo = new Map()
                    for (let index in json.data) {
                        let lookupName = json.data[index].lookupName;
                        let lookupKey = json.data[index].lookupKey;
                        let lookupValue = json.data[index].lookupValue;
                        if (lookupName.includes('_')) {
                            let newName = lookupName.replace(/_/g, '+')
                            console.log(newName)
                            storage.save(newName, lookupKey, lookupValue)
                        } else {
                            storage.save(lookupName, lookupKey, lookupValue)
                        }
                    }
                } else {
                    Toast.message('获取数据字典异常')
                }
            }).catch()
    }

    _test = () => {
        // storage.load("PROBLEM+TYPE", (results) => {
        //     console.log(results)//(2) [{…}, {…}]
        //     results.forEach(result => {
        //         console.log(result.lookupValue);
        //     })
        // })
        //读取单个字典
        storage.loadId("PROBLEM+TYPE", 1, results => {
            console.log(results)
        })
        //读取某一类字典[]
        storage.getAllDataForKey('PROBLEM+TYPE', users => {
            console.log(users);
        });
    }


    _getRequestComplaint = () => {
        const {login,} = this.props;
        const {complaintType, inputValue, contactValue} = this.state;

        if (BeeUtil.equals('无', complaintType)) {
            Toast.message('请选择投诉分类')
            return
        }
        if (BeeUtil.isEmpty(inputValue)) {
            Toast.message('请输入投诉内容')
            return
        }
        if (BeeUtil.isEmpty(contactValue)) {
            Toast.message('请输入联系方式')
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
                    Toast.message('提交成功');
                } else {
                    Toast.message(json.msg)
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
                            {/*Alert.alert('Button');*/
                            }
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
