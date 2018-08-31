/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, ScrollView,} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Label from 'teaset/components/Label/Label'
import Button from 'teaset/components/Button/Button'
import ListRow from 'teaset/components/ListRow/ListRow'
import Toast from 'teaset/components/Toast/Toast'

import * as HttpUtil from '../../net/HttpUtils'

class BuyCardOrderPage extends Component {

    constructor(props) {
        super(props);
        this.recordCode = ''

    }

    static navigationOptions = ({navigation}) => {
        return {
            recordCode: navigation.getParam('recordCode'),
        }
    };

    componentWillMount() {
        this._getRequestParkingPre()
    }

    _getRequestParkingPre = () => {
        let service = '/pay_parklot/bo/pkin_pre'
        let params = {
            "userId": '1100000000073',
            "recordCode": '1400000000040'
        }
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                    if (json.code === "000000") {
                        console.log(json)
                    } else {
                        Toast.message(json.msg)
                    }
                }
            ).catch()
    }


    _submitOrder = () => {
        // const {navigation} = this.props;
        // navigation.navigate('ParkingPayPage')
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={{flex:1}}>
                <ScrollView style={styles.container}>
                    <View>
                        <View style={{marginBottom:10,marginTop:10,marginLeft:5,marginBottom:10}}>
                            <Label size='md' type='detail' text='月卡信息'/>
                        </View>
                        <ListRow title='月卡编号' detail={<Label text='*******' type='title' />} topSeparator='full'/>
                        <ListRow title='月卡类型' detail={<Label text='*******' type='title' />} topSeparator='full'/>
                        <ListRow title='停车场' detail={<Label text='*******' type='title' />} topSeparator='full'/>
                        <ListRow title='车牌号码' detail={<Label text='*******' type='title' />} topSeparator='full'/>
                        <ListRow title='生效时间' detail={<Label text='*******' type='title' />} topSeparator='full'/>
                        <View style={{marginTop:10,marginBottom:10,marginLeft:5}}>
                            <Label size='md' type='detail' text='收费信息'/>
                        </View>
                        <ListRow title='购买金额' detail={<Label text='0.0元' type='title' />} topSeparator='full'/>
                        <ListRow title='应付金额' detail={<Label text='￥0.0' type='title' />} topSeparator='full'/>
                    </View>
                </ScrollView>
                <Button title="提交订单"
                        size='lg'
                        style={{margin:10}}
                        onPress={this._submitOrder()}
                        type='primary'/>
            </View>
        );
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
});

const dispatchAction = (dispatch) => ({
    // login: (user, pwd) => dispatch(userActions.login(user, pwd))
    // loginAction: bindActionCreators(loginActions, dispatch),
    // userAction: bindActionCreators(userActions, dispatch)
});

export default connect(mapState, dispatchAction)(BuyCardOrderPage)