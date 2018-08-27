/**
 * Created by PVer on 2018/8/25.
 */
import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Text, TouchableHighlight} from 'react-native';

export default class PasswordInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        }
        this._onPress = this._onPress.bind(this);
    }

    _onPress() {
        this._input.focus();
    }

    render() {
        return (
            <TouchableHighlight onPress={this._onPress} activeOpacity={1} underlayColor='transparent'>
                <View style={[styles.container, this.props.style]}>
                    <TextInput ref={(c) => this._input = c}
                               style={styles.textInputMsg}
                               maxLength={this.props.maxLength}
                               autoFocus={true}
                               caretHidden={true}
                               underlineColorAndroid='transparent' //设置下划线背景色透明 达到去掉下划线的效
                               keyboardType="numeric"
                               onChangeText={(text) => {
                                   this.setState({text: text, contentText: ''});
                                   this.props.onChange(text)
                               }}
                               onEndEditing={() => {
                                   //当文本输入结束后调用此回调函数。
                               }}
                               onSubmitEditing={() => {
                                   //当软键盘的确定/提交按钮被按下的时候调用此函数。如果multiline={true}，此属性不可用。
                                   this.props.onSubmit(this.state.text)
                               }}
                    />
                    {this._getInputItem()}
                </View>
            </TouchableHighlight>
        )

    }

    _getInputItem() {
        let inputItem = [];
        let {text} = this.state;
        for (let i = 0; i < parseInt(this.props.maxLength); i++) {
            if (i == 0) {
                inputItem.push(
                    <View key={i} style={[styles.inputItem, this.props.inputItemStyle]}>
                        {i < text.length ?
                            <View style={[styles.iconStyle, this.props.iconStyle]}>
                            </View> : null}
                    </View>)
            } else {
                inputItem.push(
                    <View key={i}
                          style={[styles.inputItem, styles.inputItemBorderLeftWidth, this.props.inputItemStyle]}>
                        {i < text.length ?
                            <View style={[styles.iconStyle, this.props.iconStyle]}>
                            </View> : null}
                    </View>)
            }
        }
        return inputItem;
    }
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff'
    },
    inputItem: {
        height: 45,
        width: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputItemBorderLeftWidth: {
        borderLeftWidth: 1,
        borderColor: '#ccc',
    },
    iconStyle: {
        width: 16,
        height: 16,
        backgroundColor: '#222',
        borderRadius: 8,
    },
    //TextInput要不可见，
    textInputMsg: {
        height: 1,
        width: 1,
        position: 'absolute',
        color: 'white'
    }
});