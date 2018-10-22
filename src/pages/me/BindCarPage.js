/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    ScrollView,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Input, ListRow, Button, Overlay, Label, Toast} from "../../components/teaset/index"
import {VehicleKeyBordView} from '../../components'
import {commonStyle} from '../../constants/commonStyle'
import {BeeUtil, Loading, ElementaryArithmeticUtils} from '../../utils/index'
import {userAction, meAction} from '../../actions/index'
import {Constants} from '../../constants/index'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {TitleBar, LoadingModal} from "../../components/base/index"

class BindCarPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            plate: '',
            plateColor: '蓝',
            province: '浙',
        }
        this.items = [];
        Object.assign(this.state, {
            selectedIndex: 0,
        });
    }

    componentDidMount() {
        this._getRequestDictionary()
    }

    _getRequestDictionary = () => {
        gStorage.getAllDataForKey('PLATE+COLOR', results => {
            this.items = results.map((item, index) => {
                let tempData = {}
                tempData.key = item.key
                tempData.value = item.value
                return tempData
            })
        });
    }

    _getRequestBindCar = () => {
        let tempPlate = this.state.plate
        if (BeeUtil.isEmpty(tempPlate)) {
            Toast.message('请选择车牌')
            return
        }
        const {login, me} = this.props
        Loading.showLoading()
        this.props.userAction.toRequestBindCar(login.user.id, this.state.plate, this.state.selectedIndex)
            .then(response => {
                Loading.disLoading()
                if (response.result) {
                    DeviceEventEmitter.emit(Constants.Emitter_BIND_REFRESH, '999')
                    let num = me.user_info.vehicleNum
                    let carNum = ElementaryArithmeticUtils.add(Number(num), 1)
                    this.props.meAction.toBindCar(Number(carNum))
                    this.props.navigation.goBack()
                }
            })
    }

    _cancelBt = () => {
        this.overlayPopView && this.overlayPopView.close()
    }

    _sureBt = (inputValue) => {
        let tempValue = '浙'
        if (BeeUtil.isNotEmpty(inputValue)) {
            tempValue = inputValue.substring(0, 1)
        }
        this.setState({
            plate: inputValue,
            province: tempValue
        })
        this.overlayPopView && this.overlayPopView.close()
    }

    _showVehicleKeyBordView = (type, modal, text) => {
        let overlayView = (
            <Overlay.PopView
                ref={v => this.overlayPopView = v}
                style={{alignItems: commonStyle.center, justifyContent: commonStyle.center}}
                type={type}
                modal={modal}>
                <View style={{width: 300, height: 400, backgroundColor: commonStyle.white}}>
                    {/*车牌绑定*/}
                    <VehicleKeyBordView cancelBt={this._cancelBt} sureBt={this._sureBt}/>
                </View>
            </Overlay.PopView>
        );
        Overlay.show(overlayView);
    }

    _selectTypePop = (type, modal, text) => {
        let overlayView = (
            <Overlay.PopView
                ref={v => this.overlayPopView = v}
                style={{alignItems: commonStyle.center, justifyContent: commonStyle.center}}
                type={type}
                modal={modal}>
                <View
                    style={{backgroundColor: commonStyle.white, minWidth: 260, minHeight: 300, borderRadius: 5}}>
                    <FlatList
                        ref={(flatList) => this._flatList = flatList}
                        ItemSeparatorComponent={this._separator}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        data={this.items}>
                    </FlatList>
                </View>
            </Overlay.PopView>
        );
        Overlay.show(overlayView);
    }

    itemClick(item, index) {
        this.setState({
            plateColor: item.value,
            selectedIndex: item.key
        })
        this.overlayPopView && this.overlayPopView.close()
    }

    _renderItem = ({item, index}) => {
        let selectIndex = this.state.selectedIndex
        {/*onPress={this._itemPress(item, index)}>*/
        }
        const selectItem = selectIndex === item.key
        let selectStyle = {}
        if (selectItem) {
            selectStyle = {
                color: 'red'
            }
        } else {
            selectStyle = {
                color: '#000'
            }
        }
        return (
            <TouchableOpacity key={index}
                              onPress={this.itemClick.bind(this, item, index)}>
                <View style={styles.selectStyle}>
                    <Label size='md' type='title' text={item.value} style={selectStyle}/>
                </View>
            </TouchableOpacity>
        )
    }

    _separator = () => {
        return <View style={{height: commonStyle.lineHeight, backgroundColor: commonStyle.gray}}/>
    }

    _keyExtractor = (item, index) => index.toString();

    render() {
        return (
            <View>
                <TitleBar title={'车辆绑定'}/>
                <View style={{
                    justifyContent: commonStyle.center,
                    alignItems: commonStyle.center,
                    marginTop: commonStyle.marginTop
                }}>
                    <Label text='请确定车辆信息真是有效,否则无法进行电子支付或领券哦' size='md' type='detail'/>
                </View>
                <TouchableOpacity onPress={() => {
                    this._showVehicleKeyBordView('zoomIn', false, '')
                }}>
                    <View style={[styles.borderStyle, styles.inputStyle]}>
                        <Label text={this.state.province} size='md' type='title'/>
                        <FontAwesome name={'angle-down'} size={30} color={commonStyle.iconGray}/>
                        <Label text={this.state.plate} size='md' type='title'/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this._selectTypePop()
                }}>
                    <View style={[styles.borderStyle, styles.inputStyle, {justifyContent: commonStyle.between,}]}>
                        <Label text='车牌类型' size='md' type='title'/>
                        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                            <Label text={this.state.plateColor} size='md' type='title'/>
                            <FontAwesome name={'angle-down'} size={30} color={commonStyle.iconGray}/>
                        </View>
                    </View>
                </TouchableOpacity>

                <Button title="确 认"
                        size='lg'
                        style={{
                            marginTop: 50,
                            marginLeft: commonStyle.marginLeft,
                            marginRight: commonStyle.marginRight
                        }}
                        onPress={() => {
                            this._getRequestBindCar()
                        }}
                        type='primary'/>
                <LoadingModal ref={ref => global.loading = ref}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        height: 50,
        borderColor: commonStyle.white,
        borderRadius: 0,
        marginTop: 5,
    },
    textStyle: {
        marginLeft: commonStyle.marginLeft,
        marginRight: commonStyle.marginRight,
        marginTop: commonStyle.marginTop
    },
    borderStyle: {
        borderRadius: 5,
        borderColor: commonStyle.gray,
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: commonStyle.white
    },
    inputStyle: {
        flexDirection: commonStyle.row,
        marginLeft: 25,
        marginRight: 25,
        marginTop: 20,
        height: 50,
        alignItems: commonStyle.center,
        paddingLeft: commonStyle.padding,
        paddingRight: commonStyle.padding,
    },
    selectStyle: {
        height: 50,
        marginLeft: commonStyle.marginLeft,
        marginRight: commonStyle.marginRight,
        flexDirection: commonStyle.row,
        alignItems: commonStyle.center,
        justifyContent: commonStyle.center
    }
});

const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me,
})

const dispatchAction = (dispatch) => ({
    userAction: bindActionCreators(userAction, dispatch),
    meAction: bindActionCreators(meAction, dispatch),
})

export default connect(mapState, dispatchAction)(BindCarPage)
