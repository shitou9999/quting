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
import {Input, ListRow, Button, Overlay, Label, Toast} from "../../components/teaset/index"
import {commonStyle} from '../../constants/commonStyle'
import {ViewUtil} from "../../utils/index"
import {TitleBar} from "../../components/base/index"
import * as Constants from '../../constants/Constants'

class SwitchCarPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            parkingList: []
        }
    }

    componentDidMount() {
        this.state.parkingList = this.props.navigation.getParam('parkingList')
        this.setState({parkingList: this.state.parkingList})
    }

    _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity onPress={this.itemClick.bind(this, item, index)}>
                <View
                    style={{
                        height: 50,
                        alignItems: commonStyle.center,
                        flexDirection: commonStyle.row,
                        backgroundColor: commonStyle.white,
                        padding: commonStyle.padding
                    }}>
                    {ViewUtil.renderPlate(item.plateColor)}
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
        DeviceEventEmitter.emit(Constants.Emitter_SELECT_REFRESH, item)
        this.props.navigation.goBack()
    }

    // 这里指定使用数组下标作为唯一索引
    _keyExtractor = (item, index) => index.toString()

    render() {
        return (
            <View>
                <TitleBar title={'选择车辆'}/>
                <FlatList
                    ref={(flatList) => this._flatList = flatList}
                    ItemSeparatorComponent={this._separator}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    data={this.state.parkingList}>
                </FlatList>
            </View>
        );
    }

    _separator = () => {
        return <View style={{height: gLine.minLine, backgroundColor: commonStyle.lineColor}}/>;
    }
}


const mapState = (state) => ({
    // isLoginLable: state.user.isLoginLable,
})

const dispatchAction = (dispatch) => ({
    // login: (user, pwd) => dispatch(userActions.login(user, pwd))
    // loginAction: bindActionCreators(loginActions, dispatch),
})

export default connect(mapState, dispatchAction)(SwitchCarPage)
