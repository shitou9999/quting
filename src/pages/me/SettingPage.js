/**
 * Created by PVer on 2018/7/14.
 */
import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View, Alert,TouchableOpacity} from 'react-native'
import ListRow from 'teaset/components/ListRow/ListRow'
import Label from 'teaset/components/Label/Label'
import MeStyle from '../../assets/styles/MeStyle'
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
                <TouchableOpacity>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        height: 50,
                        marginTop: 10,
                        alignItems: 'center'
                    }}>
                        <Label size='md' type='title' text='退出登陆'/>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
    },
});

export default SettingPage;