/**
 * Created by PVer on 2018/7/14.
 */
/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert
} from 'react-native';
import ListRow from 'teaset/components/ListRow/ListRow';
import MeStyle from '../../assets/styles/MeStyle';
//设置
class SettingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.rootView}>
                <ListRow
                    style={MeStyle.listRow}
                    title='修改登录密码'
                    onPress={() => {
                        navigation.navigate('ModifyPwdPage');
                    }}
                    bottomSeparator='full'/>
                <ListRow
                    style={MeStyle.listRow}
                    title='自动付费说明'
                    onPress={() => {
                        navigation.navigate('AutoExplainPage');
                    }}
                    bottomSeparator='full'/>
                <ListRow
                    style={MeStyle.listRow}
                    title='关于我们'
                    onPress={() => {
                        Alert.alert('ListRow');
                    }}
                    bottomSeparator='full'/>
                <ListRow
                    style={[MeStyle.listRow, {marginTop: 10}]}
                    title='退出登陆'
                    onPress={() => {
                        Alert.alert('退出登录');
                    }}
                    bottomSeparator='full'/>
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

export default SettingPage;