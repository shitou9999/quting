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

import BeeUtil from '../../utils/BeeUtil'
import * as HttpUtil from '../../net/HttpUtils'
import {commonStyle} from '../../constants/commonStyle'

class BuyCardNextOnePage extends Component {

    constructor(props) {
        super(props);
        this.flag = false
        this.state = {
            inputName: '',
            bindCar: '请选择绑定车辆',
        }
    }

    componentDidMount() {

    }

    returnData(plate, test) {
        if (BeeUtil.isNotEmpty(plate)) {
            this.flag = true
            this.setState({
                bindCar: plate
            })
        }
    }

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
        const {login} = this.props
        let service = '/card/business_check'
        let params = {
            "userId": login.user.id,
            "plate": this.plate,
            "plateColor": this.plateColor,
            "cardCode": this.cardCode,
            "validTime": this.validTime
        }
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    this.props.navigation.navigate('BuyCardNextTwoPage', {
                        owenerName: this.state.inputName,
                        plate: this.state.bindCar,
                        plateColor: this.state.plateColor,
                        cardCode: this.state.cardCode,
                        validTime: this.state.validTime
                    })
                } else {
                    Toast.message(json.msg)
                }
            })
            .catch()
    }


    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <View style={{flex:1}}>
                    <View
                        style={{
                            flexDirection:commonStyle.row,
                            alignItems:commonStyle.center,
                            backgroundColor:commonStyle.white,
                            marginBottom:commonStyle.marginBottom,
                            paddingLeft:10,
                            height:40}}>
                        <Label size='md' type='title' text='车主姓名'/>
                        <Input
                            style={{flex:1,borderColor: commonStyle.white}}
                            size="lg"
                            placeholder="请输入车主姓名"
                            value={this.state.inputName}
                            onChangeText={text => this.setState({inputName: text})}
                        />
                    </View>
                    <ListRow
                        title='绑定车辆'
                        detail={this.state.bindCar}
                        onPress={() => {
                            navigation.navigate('UserBindCarPage', {returnData: this.returnData.bind(this),fromPage:1});
                    }}
                        bottomSeparator='full'
                        topSeparator='full'/>
                    <ListRow
                        title='生效时间'
                        detail='2018-0-0'
                        onPress={() => {

                    }}
                        bottomSeparator='full'/>
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