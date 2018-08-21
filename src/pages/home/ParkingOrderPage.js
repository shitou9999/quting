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
    ScrollView,
} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Label from 'teaset/components/Label/Label'
import Button from 'teaset/components/Button/Button'
import ListRow from 'teaset/components/ListRow/ListRow'

class ParkingOrderPage extends Component {

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

    _submitOrder = ()=>{
        const {navigation} = this.props;
        navigation.navigate('ParkingPayPage')
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={{flex:1}}>
                <ScrollView style={styles.container}>
                    <View>
                        <View style={{marginBottom:10,marginTop:10,marginLeft:5,marginBottom:10}}>
                            <Label size='md' type='detail' text='停车信息'/>
                        </View>
                        <ListRow title='停车点' detail={<Label text='*******' type='title' />} topSeparator='full'/>
                        <ListRow title='车牌号码' detail={<Label text='*******' type='title' />} topSeparator='full'/>
                        <ListRow title='计费开始时间' detail={<Label text='*******' type='title' />} topSeparator='full'/>
                        <ListRow title='计费结束时间' detail={<Label text='*******' type='title' />} topSeparator='full'/>
                        <ListRow title='计费时长' detail={<Label text='*******' type='title' />} topSeparator='full'/>
                        <View style={{marginTop:10,marginBottom:10,marginLeft:5}}>
                            <Label size='md' type='detail' text='收费信息'/>
                        </View>
                        <ListRow title='停车费' detail={<Label text='4.9元' type='title' />} topSeparator='full'/>
                        <ListRow title='已付金额' detail={<Label text='0.0元' type='title' />} topSeparator='full'/>
                        <ListRow title='应付金额' detail={<Label text='￥0.0' type='title' />} topSeparator='full'/>
                    </View>
                </ScrollView>
                <Button title="提交订单"
                        size='lg'
                        style={{margin:10}}
                        onPress={this._submitOrder()}
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

export default connect(mapState, dispatchAction)(ParkingOrderPage)