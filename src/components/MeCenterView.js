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
    TouchableOpacity,
    ImageBackground, StatusBar
} from 'react-native';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux'
import {Input, ListRow, Button, Overlay, Label, Toast} from "../components/teaset/index"
import {StateImage} from "./base"
import {commonStyle} from '../constants/commonStyle'
import * as Constants from '../constants/Constants'
import {images} from "../assets/index";


class MeCenterView extends Component {

    static propTypes = {
        overagePrice: PropTypes.number,
        vehicleNum: PropTypes.number,
        nickName: PropTypes.string,
        userPic: PropTypes.string,
    }

    static defaultProps = {
        overagePrice: 0.0,
        vehicleNum: 0,
        nickName: '',
        userPic: ''
    }

    constructor(props) {
        super(props);
        this.state = {}
    }

    _walletClick = () => {
        this.props.navigation.navigate('UserWalletPage')
    }

    _carPlateClick = () => {
        this.props.navigation.navigate('UserBindCarPage', {fromPage: 2})
    }

    render() {
        const {navigation, overagePrice, vehicleNum, nickName, userPic} = this.props
        return (
            <View style={{backgroundColor: commonStyle.white}}>
                <ImageBackground style={{flex: 1}}
                                 source={images.me_bg}>
                    <View style={{height: 200}}>
                        <View style={{
                            position: 'absolute',
                            right: 10, top: 30
                        }}>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('SettingPage')
                            }}>
                                <Image source={images.me_config}
                                       resizeMode='contain'
                                       style={{
                                           width: 25, height: 25,
                                       }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            position: 'absolute',
                            left: 10, top: 30
                        }}>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('MessagePage')
                            }}>
                                <Image source={images.me_news}
                                       resizeMode='contain'
                                       style={{
                                           width: 25, height: 25,
                                       }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            height: 200,
                            alignItems: commonStyle.center,
                            justifyContent: commonStyle.center,
                            marginTop: commonStyle.marginTop + 10
                        }}>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('UserInfoPage')
                            }}>
                                <View>
                                    <StateImage style={styles.avatar}
                                                url={`${Constants.loadUrl}${userPic}`}
                                                defaultSource={images.me_user_empty}
                                                errorSource={images.me_user_empty}
                                    />
                                    <Image source={images.me_edit}
                                           resizeMode='contain'
                                           style={{
                                               width: 15,
                                               height: 15,
                                               position: 'relative',
                                               bottom: 15,
                                               left: 50
                                           }}
                                    />
                                </View>
                            </TouchableOpacity>
                            <Label size='md' type='title' text={nickName} style={{color: commonStyle.white}}/>
                        </View>
                    </View>
                </ImageBackground>
                <View style={{
                    flexDirection: commonStyle.row,
                    justifyContent: commonStyle.center,
                    alignItems: commonStyle.center,
                    height: 50,
                }}>
                    <View style={{flex: 1}}>
                        <TouchableOpacity onPress={this._walletClick}>
                            <View style={styles.itemStyle}>
                                <Image source={images.me_wallet}
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
                                <Image source={images.me_car_manage}
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


export default MeCenterView
