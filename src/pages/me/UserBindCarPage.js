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
    TouchableWithoutFeedback
} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Toast from 'teaset/components/Toast/Toast'
import Button from 'teaset/components/Button/Button'
import {UltimateListView} from "react-native-ultimate-listview"
import BindPlateView from '../../components/BindPlateView'

import * as HttpUtil from '../../net/HttpUtils'

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

    onFetch = async(page = 1, startFetch, abortFetch) => {
        try {
            const {login} = this.props
            let userId = login.user.id;
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
        const {me} = this.props
        let service = '/vehicle/unbind';
        let params = {
            "userId": me.user_info.userId,
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

    _userClickItem = (plate) => {
        this.props.navigation.state.params.returnData(plate, 'test')
        this.props.navigation.goBack();
    }

    renderItem = (item, index, separator) => {
        return (
            <BindPlateView plateColor={item.plateColor}
                           plate={item.plate}
                           approvalStatus={item.approvalStatus}
                           drivingLic={item.drivingLic}
                           owenerName={item.owenerName}
                           panorama={item.params}
                           reason={item.reason}
                           sysTime={item.sysTime}
                           vehNo={item.vehNo}
                           itemClick={this._userClickItem}
            />
        )
    };

    render() {
        const {navigation} = this.props;
        let isShowAdd = this.state.addBtCar ? (
            <TouchableWithoutFeedback onPress={()=>{
                navigation.navigate('BindCarPage')
            }}>
                <View style={{height:50,backgroundColor:'blue',justifyContent:'center'}}>
                    <Text style={{fontSize:20,color:'red',alignSelf:'center'}}>添加车辆</Text>
                </View>
            </TouchableWithoutFeedback>
        ) : null
        return (
            <View style={{flex:1}}>
                <View style={{flex:1}}>
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

                </View>
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
    nav: state.nav,
    login: state.login,
    me: state.me,
});

const dispatchAction = (dispatch) => ({
    // login: (user, pwd) => dispatch(userActions.login(user, pwd))
    // loginAction: bindActionCreators(loginActions, dispatch)
});

export default connect(mapState, dispatchAction)(UserBindCarPage)