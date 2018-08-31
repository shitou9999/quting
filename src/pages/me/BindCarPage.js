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
    ScrollView
} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Toast from 'teaset/components/Toast/Toast';
import Label from 'teaset/components/Label/Label';
import ListRow from 'teaset/components/ListRow/ListRow';
import Button from 'teaset/components/Button/Button';
import Input from 'teaset/components/Input/Input';

import * as HttpUtil from '../../net/HttpUtils';
import MeStyle from '../../assets/styles/MeStyle';
import BeeUtil from '../../utils/BeeUtil';

/**
 * 车牌绑定
 */
class BindCarPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            plate: '',
            plateColor: '',
        }
    }

    /**
     * 绑定车辆
     * @private
     */
    _getRequestBindCar = () => {
        if (BeeUtil.isEmpty("")) {
            Toast.message('请选择车牌')
            return
        }
        if (BeeUtil.isEmpty('')) {
            Toast.message('请选择车牌类型')
            return
        }
        let service = '/vehicle/bind'
        const {me} = this.props
        let params = {
            "userId": me.user_info.userId,
            "plate": this.state.plate,
            "plateColor": this.state.plateColor
        }
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('绑定车辆成功');
                } else {
                    Toast.message(json.msg)
                }
            })
            .catch(err => {
            })
    };

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.rootView}>
                <Text style={styles.textStyle}>请确定车辆信息真是有效,否则无法进行电子支付或领券哦</Text>
                <View style={[styles.borderStyle, styles.inputStyle]}>
                    <Text style={{fontSize: 18}}>浙</Text>
                    <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                           style={{width: 20, height: 20}}
                    />
                    <Text style={{marginLeft: 10, fontSize: 18}}>浙8888888</Text>
                </View>
                <View style={[styles.borderStyle, styles.inputStyle, {justifyContent: 'space-between',}]}>
                    <Text>车牌类型</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text>蓝牌</Text>
                        <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                               style={{width: 20, height: 20}}
                        />
                    </View>

                </View>
                <Button title="确 认"
                        size='lg'
                        style={[MeStyle.bottomBt, {marginTop: 50}]}
                        onPress={() => {
                            this._getRequestBindCar()
                        }}
                        type='primary'/>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    rootView: {
        //backgroundColor: 'white',
    },
    input: {
        flex: 1,
        height: 50,
        borderColor: 'white',
        borderRadius: 0,
        marginTop: 5,
    },
    textStyle: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10
    },
    borderStyle: {
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: 'white'
    },
    inputStyle: {
        flexDirection: 'row',
        marginLeft: 25,
        marginRight: 25,
        marginTop: 20,
        height: 50,
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    }
});

const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me,
});

const dispatchAction = (dispatch) => ({
    // register: (user, pwd) => dispatch(userActions.register(user, pwd, pwd)),
    // login: (user, pwd) => dispatch(userActions.login(user, pwd))
    // loginAction: bindActionCreators(loginActions, dispatch),
    // userAction: bindActionCreators(userActions, dispatch)
});

export default connect(mapState, dispatchAction)(BindCarPage)