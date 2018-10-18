import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, StatusBar} from 'react-native';
import PropTypes from 'prop-types'
import {Input, ListRow, Button, Overlay, Label, Toast} from "../components/teaset/index"
import {commonStyle} from "../constants/commonStyle"
import EvilIcons from "react-native-vector-icons/EvilIcons"

class DynamicSearchView extends Component {

    static propTypes = {
        placeholder: PropTypes.string,
        submitEditing: PropTypes.func,
        clickSearch: PropTypes.func,
    }

    static defaultProps = {
        placeholder: '搜索',
    }

    state = {
        valueCustom: ''
    }

    render() {
        return (
            <View style={{
                height: 40,
                backgroundColor: commonStyle.white,
                flexDirection: commonStyle.row,
                borderRadius: 5,
                margin: 5,
                alignItems: commonStyle.center,
            }}>
                <Input
                    style={{
                        flex: 1,
                        backgroundColor: commonStyle.white,
                        borderColor: commonStyle.white,
                        color: commonStyle.black,
                        textAlign: 'center'
                    }}
                    placeholder={this.props.placeholder}
                    underlineColorAndroid={commonStyle.clear}
                    value={this.state.valueCustom}
                    onChangeText={text => this.setState({valueCustom: text})}
                    onSubmitEditing={() => {
                        this.props.submitEditing && this.props.submitEditing(this.state.valueCustom)
                    }}
                />
                <TouchableOpacity onPress={() => {
                    this.props.clickSearch && this.props.clickSearch(this.state.valueCustom)
                }}>
                    <EvilIcons name={'search'} size={30} color={commonStyle.themeColor}/>
                </TouchableOpacity>
            </View>
        )
    }

}


export default DynamicSearchView
