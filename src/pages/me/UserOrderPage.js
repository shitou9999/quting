/**
 * Created by PVer on 2018/7/14.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import SegmentedView from 'teaset/components/SegmentedView/SegmentedView'
import OrderUnpaidView from './OrderUnpaidPage'
import OrderAllView from './OrderAllPage'
import {commonStyle} from '../../constants/commonStyle'
import BaseContainer from "../../components/BaseContainer"

class UserOrderPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <BaseContainer title={'我的订单'}>
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
            </BaseContainer>

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
