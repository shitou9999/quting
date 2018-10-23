/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, ScrollView,} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Input, ListRow, Button, Overlay, Label, Toast} from "../../components/teaset/index"
import {BaseContainer} from "../../components/base/index"
import {homeAction} from '../../actions/index'
import {commonStyle} from '../../constants/commonStyle'
import {DateUtil,LoadingUtils} from '../../utils/index'


class ParkingOrderPage extends Component {

    constructor(props) {
        super(props);
        this.parkingBen = {}
    }

    componentDidMount() {
        this.parkingBen = this.props.navigation.getParam('parkingBen')
        this._getRequestParkingPre()
    }


    _getRequestParkingPre = () => {
        let userId = this.props.login.user.id
        let chargeStartTime = this.parkingBen.chargeStartTime
        let date = DateUtil.formt(chargeStartTime, 'yyyyMMddhhmmss')
        let payMoney = this.parkingBen.payMoney
        let params = {
            parkingRecordCode: this.parkingBen.recordCode,
            userId: userId,
            plate: this.parkingBen.plate,
            plateColor: this.parkingBen.plateColor,
            parkingTime: this.parkingBen.time,
            startTime: date,
            receivableFee: payMoney * 100,//分
        }
        this.props.homeAction.getRequestParkingPre(params)
    }

    /**
     * 道路-生成业务订单
     * @returns
     */
    _createRoadBusiness = () => {
        let recordCode = this.parkingBen.recordCode
        LoadingUtils.show()
        this.props.homeAction.createRoadBusiness(this.props.login.user.id, recordCode)
            .then(response => {
                LoadingUtils.hide()
                if (response.result) {
                    Toast.message('生成业务订单成功')
                    let data = response.data
                    this.props.navigation.navigate('ParkingPayPage', {
                        boPostpaidCode: data.boPostpaidCode,//后付费业务订单编号,
                        payMoney: data.payMoney,//元
                        recordCode: this.parkingBen.recordCode,
                    })
                } else {
                    Toast.message('生成业务订单失败')
                }
            })
    }

    render() {
        const {home} = this.props
        let alreadyPayMoney = this.parkingBen.alreadPayMoney
        let parkingTime = home.bo_pre_dto.parkingTime
        //返回undefined时字符串拼接直接显示undefined
        let payFee = home.bo_pre_dto.payFee === undefined ? 0 : home.bo_pre_dto.payFee
        let payFeeYuan = payFee / 100
        return (
            <BaseContainer title={'停车订单'}>
                <ScrollView style={styles.container}>
                    <View>
                        <View
                            style={{
                                marginTop: commonStyle.marginTop,
                                marginLeft: 5,
                                marginBottom: commonStyle.marginBottom
                            }}>
                            <Label size='md' type='detail' text='停车信息'/>
                        </View>
                        <ListRow title='停车点' detail={<Label text={this.parkingBen.name} type='title'/>}
                                 topSeparator='full'/>
                        <ListRow title='车牌号码' detail={<Label text={this.parkingBen.plate} type='title'/>}
                                 topSeparator='full'/>
                        <ListRow title='计费开始时间'
                                 detail={<Label text={home.bo_pre_dto.chargeStartTime} type='title'/>}
                                 topSeparator='full'/>
                        <ListRow title='计费时长'
                                 detail={<Label text={DateUtil.goMilliSecondToDate(parkingTime)} type='title'/>}
                                 topSeparator='full'/>
                        <View
                            style={{
                                marginTop: commonStyle.marginTop,
                                marginLeft: 5,
                                marginBottom: commonStyle.marginBottom
                            }}>
                            <Label size='md' type='detail' text='收费信息'/>
                        </View>
                        <ListRow title='停车费' detail={<Label text={`${payFeeYuan}元`} type='title'/>}
                                 topSeparator='full'/>
                        <ListRow title='优惠券' detail={<Label text={`${home.coupons.length}张可用`} type='title'/>}
                                 topSeparator='full' onPress={() => {

                        }}/>
                        <ListRow title='已付金额' detail={<Label text={`${alreadyPayMoney}元`} type='title'/>}
                                 topSeparator='full'/>
                        <ListRow title='应付金额'
                                 detail={<Label text={`${payFeeYuan}元`} type='title'/>}
                                 topSeparator='full'/>
                    </View>
                </ScrollView>
                <Button title="提交订单"
                        size='lg'
                        style={{margin: commonStyle.margin}}
                        onPress={this._createRoadBusiness}
                        type='primary'/>
            </BaseContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me,
    home: state.home
})

const dispatchAction = (dispatch) => ({
    homeAction: bindActionCreators(homeAction, dispatch),
})

export default connect(mapState, dispatchAction)(ParkingOrderPage)
