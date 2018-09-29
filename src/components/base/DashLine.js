/**
 * Created by cyh on 2018/8/27.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';

/*水平方向的虚线
 * len 虚线个数
 * width 总长度
 * backgroundColor 背景颜色
 * */
export default class DashLine extends Component {
    render() {
        var len = this.props.len;
        var arr = [];
        for (let i = 0; i < len; i++) {
            arr.push(i);
        }
        return <View style={{flexDirection:this.props.flexDirection,width: this.props.width,height:this.props.height}}>
            {
                arr.map((item, index) => {
                    return <Text style={[styles.dashItem, {backgroundColor: this.props.backgroundColor}]}
                                 key={'dash' + index}> </Text>
                })
            }
        </View>
    }
}
const styles = StyleSheet.create({
    dashLine: {
        flexDirection: 'column',
    },
    dashItem: {
        height: 1,
        width: 2,
        marginRight: 2,
        marginTop: 2,
        flex: 1,
    }
})
