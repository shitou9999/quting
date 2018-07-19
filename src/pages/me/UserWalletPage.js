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
    Alert,
    Switch,
} from 'react-native';
import ListRow from 'teaset/components/ListRow/ListRow';

class UserWalletPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animated: false
        }
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <ListRow
                    title='自动付费(停车后自动用钱包缴费)'
                    icon={require('../../assets/images/test.png')}
                    detail={
                        <Switch
                            value={this.state.animated}
                            onValueChange={value => this.setState({animated: value})}/>
                    }
                />
                <ListRow
                    title='充值'
                    bottomSeparator="full"
                    icon={require('../../assets/images/test.png')}
                    onPress={() => {
                        navigation.navigate('UserOrderPage')
                    }}
                />
                <ListRow
                    title='优惠券'
                    bottomSeparator="full"
                    icon={require('../../assets/images/test.png')}
                    onPress={() => {
                        navigation.navigate('UserOrderPage')
                    }}
                />
                <ListRow
                    title='月卡'
                    bottomSeparator="full"
                    icon={require('../../assets/images/test.png')}
                    onPress={() => {
                        navigation.navigate('UserOrderPage')
                    }}
                />
                <ListRow
                    style={{marginTop: 10}}
                    title='重置支付密码'
                    bottomSeparator="full"
                    icon={require('../../assets/images/test.png')}
                    onPress={() => {
                        navigation.navigate('ResetPwdPage')
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff7776',
    },
});

export default UserWalletPage;