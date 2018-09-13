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
import SegmentedView from 'teaset/components/SegmentedView/SegmentedView'
import Label from 'teaset/components/Label/Label'
import RecordPage from './ParkingRecordPage'
import LotPage from './ParkingLotPage'

import ParkingView from '../../components/ParkingView'
import NoParkingCarView from '../../components/NoParkingCarView'
import {commonStyle} from '../../constants/commonStyle'

/**
 * 停车记录
 */
class ParkingHistoryPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    componentWillMount() {

    }

//     indicatorLineColor	string		激活指示器颜色，默认值在 Theme 中设置。
// indicatorLineWidth	number		激活指示器线宽度，默认值在 Theme 中设置。
    render() {
        const {navigation} = this.props;
        return (
            <View style={{flex: 1}}>
                <SegmentedView
                    style={{flex: 1, height: 50}}
                    type={'projector'}
                    indicatorType={'boxWidth'}
                    indicatorLineColor={'#5cb85c'}
                    indicatorLineWidth={1}
                    indicatorPositionPadding={3}
                    activeIndex={this.state.activeIndex}
                    onChange={index => this.setState({activeIndex: index})}
                >
                    <SegmentedView.Sheet title='道路'>
                        <View style={{flex: 1, alignItems: commonStyle.center, justifyContent: commonStyle.center}}>
                            <RecordPage/>
                        </View>
                    </SegmentedView.Sheet>
                    <SegmentedView.Sheet title='停车场'>
                        <View style={{flex: 1, alignItems: commonStyle.center, justifyContent: commonStyle.center}}>
                            <LotPage/>
                        </View>
                    </SegmentedView.Sheet>
                </SegmentedView>
            </View>
        );
    }
}

const styles = StyleSheet.create({});

const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me,
});

const dispatchAction = (dispatch) => ({
    // login: (user, pwd) => dispatch(userActions.login(user, pwd))
    // loginAction: bindActionCreators(loginActions, dispatch)
});

export default connect(mapState, dispatchAction)(ParkingHistoryPage)