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
    ScrollView
} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Toast from 'teaset/components/Toast/Toast'
import Label from 'teaset/components/Label/Label'
import ListRow from 'teaset/components/ListRow/ListRow'
import Button from 'teaset/components/Button/Button'
import Input from 'teaset/components/Input/Input'

import * as HttpUtil from '../../net/HttpUtils'
import {commonStyle} from '../../constants/commonStyle'
import * as Constants from '../../constants/Constants'

/**
 * 车辆认证
 */
class CarApprovalPage extends Component {

    constructor(props) {
        super(props);
        this.itemCar = {}
        this.state = {
            owenerName: '',
            vehNo: '',
            drivingLic: '',
            panorama: ''
        }
    }

    componentDidMount() {
        this.itemCar = this.props.navigation.getParam('itemCar')
        this.setState({
            owenerName: this.itemCar.owenerName,
            vehNo: this.itemCar.vehNo,
            drivingLic: this.itemCar.drivingLic,
            panorama: this.itemCar.panorama,
        })
    }

    /**
     * 申请认证
     * @private
     */
    _getRequestCarApproval = () => {
        let service = '/vehicle/approval'
        const {login} = this.props
        let params = {
            "userId": login.user.id,
            "plate": this.itemCar.plate,
            "plateColor": this.itemCar.plateColor,
            "owenerName": this.state.owenerName,
            "vehNo": this.state.vehNo,
            "drivingLic": this.state.drivingLic,//行驶证
            "panorama": this.state.panorama,// 全景图片
        }
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('申请认证成功');
                } else {
                    Toast.message(json.msg)
                }
            })
            .catch(err => {
            })
    };

    render() {
        const {navigation} = this.props
        let loadUrl = Constants.loadUrl
        return (
            <View style={styles.rootView}>
                <ScrollView
                    ref={(scroll) => this._scroll = scroll}
                    keyboardDismissMode='on-drag'
                    keyboardShouldPersistTaps='never'
                    showsVerticalScrollIndicator={true}
                    scrollEnabled={true}
                    pagingEnabled={true}
                    horizontal={false}
                    style={{flex: 1}}
                    onScroll={(e) => {
                        console.warn('onScroll');
                    }}>
                    <View>
                        <ListRow title='车牌号'
                                 detail={ this.itemCar.plate}
                                 titlePlace='left'/>
                        <ListRow title='车牌类型'
                                 detail={ '蓝色'}
                                 titlePlace='left'/>
                    </View>

                    <View style={{marginLeft: 10}}>
                        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, height: 50,}}>
                            <Label text='车主姓名' size='md' type='title'/>
                            <Input
                                style={styles.input}
                                size='lg'
                                value={this.state.owenerName}
                                placeholder='请输入车主姓名'
                                onChangeText={text => this.setState({ownerName: text})}
                            />
                        </View>
                        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, height: 50,}}>
                            <Label text='车架号' size='md' type='title'/>
                            <Input
                                style={styles.input}
                                size='lg'
                                value={this.state.vehNo}
                                placeholder='请输入车架号后六位数'
                                onChangeText={text => this.setState({vehNo: text})}
                            />
                        </View>
                        <View style={{height: 50, justifyContent: commonStyle.center}}>
                            <Label text='行驶证照片' size='md' type='title'/>
                        </View>
                        <Image source={{uri: `${loadUrl}${this.state.panorama}`}}
                               defaultSource={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                               style={{width: 88, height: 88, marginLeft: commonStyle.marginLeft - 5}}
                        />
                        <View style={{height: 50, justifyContent: commonStyle.center}}>
                            <Label text='行驶证全景照片' size='md' type='title'/>
                        </View>
                        <Image source={{uri: `${loadUrl}${this.state.drivingLic}`}}
                               defaultSource={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                               style={{width: 88, height: 88, marginLeft: commonStyle.marginLeft - 5}}
                        />
                    </View>
                </ScrollView>
                <Button title="确 认"
                        size='lg'
                        style={{margin: commonStyle.margin}}
                        onPress={() => {
                            this._getRequestCarApproval()
                        }}
                        type='primary'/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rootView: {
        backgroundColor: commonStyle.white,
        flex: 1
    },
    input: {
        flex: 1,
        height: 50,
        borderColor: commonStyle.white,
        borderRadius: 0,
        marginTop: 5,
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

export default connect(mapState, dispatchAction)(CarApprovalPage)