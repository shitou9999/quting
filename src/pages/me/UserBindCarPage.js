/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    Image,
} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Toast from 'teaset/components/Toast/Toast';
import Button from 'teaset/components/Button/Button';
import {UltimateListView} from "react-native-ultimate-listview";

import * as HttpUtil from '../../net/HttpUtils';
import DateUtil from '../../utils/DateUtil';
/**
 * 车牌绑定
 */
class UserBindCarPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addBtCar: true,
        }
    }

    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         title: navigation.getParam('otherParam', 'A Nested Details Screen'),
    //     };
    // };

    //在props被改变时更新一些东西
    componentWillReceiveProps(nextProps) {

    }

    componentWillMount() {
        // this._getRequestCarBind()
    }

    onFetch = async(page = 1, startFetch, abortFetch) => {
        try {
            ///vehicle/list?userId=1100000000029
            let userId = '1100000000029';
            let service = `/vehicle/list?userId=${userId}`;
            let pageLimit = 10;
            HttpUtil.fetchRequest(service, 'GET')
                .then(json => {
                    if (json.code === "000000") {
                        let allData = json.data;
                        let newData = []
                        newData = allData;
                        startFetch(newData, pageLimit);
                    } else {
                        Toast.message(json.msg)
                    }
                })
                .catch(err => {
                })
        } catch (err) {
            abortFetch(); //如果遇到网络错误，手动停止刷新或分页
            console.log(err);
        }
    };

    /**
     * 查询车辆信息(绑定)
     * @private
     */
    _getRequestCarBind = () => {

    };

    /**
     * 解绑车辆
     * @private
     */
    _getRequestUnbindCar = () => {
        let service = '/vehicle/unbind';
        let params = {
            "userId": 0,
            "plate": "",
            "plateColor": ""
        };
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('解绑成功');
                } else {
                    Toast.message(json.msg)
                }
            })
            .catch(err => {
            })
    };

    // approvalStatus: "0"
    // drivingLic: null
    // owenerName: null
    // panorama: null
    // plate: "浙RRRRR"
    // plateColor: "0"
    // reason: null
    // sysTime: 1527581238000
    // vehNo: null

    renderItem = (item, index, separator) => {
        let opTime = DateUtil.formt(item.sysTime, 'yyyy-MM-dd HH:mm:ss');
        return (
            <View style={{flex:1,flexDirection:'row',backgroundColor:'red',borderRadius:5,margin:5}}>
                <Image
                    source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                    style={{width: 88, height: 88,borderRadius:5,margin:5}}
                />
                <View style={{marginLeft:5,marginTop:10}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                                   style={{width: 18, height: 18}}
                            />
                            <Text >{item.plate}</Text>
                        </View>
                        <Text style={{alignSelf:'flex-end'}}>去认证</Text>
                    </View>
                    <Text>车主姓名:{item.owenerName}</Text>
                    <Text >{opTime}</Text>
                </View>
            </View>
        )
    };

    render() {
        const {navigation} = this.props;
        let isShowAdd = this.state.addBtCar ? (
            <View style={{height:50,backgroundColor:'blue',justifyContent:'center'}}>
                <Text style={{fontSize:20,color:'red',alignSelf:'center'}}>添加车辆</Text>
            </View>
        ) : null
        return (
            <View>
                <UltimateListView
                    ref={(ref) => this.flatList = ref}
                    onFetch={this.onFetch}
                    refreshableMode="basic" //basic or advanced
                    keyExtractor={(item, index) => `${index} - ${item}`}
                    item={this.renderItem}  //this takes two params (item, index)
                    displayDate
                    arrowImageStyle={{ width: 20, height: 20, resizeMode: 'contain' }}
                    emptyView={this._renderEmptyView}
                />
                {isShowAdd}
            </View>
        );
    }

    _renderEmptyView = () => {
        return <Text>我是没数据</Text>
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

const mapState = (state) => ({
    // isLoginLable: state.user.isLoginLable,
});

const dispatchAction = (dispatch) => ({
    // login: (user, pwd) => dispatch(userActions.login(user, pwd))
    // loginAction: bindActionCreators(loginActions, dispatch),
    // userAction: bindActionCreators(userActions, dispatch)
});

export default connect(mapState, dispatchAction)(UserBindCarPage)