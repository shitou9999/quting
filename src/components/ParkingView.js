/**
 * Created by PVer on 2018/8/19.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    Image
} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Label from 'teaset/components/Label/Label'


class ParkingView extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         title: navigation.getParam('otherParam', 'A Nested Details Screen'),
    //     };
    // };
    componentWillMount() {

    }

    //在props被改变时更新一些东西
    componentWillReceiveProps(nextProps) {

    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={{
                width: gScreen.screen_width - 20,
                height:200,
                paddingLeft: 10,
                paddingRight: 10,
                backgroundColor: 'white'
            }}>
                <View style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                               style={{width: 80, height: 80}}
                        />
                        <Label style={{marginLeft: 5}} size='md' type='title' text='浙12345'/>
                    </View>
                    <Label size='md' type='detail' text='切换车辆'/>
                </View>
                <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                    <View>
                        <Label size='md' type='detail' text='停车地点:33333333333330'/>
                        <Label size='md' type='detail' text='停车时长'/>
                        <Label size='md' type='detail' text='应付金额11111'/>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                        <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                               style={{width: 40, height: 40}}
                        />
                        <Label style={{marginTop: 5}} size='md' type='detail' text='支付'/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
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

export default connect(mapState, dispatchAction)(ParkingView)