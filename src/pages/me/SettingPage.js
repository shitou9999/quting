/**
 * Created by PVer on 2018/7/14.
 */
import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View, Alert, TouchableOpacity} from 'react-native'
import ListRow from 'teaset/components/ListRow/ListRow'
import Label from 'teaset/components/Label/Label'
import {commonStyle} from '../../constants/commonStyle'
import BaseContainer from "../../components/BaseContainer"

//设置
class SettingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {navigation} = this.props;
        return (
            <BaseContainer title={'设置'}>
                <ListRow
                    style={{height: commonStyle.bottomBtnHeight}}
                    title='修改登录密码'
                    onPress={() => {
                        navigation.navigate('ModifyPwdPage');
                    }}
                    bottomSeparator='full'/>
                <ListRow
                    style={{height: commonStyle.bottomBtnHeight}}
                    title='自动付费说明'
                    onPress={() => {
                        navigation.navigate('AutoExplainPage');
                    }}
                    bottomSeparator='full'/>
                <ListRow
                    style={{height: commonStyle.bottomBtnHeight}}
                    title='关于我们'
                    onPress={() => {

                    }}
                    bottomSeparator='full'/>
                <TouchableOpacity>
                    <View style={{
                        flexDirection: commonStyle.row,
                        justifyContent: commonStyle.center,
                        backgroundColor: commonStyle.white,
                        height: 50,
                        marginTop: commonStyle.marginTop,
                        alignItems: commonStyle.center
                    }}>
                        <Label size='md' type='title' text='退出登陆'/>
                    </View>
                </TouchableOpacity>
            </BaseContainer>
        );
    }
}

export default SettingPage
