/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
} from 'react-native';
// import {
//     Button,
// } from 'teaset';
import ListRow from 'teaset/components/ListRow/ListRow';
import ModalIndicator from 'teaset/components/ModalIndicator/ModalIndicator';

export default class MePage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    // Alert.alert('提示', '用户名或密码错误', [{
    //     text: '确定', onPress: () => {
    //     }
    // }], {cancelable: false})
    show() {
        let secs = 3;
        ModalIndicator.show(`Close after ${secs} sec(s)`);
        let timer = setInterval(() => {
            secs--;
            ModalIndicator.show(`Close after ${secs} sec(s)`);
            if (secs < 0) {
                clearInterval(timer);
                ModalIndicator.hide();
            }
        }, 1000);
    }

    render() {
        const {navigation} = this.props;
        return (
            <ScrollView style={styles.scrollView}>
                <View style={styles.rootView}>
                    <ListRow
                        title='停车记录'
                        bottomSeparator="full"
                        icon={require('../assets/images/test.png')}
                        onPress={() => {
                            navigation.navigate('ParkingRecordPage')
                        }}
                    />
                    <ListRow
                        title='我的订单'
                        bottomSeparator="full"
                        icon={require('../assets/images/test.png')}
                        onPress={() => {
                            navigation.navigate('UserOrderPage')
                        }}
                    />
                    <ListRow
                        title='投诉建议'
                        bottomSeparator="full"
                        icon={require('../assets/images/test.png')}
                        onPress={() => {
                            navigation.navigate('ComplaintPage')
                        }}
                    />
                    <ListRow
                        title='客服电话'
                        bottomSeparator="full"
                        icon={require('../assets/images/test.png')}
                        onPress={() => {
                            this.show()
                        }}
                    />
                    <ListRow
                        title='设置'
                        bottomSeparator="full"
                        icon={require('../assets/images/test.png')}
                        onPress={() => {
                            navigation.navigate('SettingPage')
                        }}
                    />
                    <ListRow
                        title='消息'
                        bottomSeparator="full"
                        icon={require('../assets/images/test.png')}
                        onPress={() => {
                            navigation.navigate('MessagePage')
                        }}
                    />
                    <ListRow
                        title='我的钱包'
                        bottomSeparator="full"
                        icon={require('../assets/images/test.png')}
                        onPress={() => {
                            navigation.navigate('UserWalletPage')
                        }}
                    />
                    <ListRow
                        title='明细'
                        bottomSeparator="full"
                        icon={require('../assets/images/test.png')}
                        onPress={() => {
                            navigation.navigate('PayDetailPage')
                        }}
                    />
                    <ListRow
                        title='用户信息'
                        bottomSeparator="full"
                        icon={require('../assets/images/test.png')}
                        onPress={() => {
                            navigation.navigate('UserInfoPage')
                        }}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    rootView: {
        flex: 1,
        flexWrap: 'wrap'
    },
});