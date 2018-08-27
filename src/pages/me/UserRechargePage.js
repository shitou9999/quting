/**
 * Created by cyh on 2018/8/13.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import Input from 'teaset/components/Input/Input';
import ListRow from 'teaset/components/ListRow/ListRow';
import Button from 'teaset/components/Button/Button';
import RadioGroup from 'react-native-custom-radio-group';
import {RadioGroup as RadioGroupPay, RadioButton as RadioButtonPay} from 'react-native-flexi-radio-button';

import Loading from '../../components/Loading';
import LoadingModal from '../../components/LoadingModal';

import MeStyle from '../../assets/styles/MeStyle';
import BeeUtil from '../../utils/BeeUtil';
import Label from "teaset/components/Label/Label";


//充值
class UserRechargePage extends Component {

    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this)
        this.state = {
            textPrice: '',
            overagePrice: 0,
        }
    }


    onSelect(index, value) {
        this.setState({
            textPrice: `Selected index: ${index} , value: ${value}`,
        })
    }

    _selectMoney = (value) => {
        this.setState({
            textPrice: value,
        })
    }

    render() {
        const {me} = this.props
        if (BeeUtil.isNotEmpty(me.overagePrice)) {
            this.overagePrice = me.overagePrice
        }
        // let radioStyle = {};
        // radioStyle = {
        //     flexDirection: 'row',
        //     alignItems: 'center',
        //     marginLeft: margin,
        // }
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

                    <RadioGroupPay
                        thickness={2}
                        size={20}
                        selectedIndex={0}
                        highlightColor='#ccc8b9'
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
                <Button title="立即充值"
                        size='lg'
                        style={{marginLeft: 10, marginRight: 10}}
                        onPress={() => {

                        }}
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
    group: {
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    radio: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#7FFF00',
        alignItems: 'center',
    },
    radioText: {
        color: 'red',
    }
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