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

/**
 * 车辆认证
 */
class CarApprovalPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ownerName: '',
            vehNo: '',
            plate: '',
        }
    }

    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         title: navigation.getParam('otherParam', 'A Nested Details Screen'),
    //     };
    // };

    //在props被改变时更新一些东西
    componentWillReceiveProps(nextProps) {
        Alert.alert('9999999')
    }

    /**
     * 申请认证
     * @private
     */
    _getRequestCarApproval = () => {
        let service = '/vehicle/approval'
        let params = {
            "userId": 0,
            "plate": this.state.plate,
            "plateColor": "0",
            "owenerName": this.state.ownerName,
            "vehNo": this.state.vehNo,
            "drivingLic": "",//行驶证
            "panorama": ""// 全景图片
        }
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('申请认证成功');
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
                <ScrollView
                    ref={(scroll) => this._scroll = scroll}
                    keyboardDismissMode='on-drag'
                    keyboardShouldPersistTaps='never'
                    showsVerticalScrollIndicator={true}
                    scrollEnabled={true}
                    pagingEnabled={true}
                    horizontal={false}
                    onScroll={(e) => {
                        console.warn('onScroll');
                    }}>
                    <View>
                        <ListRow title='车牌号' detail={
                            'React Native'
                        } titlePlace='left'/>
                        <ListRow title='车牌类型' detail={
                            '蓝色'
                        } titlePlace='left'/>
                    </View>

                    <View style={{marginLeft: 10}}>
                        <View style={{flexDirection: 'row', alignItems: 'center', height: 50,}}>
                            <Text style={styles.textStyle}>车主姓名</Text>
                            <Input
                                style={styles.input}
                                size='lg'
                                value={this.state.ownerName}
                                placeholder='请输入车主姓名'
                                onChangeText={text => this.setState({ownerName: text})}
                            />
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', height: 50,}}>
                            <Text style={styles.textStyle}>车架号</Text>
                            <Input
                                style={styles.input}
                                size='lg'
                                value={this.state.vehNo}
                                placeholder='请输入车架号后六位数'
                                onChangeText={text => this.setState({vehNo: text})}
                            />
                        </View>
                        <View style={{height: 50, justifyContent: 'center'}}>
                            <Text style={styles.textStyle}>行驶证照片</Text>
                        </View>
                        <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                               style={{width: 88, height: 88}}
                        />
                        <View style={{height: 50, justifyContent: 'center'}}>
                            <Text style={styles.textStyle}>行驶证全景照片</Text>
                        </View>
                        <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                               style={{width: 88, height: 88}}
                        />
                    </View>
                </ScrollView>
                <Button title="确 认"
                        size='lg'
                        style={[MeStyle.bottomBt, {marginTop: 10}]}
                        onPress={() => {
                            this._getRequestCarApproval()
                        }}
                        type='primary'/>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    rootView: {
        backgroundColor: 'white',
    },
    input: {
        flex: 1,
        height: 50,
        borderColor: 'white',
        borderRadius: 0,
        marginTop: 5,
    },
    textStyle: {}
});

const mapState = (state) => ({
    // isLoginLable: state.user.isLoginLable,
});

const dispatchAction = (dispatch) => ({
    // register: (user, pwd) => dispatch(userActions.register(user, pwd, pwd)),
    // login: (user, pwd) => dispatch(userActions.login(user, pwd))
    // loginAction: bindActionCreators(loginActions, dispatch),
    // userAction: bindActionCreators(userActions, dispatch)
});

export default connect(mapState, dispatchAction)(CarApprovalPage)