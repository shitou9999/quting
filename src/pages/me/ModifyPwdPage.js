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
import Input from 'teaset/components/Input/Input';
import Button from 'teaset/components/Button/Button';

import Global from '../../constants/global';
import MeStyle from '../../assets/styles/MeStyle';
//修改登录密码
class ModifyPwdPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            oldValue: null,
            newValue: null,
            sureNewValue: null,
        }
    }

    render() {
        return (
            <View sytle={styles.container}>
                <View style={styles.inputView}>
                    <Input
                        style={styles.input}
                        size='lg'
                        value={this.state.oldValue}
                        placeholder='输入原始密码'
                        onChangeText={text => this.setState({oldValue: text})}
                    />
                    <Input
                        style={styles.input}
                        size='lg'
                        value={this.state.newValue}
                        placeholder='输入新密码'
                        onChangeText={text => this.setState({newValue: text})}
                    />
                    <Input
                        style={styles.input}
                        size='lg'
                        value={this.state.sureNewValue}
                        placeholder='确认新密码'
                        onChangeText={text => this.setState({sureNewValue: text})}
                    />
                </View>
                <Button title="确 定"
                        size='lg'
                        style={MeStyle.bottomBt}
                        onPress={() => {
                            Alert.alert('Button');
                        }}
                        type='primary'/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff7776',
    },
    inputView: {
        flex: 1,
    },
    input: {
        width: Global.SCREEN_WIDTH,
        height: 50,
        borderColor: '#FFF',
        borderRadius: 0,
    },
});

export default ModifyPwdPage;