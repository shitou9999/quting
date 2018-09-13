/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    Image,
    FlatList,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Label from 'teaset/components/Label/Label'
import {commonStyle} from '../../constants/commonStyle'

class SwitchCarPage extends Component {

    constructor(props) {
        super(props);
        this.parkingList = []
        this.state = {}
    }

    _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity onPress={this.itemClick.bind(this, item, index)}>
                <View
                    style={{height:40,alignItems:commonStyle.center,flexDirection:commonStyle.row,backgroundColor:commonStyle.white,padding:commonStyle.padding}}>
                    <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                           style={{width: 20, height: 20, marginRight:10}}
                    />
                    <Label size='md' type='title' text={item.plate}/>
                </View>
            </TouchableOpacity>
        )
    }

    /**
     * 使用箭头函数防止不必要的re-render；
     * 如果使用bind方式来绑定onPressItem，每次都会生成一个新的函数，导致props在===比较时返回false，
     * 从而触发自身的一次不必要的重新render，也就是FlatListItem组件每次都会重新渲染。
     */
    itemClick(item, index) {
        DeviceEventEmitter.emit('refresh', item)
        this.props.navigation.goBack()
    }

    // 这里指定使用数组下标作为唯一索引
    _keyExtractor = (item, index) => index;

    render() {
        const {navigation} = this.props;
        this.parkingList = navigation.getParam('parkingList')
        return (
            <View style={styles.container}>
                <FlatList
                    ref={(flatList)=>this._flatList = flatList}
                    ItemSeparatorComponent={this._separator}
                    renderItem={this._renderItem}
                    keyExtractor={ this._keyExtractor }
                    data={this.parkingList}>
                </FlatList>
            </View>
        );
    }

    _separator = () => {
        return <View style={{height:gLine.minLine,backgroundColor:commonStyle.lineColor}}/>;
    }
}

const styles = StyleSheet.create({
    container: {},
});

const mapState = (state) => ({
    // isLoginLable: state.user.isLoginLable,
});

const dispatchAction = (dispatch) => ({
    // login: (user, pwd) => dispatch(userActions.login(user, pwd))
    // loginAction: bindActionCreators(loginActions, dispatch),
});

export default connect(mapState, dispatchAction)(SwitchCarPage)