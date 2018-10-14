/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image, TouchableOpacity,} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Input, ListRow, Button, Overlay, Label, Toast} from "../../components/teaset/index"
import {CouponView} from '../../components'
import {commonStyle} from '../../constants/commonStyle'
import {SFListView, TitleBar, EmptyView} from "../../components/base"
import {images} from "../../assets"
import userAction from "../../actions/user"

class CouponPage extends Component {

    constructor(props) {
        super(props);
        this.start = 0
        this.state = {}
    }

// let allData = json.data;
//                     let newData = []
//                     newData = allData;
//                     startFetch(newData, pageLimit);
    componentDidMount() {
        this._onRefresh()
    }

    _onRefresh = () => {
        this.props.userAction.getCouponList(this.props.login.user.id, this.start, 10)
            .then(response => {
                if (response.result) {
                    this.listView.setRefreshing(false)
                    this.listView.setData(response.data)
                } else {
                    this.listView.setRefreshing(false)
                }
            })
    }


    _onEndReached = () => {
        this.props.userAction.getCouponList(this.props.login.user.id, this.start, 10)
            .then(response => {
                if (response.result) {
                    this.start += 10
                    this.listView.addData(response.data)
                }
            })
    }

    renderItem = (item) => {
        let data = item.item
        let index = item.index
        return (
            <CouponView couponCode={data.couponCode}
                        couponType={data.couponType}
                        couponFee={data.couponFee}
                        validTime={data.validTime}
                        invalidTime={data.invalidTime}
                        rangeName={data.rangeName}/>
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <TitleBar title={'优惠券'}/>
                <TouchableOpacity onPress={() => {
                    Toast.message('该功能暂未开放')
                }}>
                    <View
                        style={{
                            flexDirection: commonStyle.row,
                            justifyContent: commonStyle.center,
                            alignItems: commonStyle.center,
                            backgroundColor: commonStyle.white,
                            margin: commonStyle.margin - 5,
                            borderRadius: 5,
                            height: 50
                        }}>
                        <Image source={images.me_coupon_get}
                               resizeMode='contain'
                               style={{width: 20, height: 20}}
                        />
                        <Label size='md' type='title' text='领取优惠券' style={{marginLeft: 5}}/>
                    </View>
                </TouchableOpacity>

                <SFListView
                    ref={ref => {
                        this.listView = ref
                    }}
                    showBackGround={true}
                    renderItem={this.renderItem}
                    onRefresh={this._onRefresh}
                    onLoad={this._onEndReached}/>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('CouponHisPage')
                }}>
                    <View style={{
                        flexDirection: commonStyle.row,
                        height: 30,
                        alignItems: commonStyle.center,
                        justifyContent: commonStyle.around,
                    }}>
                        <View style={{
                            height: 1,
                            width: 130,
                            backgroundColor: commonStyle.lightGray,
                            marginRight: commonStyle.marginRight,
                        }}/>
                        <Label size='md' type='detail' text='点击查看失效优惠券'/>
                        <View style={{
                            height: 1,
                            width: 130,
                            backgroundColor: commonStyle.lightGray,
                            marginLeft: commonStyle.marginLeft
                        }}/>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    _renderEmptyView = () => {
        return <EmptyView/>
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me,
})

const dispatchAction = (dispatch) => ({
    userAction: bindActionCreators(userAction, dispatch),
})

export default connect(mapState, dispatchAction)(CouponPage)
