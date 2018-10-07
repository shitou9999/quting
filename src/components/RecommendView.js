import React, {Component} from 'react';
import {Platform, StyleSheet, TouchableWithoutFeedback, View, Image} from 'react-native';
import PropTypes from 'prop-types'
import Label from 'teaset/components/Label/Label'
import Button from 'teaset/components/Button/Button'
import {commonStyle} from "../constants/commonStyle"

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
            <TouchableWithoutFeedback onPress={() => {
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
                    <View style={{flexDirection: commonStyle.row}}>
                        <Label text={'ss2'}/>
                        <Label text={this.props.name}/>
                    </View>
                    <Button title={'推荐'} size={'sm'}/>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

export default RecommendView