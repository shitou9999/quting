/**
 * Created by PVer on 2018/7/14.
 */
/**
 * Created by PVer on 2018/7/14.
 */
import {
    createStackNavigator
} from 'react-navigation'
import Theme from '../../../src/assets/Theme';
import MePage from '../../pages/MePage';
import ComplaintPage from '../../pages/me/ComplaintPage';
import ParkingRecordPage from '../../pages/me/ParkingRecordPage';
import ParkingLotPage from '../../pages/me/ParkingLotPage';
import UserOrderPage from '../../pages/me/UserOrderPage';
import SettingPage from '../../pages/me/SettingPage';
import ModifyPwdPage from '../../pages/me/ModifyPwdPage';
import AutoExplainPage from '../../pages/me/AutoExplainPage';
import MessagePage from '../../pages/me/MessagePage';
import UserWalletPage from '../../pages/me/UserWalletPage';
import PayDetailPage from '../../pages/me/PayDetailPage';
import UserInfoPage from '../../pages/me/UserInfoPage';
import ResetPwdPage from '../../pages/me/ResetPwdPage';
import ModifyNamePage from '../../pages/me/ModifyNamePage';
import ParkingRecordDetailPage from '../../pages/me/ParkingRecordDetailPage';
import UserBindCarPage from '../../pages/me/UserBindCarPage';
import UserAddBindCarPage from '../../pages/me/UserAddBindCarPage';
import CarApprovalPage from '../../pages/me/CarApprovalPage';
import UserRechargePage from '../../pages/me/UserRechargePage';

/*
 * --- 路由配置 ---
 * 所有组件都必须在这里注册
 * 在这里设置的navigationOptions的权限 > 对应页面里面的 static navigationOptions的设置 > StackNavigator()第二个参数里navigationOptions的设置
 * 该配置文件会在App.js里的StackNavigator(导航组件)里使用。
 */
const RouteConfig = {
    MePage: {
        screen: MePage,
        navigationOptions: ({navigation}) => ({
            header: null,
            gesturesEnable: true
        })// 此处设置了, 会覆盖组件内的`static navigationOptions`设置.
    },
    ComplaintPage: {
        screen: ComplaintPage,
        navigationOptions: ({navigation}) => ({
            title: '投诉建议',
        })
    },
    ParkingRecordPage: {
        screen: ParkingRecordPage,
        navigationOptions: ({navigation}) => ({
            title: '停车记录',
        })
    },
    ParkingLotPage: {
        screen: ParkingLotPage,
        navigationOptions: ({navigation}) => ({
            title: '停车记录',
        })
    },
    UserOrderPage: {
        screen: UserOrderPage,
        navigationOptions: ({navigation}) => ({
            title: '我的订单',
        })
    },
    SettingPage: {
        screen: SettingPage,
        navigationOptions: ({navigation}) => ({
            title: '设置',
        })
    },
    ModifyPwdPage: {
        screen: ModifyPwdPage,
        navigationOptions: ({navigation}) => ({
            title: '修改登录密码',
        })
    },
    AutoExplainPage: {
        screen: AutoExplainPage,
        navigationOptions: ({navigation}) => ({
            title: '自动付费说明',
        })
    },
    MessagePage: {
        screen: MessagePage,
        navigationOptions: ({navigation}) => ({
            title: '通知消息',
        })
    },
    UserWalletPage: {
        screen: UserWalletPage,
        navigationOptions: ({navigation}) => ({
            title: '我的钱包',
        })
    },
    PayDetailPage: {
        screen: PayDetailPage,
        navigationOptions: ({navigation}) => ({
            title: '明细',
        })
    },
    UserInfoPage: {
        screen: UserInfoPage,
        navigationOptions: ({navigation}) => ({
            title: '个人信息',
        })
    },
    ResetPwdPage: {
        screen: ResetPwdPage,
        navigationOptions: ({navigation}) => ({
            title: '重置支付密码'
        })
    },
    ModifyNamePage: ModifyNamePage,
    ParkingRecordDetailPage: {
        screen: ParkingRecordDetailPage,
        navigationOptions: ({navigation}) => ({
            title: '停车记录详情'
        })
    },
    UserBindCarPage: {
        screen: UserBindCarPage,
        navigationOptions: ({navigation}) => ({
            title:'车牌绑定'
        })
    },
    UserAddBindCarPage: {
        screen: UserAddBindCarPage,
        navigationOptions: ({navigation}) => ({
            title:'绑定车辆'
        })
    },
    CarApprovalPage: {
        screen: CarApprovalPage,
        navigationOptions: ({navigation}) => ({
            title:'车辆认证'
        })
    },
    UserRechargePage: {
        screen: UserRechargePage,
        navigationOptions: ({navigation}) => ({
            title:'充值'
        })
    }
};

// export default RouteConfig

const StackNavigationConfig = {
    initialRouteName: 'MePage', // 设置默认的页面组件，必须是上面已注册的页面组件
    navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
        headerStyle: {
            backgroundColor: Theme.primaryColor,
        },
        // headerTintColor: 'rgb(255,255,255)',
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        },
    },
    mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
    headerMode: 'float',// 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
    onTransitionStart: () => {
        console.log('导航栏切换开始')
    },  // 回调
    onTransitionEnd: () => {
        console.log('导航栏切换结束')
    }
};

// export default StackNavigationConfig

// 首页页面栈
const MePageStack = createStackNavigator(RouteConfig, StackNavigationConfig);

export default MePageStack;