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
import Button from 'teaset/components/Button/Button';

import LoginStyle from '../../assets/styles/LoginStyle';

class ForgetPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Button title="忘记密码页面"
                        size='lg'
                        type='primary'
                        style={LoginStyle.bottomBt}
                        onPress={() => {
                            Alert.alert('忘记密码页面');
                        }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
});

export default ForgetPage;