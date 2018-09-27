import {PureComponent} from "react";
import {commonStyle} from "../constants/commonStyle";
import {Text, View} from "react-native";
import Button from "teaset/components/Button/Button";
import React from "react";
import PropTypes from 'prop-types'
import PasswordInput from "./PasswordInput";

class ShowPwdDialogView extends PureComponent {

    static propTypes = {
        title: PropTypes.string,
        noText: PropTypes.string,
        yesText: PropTypes.string,
        clickYes: PropTypes.func,
        clickNo: PropTypes.func,
        clickSubmit: PropTypes.func,
        isVisible: PropTypes.bool
    }

    static defaultProps = {
        title: '请输入密码',
        noText: '取消',
        yesText: '确定',
        isVisible: false,
    }


    render() {
        return (
            <View
                style={{
                    backgroundColor: commonStyle.white,
                    minWidth: 260,
                    borderRadius: 5,
                    justifyContent: commonStyle.between,
                    alignItems: commonStyle.center
                }}>
                <View
                    style={{
                        height: 50,
                        width: 260,
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                        justifyContent: commonStyle.center,
                        alignItems: commonStyle.center
                    }}>
                    <Text style={{fontSize: 20}}>{this.props.title}</Text>
                </View>
                <PasswordInput maxLength={6}
                               ref={(c) => this._input = c}
                               style={{marginLeft: commonStyle.marginLeft, marginRight: commonStyle.marginRight}}
                               onChange={(value) => {
                                   console.log('输入的密码：', value)
                               }}
                               onSubmit={(value) => {
                                   console.log('密码为:' + value)
                                   this.props.clickSubmit && this.props.clickSubmit(value)
                               }}
                />
                {
                    this.props.isVisible ? <View style={{flexDirection: commonStyle.row, height: 50}}>
                        <Button title={this.props.noText} type='link'
                                style={{flex: 1}}
                                onPress={() => {
                                    this.props.clickNo && this.props.clickNo()
                                }}/>
                        <Button title={this.props.yesText} type='link'
                                style={{flex: 1}}
                                onPress={() => {
                                    this.props.clickYes && this.props.clickYes()
                                }}/>
                    </View> : <View style={{height: 25}}/>
                }

            </View>
        )
    }

}

export default ShowPwdDialogView
