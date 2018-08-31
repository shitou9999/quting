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
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

class UcTest extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         title: navigation.getParam('otherParam', 'A Nested Details Screen'),
    //     };
    // };
    // static navigationOptions = {
    //     // title 可以这样设置成一个函数， state 会自动传过来
    //     title: ({state}) => `${state.params.name}`,
    // };

    componentDidMount() {
    }

    //在组件销毁的时候要将其移除
    componentWillUnmount() {

    }


    //在props被改变时更新一些东西
    componentWillReceiveProps(nextProps) {

    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>UcTest</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

const mapState = (state) => ({
    // isLoginLable: state.user.isLoginLable,
});

const dispatchAction = (dispatch) => ({
    // login: (user, pwd) => dispatch(userActions.login(user, pwd))
    // loginAction: bindActionCreators(loginActions, dispatch),
    // userAction: bindActionCreators(userActions, dispatch)
});

export default connect(mapState, dispatchAction)(UcTest)