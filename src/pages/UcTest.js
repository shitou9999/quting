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
//官方提倡我们使用PureComponent来减少重新渲染的次数
class UcTest extends Component {

    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    state = {
        animated: true,
        hidden: false,
        backgroundColor:'white',
        translucent:false,
        barStyle:'default',
        networkActivityIndicatorVisible:false,
        showHideTransition:'fade',
    }


    // // 在static中使用this方法----->React Native 中 static的navigationOptions中的点击事件不能用this
    // static navigationOptions = ({navigation}) => {
    //     return {
    //         title 可以这样设置成一个函数， state 会自动传过来
    //         title: ({state}) => `${state.params.name}`,
    //         title: navigation.getParam('otherParam', 'A Nested Details Screen'),
    //         headerRight: (
    //             <Text style={{color: commonStyle.white, marginRight: 10}}
    //                   onPress={()=>{navigation.state.params.navigatePress()}}
    //             >完成</Text>
    //         )
    //     }
    // };

    //属性给params
    // componentDidMount() {
    //     this.props.navigation.setParams({navigatePress: this.navigatePress})
    // }
    //如果你的组件是这么写的话  component={()=>this.renderComponent()}，那么换成 component={this.renderComponent}

//组件收到新的props被调用
    componentWillReceiveProps(nextProps) {
        console.log('--------componentWillReceiveProps---------------')
        console.log(nextProps)//app所有状态 store
    }

    //组件收到新的props被调用，此处比较返回不同的值，true调用componentWillUpdate
    shouldComponentUpdate(nextProps, nextState) {
        console.log('--------shouldComponentUpdate---------------')
        console.log(nextProps)//app所有状态 store
        console.log(nextState)//被改变的state
        return false
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('--------componentWillUpdate---------------')
        console.log(nextProps)//app所有状态 store
        console.log(nextState)//被改变的state
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
});

const mapState = (state) => ({
    // isLoginLable: state.user.isLoginLable,
});

const dispatchAction = (dispatch) => ({
    // login: (user, pwd) => dispatch(userActions.login(user, pwd))
    // loginAction: bindActionCreators(loginActions, dispatch)
});

export default connect(mapState, dispatchAction)(UcTest)
