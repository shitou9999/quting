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
import Button from 'teaset/components/Button/Button'

/**
 * 无绑定无进行中
 */
class NoParkingCarView extends Component {

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
                height: 200,
                paddingLeft: 10,
                paddingRight: 10,
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Label style={{marginTop: 5, marginBottom: 10, marginTop: 10}} size='md' type='detail'
                       text='暂无车辆信息,请绑定车辆'/>
                <Button style={{backgroundColor: 'blue', width: 150}} size='md'>
                    <Image style={{width: 16, height: 16, tintColor: '#8a6d3b'}}
                           source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}/>
                    <Label style={{color: 'white', fontSize: 16, paddingLeft: 8}} text='绑定车辆'/>
                </Button>
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

export default connect(mapState, dispatchAction)(NoParkingCarView)