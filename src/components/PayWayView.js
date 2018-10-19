import React, {Component} from "react";
import {RadioGroup as RadioGroupPay, RadioButton as RadioButtonPay} from 'react-native-flexi-radio-button'
import {Image, View} from "react-native";
import {Input, ListRow, Button, Overlay, Label, Toast} from "../components/teaset/index"
import PropTypes from 'prop-types'
import {commonStyle} from "../constants/commonStyle";
import {images} from "../assets";

export default class PayWayView extends Component {

    static propTypes = {
        onSelect: PropTypes.func,
        isVisible: PropTypes.bool
    }

    static defaultProps = {
        isVisible: true
    }

    render() {
        return (
            <View style={{backgroundColor: commonStyle.white}}>
                <RadioGroupPay
                    thickness={2}
                    size={20}
                    selectedIndex={0}
                    onSelect={(index, value) => {
                        this.props.onSelect && this.props.onSelect(index, value)
                    }}>
                    {
                        this.props.isVisible ? <RadioButtonPay Button value="钱包"
                                                               style={{
                                                                   flexDirection: commonStyle.reverse,
                                                                   justifyContent: commonStyle.between,
                                                                   alignItems: commonStyle.center,
                                                               }}>
                            <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                                <Image
                                    source={images.pay_wallet}
                                    resizeMode='contain'
                                    style={{width: 28, height: 28}}
                                />
                                <Label size='md' type='title' text='钱包' style={{marginLeft: commonStyle.marginLeft}}/>
                            </View>
                        </RadioButtonPay> : <View/>
                    }
                    <RadioButtonPay Button value="支付宝"
                                    style={{
                                        flexDirection: commonStyle.reverse,
                                        justifyContent: commonStyle.between,
                                        alignItems: commonStyle.center,
                                    }}>
                        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                            <Image
                                source={images.pay_ali_pay}
                                resizeMode='contain'
                                style={{width: 28, height: 28}}
                            />
                            <Label size='md' type='title' text='支付宝' style={{marginLeft: commonStyle.marginLeft}}/>
                        </View>
                    </RadioButtonPay>
                    <RadioButtonPay Button value="微信"
                                    style={{
                                        flexDirection: commonStyle.reverse,
                                        justifyContent: commonStyle.between,
                                        alignItems: commonStyle.center,
                                    }}>
                        <View style={{
                            flexDirection: commonStyle.row,
                            alignItems: commonStyle.center,
                        }}>
                            <Image
                                source={images.pay_we_chat}
                                resizeMode='contain'
                                style={{width: 28, height: 28}}
                            />
                            <Label size='md' type='title' text='微信' style={{marginLeft: commonStyle.marginLeft}}/>
                        </View>
                    </RadioButtonPay>
                </RadioGroupPay>
            </View>
        )
    }
}
