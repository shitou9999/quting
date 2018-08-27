/**
 * Created by PVer on 2018/8/19.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux'
import Label from 'teaset/components/Label/Label'
import Toast from 'teaset/components/Toast/Toast'

class MeCenterView extends Component {

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

    _walletClick = () => {
        const {navigation} = this.props;
        navigation.navigate('UserWalletPage')
    }

    _carPlateClick = () => {
        const {navigation} = this.props;
        navigation.navigate('UserBindCarPage')
    }

    render() {
        const {navigation} = this.props;
        return (
            <View>
                <View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginLeft: 10,
                        marginRight: 10
                    }}>
                        <TouchableOpacity onPress={() => {
                            // navigation.navigate('MessagePage')
                            // navigation.navigate('CarApprovalPage')
                            // navigation.navigate('CarDetailPage')
                            navigation.navigate('BindCarPage')
                        }}>
                            <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                                   style={{width: 40, height: 40}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('SettingPage')
                        }}>
                            <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                                   style={{width: 40, height: 40}}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        height: 120,
                        backgroundColor: 'yellow',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('UserInfoPage')
                        }}>
                            <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                                   style={{width: 80, height: 80}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 50,
                    backgroundColor: 'red'
                }}>
                    <View style={{flex: 1}}>
                        <TouchableOpacity onPress={this._walletClick}>
                            <View style={styles.itemStyle}>
                                <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                                       style={{width: 40, height: 40}}
                                />
                                <View style={{marginLeft: 5}}>
                                    <Label size='md' type='detail' text='0.0元'/>
                                    <Label size='md' type='detail' text='钱包'/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
                        <TouchableOpacity onPress={this._carPlateClick}>
                            <View style={styles.itemStyle}>
                                <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                                       style={{width: 40, height: 40}}
                                />
                                <View style={{marginLeft: 5, justifyContent: 'center'}}>
                                    <Label size='md' type='detail' text='0'/>
                                    <Label size='md' type='detail' text='车牌'/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    itemStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

MeCenterView.propTypes = {
    navigation: PropTypes.object.isRequired,
};


MeCenterView.defaultProps = {
    userName: ' ',
    setting: false,
    isOrganizations: true
};

const mapState = (state) => ({
    navigation: state.nav,
});

const dispatchAction = (dispatch) => ({
    // login: (user, pwd) => dispatch(userActions.login(user, pwd))
    // loginAction: bindActionCreators(loginActions, dispatch),
    // userAction: bindActionCreators(userActions, dispatch)
});

export default MeCenterView