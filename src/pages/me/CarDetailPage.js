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
} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import ListRow from 'teaset/components/ListRow/ListRow'
import ImageView from '../../components/ImageView'
import TitleBar from "../../components/TitleBar"

import {commonStyle} from '../../constants/commonStyle'
import * as Constants from '../../constants/Constants'
import * as ViewUtil from '../../utils/ViewUtil'


class CarDetailPage extends Component {

    constructor(props) {
        super(props);
        this.itemCar = {}
        this.state = {
            storageArr: [],
        }
    }

    componentDidMount() {
        this.itemCar = this.props.navigation.getParam('itemCar')
        gStorage.getAllDataForKey('PLATE+COLOR', status => {
            this.setState({
                storageArr: status
            })
        });
    }

    render() {
        const {navigation} = this.props
        let loadUrl = Constants.loadUrl
        let tempArr = this.state.storageArr || []
        return (
            <View style={styles.rootView}>
                <TitleBar title={'车辆详情'} navigation={this.props.navigation}/>
                <ListRow
                    style={{height: commonStyle.bottomBtnHeight}}
                    title='车牌号'
                    detail={this.itemCar.plate}
                    onPress={() => {

                    }}
                    bottomSeparator='full'/>
                <ListRow
                    style={{height: commonStyle.bottomBtnHeight}}
                    title='车牌颜色'
                    detail={ViewUtil.getValue(tempArr, this.itemCar.plateColor, '***')}
                    onPress={() => {

                    }}
                    bottomSeparator='full'/>
                <ListRow
                    style={{height: commonStyle.bottomBtnHeight}}
                    title='车主姓名'
                    detail={this.itemCar.owenerName}
                    bottomSeparator='full'/>
                <ListRow
                    style={{height: commonStyle.bottomBtnHeight}}
                    title='车架号'
                    detail={this.itemCar.vehNo}
                    bottomSeparator='full'/>
                <ListRow
                    style={{height: commonStyle.bottomBtnHeight}}
                    title='行驶证照片'
                    bottomSeparator='full'/>
                <ImageView
                    source={{uri: `${loadUrl}${this.itemCar.panorama}`}}
                    placeholderSource={require('../../assets/images/me_car_empty.png')}
                    style={{width: 88, height: 88, marginLeft: commonStyle.marginLeft - 5, marginTop: 5}}
                />
                <ListRow
                    style={{height: commonStyle.bottomBtnHeight}}
                    title='车辆全景照片'
                    bottomSeparator='full'/>
                <ImageView
                    source={{uri: `${loadUrl}${this.itemCar.drivingLic}`}}
                    placeholderSource={require('../../assets/images/me_car_empty.png')}
                    style={{width: 88, height: 88, marginLeft: commonStyle.marginLeft - 5, marginTop: 5}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        backgroundColor: commonStyle.white
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

export default connect(mapState, dispatchAction)(CarDetailPage)
