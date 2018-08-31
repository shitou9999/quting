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
import Label from 'teaset/components/Label/Label'
import Toast from 'teaset/components/Toast/Toast'
import {UltimateListView} from "react-native-ultimate-listview"
import CouponView from '../../components/CouponView'

import * as HttpUtil from '../../net/HttpUtils'


class CouponPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         title: navigation.getParam('otherParam', 'A Nested Details Screen'),
    //     };
    // };
    componentDidMount() {
    }


    /***
     * 查询用户所拥有未失效的优惠券
     * @private
     */
    onFetch = async(page = 1, startFetch, abortFetch) => {
        try {
            let userId = '1100000000029'
            let start = 0
            let pageLimit = 10;
            let service = `/app/member/coupon/list?userId=${userId}&start=${start}&length=10&`;
            HttpUtil.fetchRequest(service, 'GET')
                .then(json => {
                    let allData = json.data;
                    let newData = []
                    newData = allData;
                    startFetch(newData, pageLimit);
                })
                .catch(err => {
                })
        } catch (err) {
            abortFetch();
            console.log(err);
        }
    };

    renderItem = (item, index, separator) => {
        return (
            <CouponView couponCode={item.couponCode}
                        couponType={item.couponType}
                        couponFee={item.couponFee}
                        validTime={item.validTime}
                        invalidTime={item.invalidTime}
                        rangeName={item.rangeName}/>
        )
    }


    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={()=>{
                    Toast.message('该功能暂未开放')
                }}>
                    <View
                        style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'white',borderRadius:5,height:50}}>
                        <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                               style={{width: 20, height: 20}}
                        />
                        <Label size='md' type='title' text='领取优惠券' style={{marginLeft:5}}/>
                    </View>
                </TouchableWithoutFeedback>

                <UltimateListView
                    ref={(ref) => this.flatList = ref}
                    onFetch={this.onFetch}
                    refreshableMode="basic"
                    keyExtractor={(item, index) => `${index} - ${item}`}
                    item={this.renderItem}
                    displayDate
                    arrowImageStyle={{ width: 20, height: 20, resizeMode: 'contain' }}
                    emptyView={this._renderEmptyView}
                />
                <TouchableWithoutFeedback onPress={()=>{
                    navigation.navigate('CouponHisPage')
                }}>
                    <View style={{flexDirection:'row',alignItems:'center',height:30}}>
                        <View style={{height:5}}/>
                        <Label size='md' type='detail' text='点击查看失效优惠券'/>
                        <View style={{height:5}}/>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    _renderEmptyView = () => {
        return <Text>我是没数据</Text>
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
    },
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

export default connect(mapState, dispatchAction)(CouponPage)