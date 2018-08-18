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
import ListRow from 'teaset/components/ListRow/ListRow';

import MeStyle from '../../assets/styles/MeStyle';


/**
 * 车辆详情
 */
class CarDetailPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userPlate: '',
            userPlateColor: '',
            userName: '',
            userCarNum: '',
        }
    }

    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         title: navigation.getParam('otherParam', 'A Nested Details Screen'),
    //     };
    // };
    componentWillMount() {

    }

    //在props被改变时更新一些东西
    componentWillReceiveProps(nextProps) {

    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.rootView}>
                <ListRow
                    style={MeStyle.listRow}
                    title='车牌号'
                    detail={this.state.userPlate}
                    onPress={() => {

                    }}
                    bottomSeparator='full'/>
                <ListRow
                    style={MeStyle.listRow}
                    title='车牌颜色'
                    detail={this.state.userPlateColor}
                    onPress={() => {

                    }}
                    bottomSeparator='full'/>
                <ListRow
                    style={MeStyle.listRow}
                    title='车主姓名'
                    detail={this.state.userName}
                    bottomSeparator='full'/>
                <ListRow
                    style={MeStyle.listRow}
                    title='车架号'
                    detail={this.state.userCarNum}
                    bottomSeparator='full'/>
                <ListRow
                    style={MeStyle.listRow}
                    title='行驶证照片'
                    bottomSeparator='full'/>
                <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                       style={{width: 88, height: 88}}
                />
                <ListRow
                    style={MeStyle.listRow}
                    title='车辆全景照片'
                    bottomSeparator='full'/>
                <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                       style={{width: 88, height: 88}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        backgroundColor: '#ff7776',
    },
});

const mapState = (state) => ({
    // isLoginLable: state.user.isLoginLable,
});

const dispatchAction = (dispatch) => ({
    // register: (user, pwd) => dispatch(userActions.register(user, pwd, pwd)),
    // login: (user, pwd) => dispatch(userActions.login(user, pwd))
    // loginAction: bindActionCreators(loginActions, dispatch),
    // userAction: bindActionCreators(userActions, dispatch)
});

export default connect(mapState, dispatchAction)(CarDetailPage)