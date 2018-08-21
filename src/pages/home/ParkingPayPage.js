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
    Image
} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Label from 'teaset/components/Label/Label'
import Button from 'teaset/components/Button/Button'


class ParkingPayPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         title: navigation.getParam('otherParam', 'A Nested Details Screen'),
    //     };
    // };
    componentWillMount() {

    }

    //在props被改变时更新一些东西
    componentWillReceiveProps(nextProps) {

    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <View style={{flex:1}}>
                    <View style={{height:150,justifyContent:'center',alignItems:'center',backgroundColor:'yellow'}}>
                        <Label size='md' text='应缴金额(元)' type='detail'/>
                        <Label size='xl' text='0.0' type='detail'/>
                    </View>
                    <View style={{margin:10}}>
                        <Label size='md' text='付款方式' type='title'/>
                    </View>
                    <View style={{height:200,backgroundColor:'red'}}>

                    </View>
                </View>
                <Button title="立即支付"
                        size='lg'
                        style={{margin:10}}
                        onPress={()=>{}}
                        type='primary'/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

export default connect(mapState, dispatchAction)(ParkingPayPage)