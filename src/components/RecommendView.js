import React, {Component} from 'react';
import {Platform, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import PropTypes from 'prop-types'
import {Input, ListRow, Button, Overlay, Label, Toast} from "../components/teaset/index"
import {commonStyle} from "../constants/commonStyle"
import Feather from 'react-native-vector-icons/Feather'

class RecommendView extends Component {

    static propTypes = {
        name: PropTypes.string,
        location: PropTypes.object,
        recommendClick: PropTypes.func
    }

    static defaultProps = {
        name: '暂无推荐'
    }


    render() {
        return (
            <TouchableOpacity onPress={() => {
                this.props.recommendClick && this.props.recommendClick()
            }}>
                <View style={{
                    height: 40,
                    backgroundColor: commonStyle.white,
                    flexDirection: commonStyle.row,
                    justifyContent: commonStyle.between,
                    alignItems: commonStyle.center,
                    paddingLeft: commonStyle.padding,
                    paddingRight: commonStyle.padding
                }}>
                    <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                        <Text style={{
                            borderRadius: 3,
                            backgroundColor: commonStyle.themeColor,
                            padding: 2,
                            color: commonStyle.white
                        }}>推荐</Text>
                        <Label text={this.props.name}/>
                    </View>

                    <Feather name={'navigation'} size={20} color={commonStyle.iconGray}/>
                </View>
            </TouchableOpacity>
        )
    }
}


export default RecommendView

