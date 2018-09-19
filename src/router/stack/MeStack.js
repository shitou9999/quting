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
import CarDetailPage from '../../pages/me/CarDetailPage';
import BindCarPage from '../../pages/me/BindCarPage';
import ParkingHistoryPage from '../../pages/me/ParkingHistoryPage';
import CouponPage from '../../pages/me/CouponPage';
import MouthCardPage from '../../pages/me/MouthCardPage';
import BuyCardPage from '../../pages/me/BuyCardPage';
import BuyCardOrderPage from '../../pages/me/BuyCardOrderPage';
import BuyCardNextOnePage from '../../pages/me/BuyCardNextOnePage';
import BuyCardNextTwoPage from '../../pages/me/BuyCardNextTwoPage';
import BuyCardNextPayPage from '../../pages/me/BuyCardNextPayPage';
import CouponHisPage from '../../pages/me/CouponHisPage';
import SearchCardPage from '../../pages/me/SearchCardPage';

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
    ComplaintPage: ComplaintPage,
    ParkingRecordPage: ParkingRecordPage,
    ParkingLotPage: ParkingLotPage,
    UserOrderPage: UserOrderPage,
    SettingPage: SettingPage,
    ModifyPwdPage: ModifyPwdPage,
    AutoExplainPage: AutoExplainPage,
    MessagePage: MessagePage,
    UserWalletPage: {
        screen: UserWalletPage,
        navigationOptions: ({navigation}) => ({
            title: '我的钱包',
        })
    },
    PayDetailPage: PayDetailPage,
    UserInfoPage: UserInfoPage,
    ResetPwdPage: ResetPwdPage,
    ModifyNamePage: ModifyNamePage,
    ParkingRecordDetailPage: ParkingRecordDetailPage,
    UserBindCarPage: UserBindCarPage,
    UserAddBindCarPage: UserAddBindCarPage,
    CarApprovalPage: CarApprovalPage,
    UserRechargePage: UserRechargePage,
    CarDetailPage: CarDetailPage,
    BindCarPage: BindCarPage,
    ParkingHistoryPage: ParkingHistoryPage,
    CouponPage: CouponPage,
    MouthCardPage: MouthCardPage,
    BuyCardPage: BuyCardPage,
    BuyCardOrderPage: BuyCardOrderPage,
    BuyCardNextOnePage: BuyCardNextOnePage,
    BuyCardNextTwoPage: BuyCardNextTwoPage,
    BuyCardNextPayPage: BuyCardNextPayPage,
    CouponHisPage: CouponHisPage,
    SearchCardPage: SearchCardPage,
};

// export default RouteConfig

const StackNavigationConfig = {
    initialRouteName: 'MePage',
    navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
        header: null,
        headerStyle: {
            backgroundColor: Theme.primaryColor,
        },
        // headerTintColor: 'rgb(255,255,255)',
        headerTintColor: 'white',
        headerBackTitle: null,
        headerTitleStyle: {
            color: 'white',
            flex: 1,
            textAlign: 'center',
        },
        // gesturesEnabled: Platform.OS == 'ios' ? true : false,
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

const headerTitleStyle = {
    // fontSize: System.iOS ? 23 : 20,
    // color: 'white',
    // flex: 1,
    // textAlign: 'center',
    // paddingTop: System.Android ? 17 : null,
};

// export default StackNavigationConfig

// 首页页面栈
const MePageStack = createStackNavigator(RouteConfig, StackNavigationConfig);

export default MePageStack;
