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
    TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {CouponView} from '../../components'
import {userAction} from '../../actions/index'
import {SFListView, TitleBar} from "../../components/base"
import {images} from "../../assets"

class CouponHisPage extends Component {

    constructor(props) {
        super(props);
        this.start = 0
        this.state = {}
    }


    componentDidMount() {
        this._onRefresh()
    }

    _onRefresh = () => {
        this.props.userAction.getCouponHis(this.props.login.user.id, 0, 10)
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
        this.start += 10
        this.props.userAction.getCouponHis(this.props.login.user.id, this.start, 10)
            .then(response => {
                if (response.result) {
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
                <TitleBar title={'历史优惠券'}/>
                <SFListView
                    ref={ref => {
                        this.listView = ref
                    }}
                    showBackGround={true}
                    showNoDataImage={images.app_card_empty}
                    renderItem={this.renderItem}
                    onRefresh={this._onRefresh}
                    onLoad={this._onEndReached}/>
            </View>
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
})

const dispatchAction = (dispatch) => ({
    userAction: bindActionCreators(userAction, dispatch)
})

export default connect(mapState, dispatchAction)(CouponHisPage)
