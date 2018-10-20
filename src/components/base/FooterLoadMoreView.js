import React, {Component} from "react";
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Image,
    TouchableWithoutFeedback, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types'
import {commonStyle} from "../../constants/commonStyle"

const width = Dimensions.get('window').width;
const defaultColor = "#00AEF3"

export default class FooterLoadMoreView extends Component {


    static defaultProps = {
        // isNoMore: PropTypes.bool,
        footerLoading: PropTypes.bool,
        indicatorColor: PropTypes.string,
        footerText: PropTypes.string,
    }


    static propTypes = {
        // isNoMore: false,
        indicatorColor: defaultColor,
        footerLoading: true
    }


    render() {
        // const {isNoMore} = this.props
        // const title = isNoMore ? '没有更多数据了' : '玩命加载中...'
        return (
            <View style={{
                width: width,
                height: 40,
                flexDirection: commonStyle.row,
                justifyContent: commonStyle.center,
                alignItems: commonStyle.center
            }}>
                {/*{!isNoMore && <ActivityIndicator/>}*/}
                <ActivityIndicator
                    animating={this.props.footerLoading} //是否显示，默认true（显示）
                    color={this.props.indicatorColor}
                    size={'small'}/>
                <Text style={{fontSize: 18, color: commonStyle.black, marginLeft: 5}}>{this.props.footerText}</Text>
            </View>
        )
    }

}
