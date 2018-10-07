/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image, TouchableOpacity,} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Label from 'teaset/components/Label/Label'
import Input from 'teaset/components/Input/Input'
import ListRow from 'teaset/components/ListRow/ListRow'
import Button from 'teaset/components/Button/Button'
import Toast from 'teaset/components/Toast/Toast'
import Overlay from "teaset/components/Overlay/Overlay"
import TitleBar from "../../components/base/TitleBar"
import ShowUserDialogView from "../../components/ShowUserDialogView"
import DateTimePicker from 'react-native-modal-datetime-picker'
import BeeUtil from '../../utils/BeeUtil'
import * as HttpUtil from '../../net/HttpUtils'
import {commonStyle} from '../../constants/commonStyle'
import * as DateUtil from '../../utils/DateUtil'


class BuyCardNextOnePage extends Component {

    constructor(props) {
        super(props);
        this.flag = false
        this.code = 0
        this.price = 0
        this.range = ''
        this.state = {
            inputName: '',
            plate: '请选择绑定车辆',
            plateColor: '0',
            isDateTimePickerVisible: false,
            validTime: '',
        }
    }

    componentDidMount() {
        const {navigation} = this.props
        this.code = navigation.getParam('code')
        this.price = navigation.getParam('price')
        this.range = navigation.getParam('range')
    }

    returnData(plate, plateColor) {
        if (BeeUtil.isNotEmpty(plate)) {
            this.flag = true
            this.setState({
                plate: plate,
                plateColor: plateColor,
            })
        }
    }

    /////////////////////////////////////////////////

    _showDateTimePicker = () => this.setState({isDateTimePickerVisible: true})

    _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false})

    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this.setState({
            validTime: DateUtil.formt(date, 'YYYY-MM-dd'),
        })
        this._hideDateTimePicker();
    };

    //////////////////////////////////////////////////

    // userId (integer): 用户ID,
    // owenerName (string): 车主姓名,
    // plate (string): 车牌号码,
    // plateColor (string): 车牌颜色,
    // cardCode (integer): 卡种类编号,
    // validTime (string): 生效时间：格式：YYYYMMDD
    _userSureNext = () => {
        let tempName = this.state.inputName
        if (BeeUtil.isEmpty(tempName)) {
            Toast.message('请输入车主姓名')
            return
        }
        let tempFlag = this.flag
        if (!tempFlag) {
            Toast.message('请选择绑定车辆')
            return
        }
        this._userCheckTime()
    }

    /**
     * 校验冲突
     * @private
     */
    _userCheckTime = () => {
        let service = '/card/business_check'
        const {login} = this.props
        let tempValidTime = this.state.validTime
        let time = tempValidTime.replace(/-/g, "")
        let params = {
            "userId": login.user.id,
            "plate": this.state.plate,
            "plateColor": this.state.plateColor,
            "cardCode": this.code,
            "validTime": time
        }
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    this.props.navigation.navigate('BuyCardNextTwoPage', {
                        owenerName: this.state.inputName,
                        plate: this.state.plate,
                        plateColor: this.state.plateColor,
                        cardCode: this.code,
                        validTime: this.state.validTime,
                        price: this.price,
                        range: this.range,
                    })
                } else {
                    this._showErrorPop('zoomIn', false, json.msg)
                }
            })
            .catch()
    }


    _showErrorPop = (type, modal, text) => {
        let overlayView = (
            <Overlay.PopView
                ref={v => this.overlayPopView = v}
                style={{alignItems: commonStyle.center, justifyContent: commonStyle.center}}
                type={type}
                modal={modal}>
                <ShowUserDialogView
                    content={text}
                    clickYes={() => {
                        this.overlayPopView && this.overlayPopView.close()
                    }}
                    clickNo={() => {
                        this.overlayPopView && this.overlayPopView.close()
                        this.props.navigation.navigate('BuyCardNextTwoPage', {
                            owenerName: this.state.inputName,
                            plate: this.state.plate,
                            plateColor: this.state.plateColor,
                            cardCode: this.code,
                            validTime: this.state.validTime,
                            price: this.price,
                            range: this.range,
                        })
                    }}/>
            </Overlay.PopView>
        );
        Overlay.show(overlayView)
    }

    render() {
        const {navigation} = this.props
        let date = new Date()
        let date2 = new Date(date)
        date2.setDate(date.getDate() + 30)
        return (
            <View style={styles.container}>
                <TitleBar title={'购买月卡'} navigation={this.props.navigation}/>
                <View style={{flex: 1}}>
                    <View
                        style={{
                            flexDirection: commonStyle.row,
                            alignItems: commonStyle.center,
                            backgroundColor: commonStyle.white,
                            marginBottom: commonStyle.marginBottom,
                            paddingLeft: 10,
                            height: 40
                        }}>
                        <Label size='md' type='title' text='车主姓名'/>
                        <Input
                            style={{flex: 1, borderColor: commonStyle.white}}
                            size="lg"
                            placeholder="请输入车主姓名"
                            value={this.state.inputName}
                            onChangeText={text => this.setState({inputName: text})}
                        />
                    </View>
                    <ListRow
                        title='绑定车辆'
                        detail={this.state.plate}
                        onPress={() => {
                            navigation.navigate('UserBindCarPage', {
                                returnData: this.returnData.bind(this),
                                fromPage: 1
                            });
                        }}
                        bottomSeparator='full'
                        topSeparator='full'/>
                    <ListRow
                        title='生效时间'
                        detail={this.state.validTime}
                        onPress={() => {
                            this._showDateTimePicker()
                        }}
                        bottomSeparator='full'/>
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this._handleDatePicked}
                        onCancel={this._hideDateTimePicker}
                        minimumDate={date}
                        maximumDate={date2}
                    />
                </View>
                <Button title="确 认"
                        size='lg'
                        style={styles.btStyle}
                        type='primary'
                        onPress={this._userSureNext}/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btStyle: {
        margin: commonStyle.margin
    }
});

const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me,
});

const dispatchAction = (dispatch) => ({
    // login: (user, pwd) => dispatch(userActions.login(user, pwd))
    // loginAction: bindActionCreators(loginActions, dispatch),
});

export default connect(mapState, dispatchAction)(BuyCardNextOnePage)
