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
    View
} from 'react-native';
import Input from 'teaset/components/Input/Input';

import Global from '../../constants/global'


//修改昵称
class ModifyNamePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
        }
    }

    // onPress={navigation.state.params.navigatePress}
    static navigationOptions = ({navigation}) => {
        return {
            title: '昵称',
            headerRight: (
                <Text >
                    完成
                </Text>
            )
        }
    };


    _userResetUserName = () => {

    };

    render() {
        return (
            <View style={styles.container}>
                <Input
                    style={styles.input}
                    size='lg'
                    value={this.state.userName}
                    placeholder='请输入昵称'
                    onChangeText={text => this.setState({userName: text})}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff5f5a',
    },
    input: {
        width: Global.SCREEN_WIDTH,
        height: 50,
        borderColor: '#FFF',
        borderRadius: 0,
        marginTop: 5,
    },
});

export default ModifyNamePage;