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
    TouchableWithoutFeedback,
    DeviceEventEmitter
} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Toast from 'teaset/components/Toast/Toast'
import Label from 'teaset/components/Label/Label'
import Input from 'teaset/components/Input/Input'
import Button from 'teaset/components/Button/Button'
import Overlay from 'teaset/components/Overlay/Overlay'
import VehicleKeyBordView from '../../components/VehicleKeyBordView'

import * as HttpUtil from '../../net/HttpUtils'
import {commonStyle} from '../../constants/commonStyle'
import BeeUtil from '../../utils/BeeUtil'
import BaseContainer from "../../components/BaseContainer"
import Loading from "../../utils/Loading"
import * as userAction from '../../actions/user'

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
        const {login} = this.props
        Loading.showLoading()
        this.props.userAction.toRequestBindCar(login.user.id, this.state.plate, this.state.selectedIndex)
            .then(response => {
                Loading.disLoading()
                if (response.result) {
                    DeviceEventEmitter.emit('bind', '999')
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
        let selectIndex = this.state.selectedIndex;
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
            <TouchableWithoutFeedback key={index}
                                      onPress={this.itemClick.bind(this, item, index)}>
                <View style={styles.selectStyle}>
                    <Label size='md' type='title' text={item.value} style={selectStyle}/>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    _separator = () => {
        return <View style={{height: 1, backgroundColor: commonStyle.gray}}/>;
    }

    _keyExtractor = (item, index) => index.toString();

    render() {
        return (
            <BaseContainer title={'车辆绑定'}>
                <View style={{justifyContent: commonStyle.center, alignItems: commonStyle.center, marginTop: 10}}>
                    <Label text='请确定车辆信息真是有效,否则无法进行电子支付或领券哦' size='md' type='detail'/>
                </View>
                <TouchableWithoutFeedback onPress={() => {
                    this._showVehicleKeyBordView('zoomIn', false, '')
                }}>
                    <View style={[styles.borderStyle, styles.inputStyle]}>
                        <Label text={this.state.province} size='md' type='title'/>
                        <Image source={require('../../assets/images/me_down.png')}
                               resizeMode='contain'
                               style={{width: 15, height: 20}}
                        />
                        <Label text={this.state.plate} size='md' type='title'/>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                    this._selectTypePop()
                }}>
                    <View style={[styles.borderStyle, styles.inputStyle, {justifyContent: commonStyle.between,}]}>
                        <Label text='车牌类型' size='md' type='title'/>
                        <View style={{flexDirection: 'row'}}>
                            <Label text={this.state.plateColor} size='md' type='title'/>
                            <Image source={require('../../assets/images/me_down.png')}
                                   resizeMode='contain'
                                   style={{width: 15, height: 20}}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>

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
            </BaseContainer>
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
        paddingLeft: 10,
        paddingRight: 10,
    },
    selectStyle: {
        height: 50,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: commonStyle.row,
        alignItems: commonStyle.center,
        justifyContent: commonStyle.center
    }
});

const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me,
});

const dispatchAction = (dispatch) => ({
    userAction: bindActionCreators(userAction, dispatch),
});

export default connect(mapState, dispatchAction)(BindCarPage)
