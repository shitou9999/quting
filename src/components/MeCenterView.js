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
import {commonStyle} from '../constants/commonStyle'

class MeCenterView extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    _walletClick = () => {
        const {navigation} = this.props;
        navigation.navigate('UserWalletPage')
    }

    _carPlateClick = () => {
        const {navigation} = this.props;
        navigation.navigate('UserBindCarPage', {fromPage: 2})
    }

    render() {
        const {navigation, overagePrice, vehicleNum, nickName} = this.props;
        return (
            <View style={{backgroundColor: 'white'}}>
                <View>
                    <View style={{
                        flexDirection: commonStyle.row,
                        justifyContent: commonStyle.between,
                        marginLeft: commonStyle.marginLeft,
                        marginRight: commonStyle.marginRight
                    }}>
                        <TouchableOpacity onPress={() => {
                            // navigation.navigate('MessagePage')
                            // navigation.navigate('CarApprovalPage')
                            // navigation.navigate('CarDetailPage')
                            navigation.navigate('BindCarPage')
                        }}>
                            <Image source={require('../assets/images/me_news.png')}
                                   resizeMode='contain'
                                   style={{width: 40, height: 40}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('SettingPage')
                        }}>
                            <Image source={require('../assets/images/me_config.png')}
                                   resizeMode='contain'
                                   style={{width: 40, height: 40}}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        height: 120,
                        backgroundColor: commonStyle.yellow,
                        alignItems: commonStyle.center,
                        justifyContent: commonStyle.center
                    }}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('UserInfoPage')
                        }}>
                            <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                                   style={styles.avatar}
                            />
                        </TouchableOpacity>
                        <Label size='md' type='title' text={nickName} style={{marginTop: 10}}/>
                    </View>
                </View>
                <View style={{
                    flexDirection: commonStyle.row,
                    justifyContent: commonStyle.center,
                    alignItems: commonStyle.center,
                    height: 50,
                }}>
                    <View style={{flex: 1}}>
                        <TouchableOpacity onPress={this._walletClick}>
                            <View style={styles.itemStyle}>
                                <Image source={require('../assets/images/me_wallet.png')}
                                       resizeMode='contain'
                                       style={{width: 30, height: 30}}
                                />
                                <View style={{marginLeft: 5, justifyContent: commonStyle.center}}>
                                    <Label size='md' type='detail' text={`${overagePrice}元`}/>
                                    <Label size='md' type='detail' text='钱包'/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{height: 30, width: gLine.minLine, backgroundColor: commonStyle.lineColor}}/>
                    <View style={{flex: 1}}>
                        <TouchableOpacity onPress={this._carPlateClick}>
                            <View style={styles.itemStyle}>
                                <Image source={require('../assets/images/me_car_manage.png')}
                                       resizeMode='contain'
                                       style={{width: 30, height: 30}}
                                />
                                <View style={{marginLeft: 5, justifyContent: commonStyle.center}}>
                                    <Label size='md' type='detail' text={vehicleNum}/>
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
        textAlign: commonStyle.center,
        margin: 10,
    },
    itemStyle: {
        flexDirection: commonStyle.row,
        justifyContent: commonStyle.center,
        alignItems: commonStyle.center,
    },
    avatar: {
        borderRadius: 50,
        width: 80,
        height: 80
    }
});

MeCenterView.propTypes = {
    navigation: PropTypes.object.isRequired,
    overagePrice: PropTypes.number,
    vehicleNum: PropTypes.number,
    nickName: PropTypes.string,
};


MeCenterView.defaultProps = {
    overagePrice: 0.0,
    vehicleNum: 0,
    nickName: '',
};

const mapState = (state) => ({
    navigation: state.nav,
});

const dispatchAction = (dispatch) => ({
    // login: (user, pwd) => dispatch(userActions.login(user, pwd))
    // loginAction: bindActionCreators(loginActions, dispatch)
});

export default MeCenterView