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
} from 'react-native';
import ListRow from 'teaset/components/ListRow/ListRow';
import MeStyle from '../../assets/styles/MeStyle';

class UserInfoPage extends Component {

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
                    title='账号信息'
                    detail='用户手机号'
                    bottomSeparator='full'/>
                <ListRow
                    style={MeStyle.listRow}
                    title='头像'
                    onPress={() => {

                    }}
                    bottomSeparator='full'/>
                <ListRow
                    style={MeStyle.listRow}
                    title='昵称'
                    detail='未设置'
                    onPress={() => {
                        Alert.alert('ListRow');
                    }}
                    bottomSeparator='full'/>
                <ListRow
                    style={MeStyle.listRow}
                    title='性别'
                    detail='男'
                    onPress={() => {
                        Alert.alert('性别');
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

export default UserInfoPage;