import {Component} from "react";
import {commonStyle} from "../constants/commonStyle";
import {Text, View} from "react-native";
import Button from "teaset/components/Button/Button";
import React from "react";
import PropTypes from 'prop-types'

class ShowUserDialogView extends Component {

    static propTypes = {
        title: PropTypes.string,
        content: PropTypes.string.isRequired,
        noText: PropTypes.string,
        yesText: PropTypes.string,
        clickYes: PropTypes.func,
        clickNo: PropTypes.func,
    }

    static defaultProps = {
        title: '注意',
        content: '',
        noText: '取消',
        yesText: '确定'
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
                        backgroundColor: commonStyle.themeColor,
                        height: 50,
                        width: 260,
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                        justifyContent: commonStyle.center,
                        alignItems: commonStyle.center
                    }}>
                    <Text style={{fontSize: 20}}>{this.props.title}</Text>
                </View>
                <View
                    style={{
                        height: 50,
                        alignItems: commonStyle.center,
                        justifyContent: commonStyle.center
                    }}>
                    <Text>{this.props.content}</Text>
                </View>
                <View style={{flexDirection: commonStyle.row, height: 50}}>
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
                </View>
            </View>
        )
    }

}

export default ShowUserDialogView
