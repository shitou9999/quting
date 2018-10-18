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

    state = {
        animated: true,
        hidden: false,
        backgroundColor: 'white',
        translucent: false,
        barStyle: 'default',
        networkActivityIndicatorVisible: false,
        showHideTransition: 'fade',
    }
    //你也可以直接使用this.props.navigation.state.params访问 params 对象。 如果没有提供参数，这可能是null，
    // 所以使用getParam通常更容易，所以你不必处理这种情况
    // static navigationOptions = ({navigation}) => {
    //     return {
    //         title: navigation.getParam('titleName'),
    //     }
    // }

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

    // 1) 首次渲染: willMount > render > didMount，
    // 2) props更新时: receiveProps  > shouldUpdate > willUpdate  > render > didUpdate
    // 3) state更新时: shouldUpdate > willUpdate > render  > didUpdate
    // 3) 卸载时: willUnmount

//旧的生命周期（unsafe）不能和新的生命周期同时出现在一个组件，否则会报错“你使用了一个不安全的生命周期”
    //在getDerivedStateFromProps中，在条件限制下(if/else)调用setState。如果不设任何条件setState，这个函数超高的调用频率，
// 不停的setState，会导致频繁的重绘，既有可能产生性能问题，同时也容易产生bug。
    static getDerivedStateFromProps(nextProps, prevState) {
        // 4. Updating state based on props
        // 7. Fetching external data when props change
    }
    constructor() {
        super(props);
        // 初始状态
        this.state = {};
        // 1. Initializing state
    }
    componentWillMount() {
        // 1. Initializing state
        // 2. Fetching external data
        // 3. Adding event listeners (or subscriptions)
    }
    componentDidMount() {
        // 2. Fetching external data
        // 3. Adding event listeners (or subscriptions)
    }
    componentWillReceiveProps() {
        // 4. Updating state based on props
        // 6. Side effects on props change
        // 7. Fetching external data when props change
    }
    shouldComponentUpdate() {
    }
    componentWillUpdate(nextProps, nextState) {
        // 5. Invoking external callbacks
        // 8. Reading DOM properties before an update

    }
    render() {
    }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        // 8. Reading DOM properties before an update
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // 5. Invoking external callbacks
        // 6. Side effects on props change
    }

    componentWillUnmount() {
    }



    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>

            </View>
        );
    }

    _getAppDictionary = () => {
        let mapVo = new Map()
        console.log(mapVo.size)
        mapVo.set('PROBLEM+TYPE', [])
        mapVo.set('PROBLEM+TYPE2', [])
        let vo = {
            "lookupName": "PROBLEM_TYPE",
            "lookupKey": "2",
            "lookupValue": "关于充值"
        };
        let vo2 = {
            "lookupName": "PROBLEM_TYPE",
            "lookupKey": "3",
            "lookupValue": "关于停车"
        }
        mapVo.get('PROBLEM+TYPE').push(vo)
        mapVo.get('PROBLEM+TYPE').push(vo2)
        mapVo.get('PROBLEM+TYPE2').push(vo2)
        // console.log(mapVo.size)
        // for (var [key, value] of mapVo) {
        //     console.log(key + ' = ' + value);
        // }
        // mapVo.forEach(function (value, key, map) {
        //     console.log(key)
        //     console.log(value)
        //     storage.save(key, value)
        // })
    }


    _test = () => {
        // storage.load("PROBLEM+TYPE", (results) => {
        //     console.log(results)//(2) [{…}, {…}]
        //     results.forEach(result => {
        //         console.log(result.lookupValue);
        //     })
        // })
        // storage.save('HHH', 888, '123456789')
        // storage.save('sss', 888, 'ssssssssss')
        // storage.loadId("HHH", 888, results => {
        //     console.log(results)
        // })
        // storage.load('PREF_ID', (id) => {
        //     console.log(id)
        // });
        // storage.loadId("sss", 888, results => {
        //     console.log(results)
        // })
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
