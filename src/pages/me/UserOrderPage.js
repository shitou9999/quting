/**
 * Created by PVer on 2018/7/14.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import SegmentedView from 'teaset/components/SegmentedView/SegmentedView'
import OrderUnpaidView from './OrderUnpaidPage'
import OrderAllView from './OrderAllPage'
import TitleBar from '../../components/TitleBar'
import {commonStyle} from '../../constants/commonStyle'

class UserOrderPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <TitleBar title={'我的订单'} navigation={this.props.navigation}/>
                <SegmentedView
                    style={{flex: 1, height: 80}}
                    type={'projector'}
                    indicatorType={'boxWidth'}
                    indicatorLineColor={commonStyle.themeColor}
                    indicatorLineWidth={1}
                    indicatorPositionPadding={1}
                    activeIndex={this.state.activeIndex}
                    onChange={index => this.setState({activeIndex: index})}
                >
                    <SegmentedView.Sheet title='待支付'>
                        <View style={{flex: 1}}>
                            <OrderUnpaidView/>
                        </View>
                    </SegmentedView.Sheet>
                    <SegmentedView.Sheet title='全部'>
                        <View style={{flex: 1}}>
                            <OrderAllView/>
                        </View>
                    </SegmentedView.Sheet>
                </SegmentedView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

export default UserOrderPage;