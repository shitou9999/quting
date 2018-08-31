/**
 * Created by cyh on 2018/8/13.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import Input from 'teaset/components/Input/Input'
import ListRow from 'teaset/components/ListRow/ListRow'
import Button from 'teaset/components/Button/Button'
import RadioGroup from 'react-native-custom-radio-group'
import Label from "teaset/components/Label/Label"
import Toast from 'teaset/components/Toast/Toast'
import {RadioGroup as RadioGroupPay, RadioButton as RadioButtonPay} from 'react-native-flexi-radio-button'

import Loading from '../../components/Loading';
import LoadingModal from '../../components/LoadingModal';

import MeStyle from '../../assets/styles/MeStyle';
import BeeUtil from '../../utils/BeeUtil';
import * as HttpUtil from '../../net/HttpUtils'


//充值
class UserRechargePage extends Component {

    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this)
        this.state = {
            textPrice: 50,
            overagePrice: 0,
            selectIndex: 0,
        }
    }

    _selectMoney = (value) => {
        this.setState({
            textPrice: value,
        })
    }


    onSelect(index, value) {
        this.setState({
            selectIndex: index,
        })
    }

    //支付宝充值生成充值订单
    _userAliRecharge = () => {
        let service = '/recharge/zfb_order'
        let params = {
            "userId": 0,
            "rechargeMoney": this.state.textPrice
        }
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('生成充值订单成功')

                } else {
                    Toast.message('生成充值订单失败')
                }
            })
            .catch()
    }

    //微信充值生成充值订单
    _userWeChatRecharge = () => {
        const {me} = this.props
        let service = '/recharge/wx_order'
        let params = {
            "userId": me.user_info.userId,
            "rechargeMoney": this.state.textPrice
        }
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('生成充值订单成功')

                } else {
                    Toast.message('生成充值订单失败')
                }
            })
            .catch()
    }

    _userRecharge = () => {
        const {selectIndex} = this.state
        if (selectIndex === 0) {
            this._userAliRecharge()
        } else if (selectIndex === 1) {
            this._userWeChatRecharge()
        }
    }

    render() {
        const {me} = this.props
        let overagePrice = me.user_info.overagePrice
        if (BeeUtil.isNotEmpty(overagePrice)) {
            this.overagePrice = overagePrice
        }
        const radioGroupList = [{
            label: '50元',
            value: '50'
        }, {
            label: '100元',
            value: '100'
        }, {
            label: '200元',
            value: '200'
        }, {
            label: '500元',
            value: '500'
        }];
        // buttonContainerStyle = {{flex:1,margin: 10, borderWidth: 1, borderColor: Color.whiteE}}
        // buttonContainerActiveStyle = {{backgroundColor: Color.yellowFCE}}

        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <ListRow
                        style={MeStyle.listRow}
                        title='账号信息'
                        detail={this.overagePrice}
                        bottomSeparator='full'/>
                    <Input
                        style={styles.input}
                        size='lg'
                        value={this.state.textPrice}
                        placeholder='充值金额'
                        onChangeText={text => this.setState({textPrice: text})}
                    />

                    <RadioGroup
                        radioGroupList={radioGroupList}
                        initialValue={'50'}
                        containerStyle={{flexWrap: 'wrap'}}
                        buttonContainerStyle={{width: 80, margin: 4, borderWidth: 1, borderColor: '#ffA500'}}
                        buttonContainerActiveStyle={{backgroundColor: '#000000'}}
                        onChange={(value) => this._selectMoney(value) }
                        ref={e => this.RadioGroup = e}
                    />

                    <View style={{backgroundColor: '#E6E6E6', padding: 10}}>
                        <Label size='md' type='title' text='支付方式'/>
                    </View>
                    <View style={{backgroundColor:'white'}}>
                        <RadioGroupPay
                            thickness={2}
                            size={20}
                            selectedIndex={0}
                            highlightColor='white'
                            onSelect={(index, value) => this.onSelect(index, value)}>
                            <RadioButtonPay Button value="支付宝"
                                            style={{
                                            flexDirection: 'row-reverse',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Image
                                        source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                                        style={{width: 28, height: 28}}
                                    />
                                    <Label size='md' type='title' text='支付宝' style={{marginLeft: 10}}/>
                                </View>
                            </RadioButtonPay>
                            <RadioButtonPay Button value="微信"
                                            style={{
                                            flexDirection: 'row-reverse',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}>
                                <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                    <Image
                                        source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                                        style={{width: 28, height: 28}}
                                    />
                                    <Label size='md' type='title' text='微信' style={{marginLeft: 10}}/>
                                </View>
                            </RadioButtonPay>
                        </RadioGroupPay>
                    </View>
                </View>
                <Button title="立即充值"
                        size='lg'
                        style={{marginLeft: 10, marginRight: 10}}
                        onPress={this._userRecharge}
                        type='primary'/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 10,
        flex: 1
    },
    input: {
        width: gScreen.screen_width,
        height: 50,
        borderColor: '#FFF',
        borderRadius: 0,
        marginTop: 5,
    },
});

const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me
});

const dispatchAction = (dispatch) => ({
    // loginAction: bindActionCreators(loginActions, dispatch),
});

export default connect(mapState, dispatchAction)(UserRechargePage);