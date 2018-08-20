/**
 * Created by PVer on 2018/7/14.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import SegmentedView from 'teaset/components/SegmentedView/SegmentedView'
import OrderUnpaidView from './OrderUnpaidPage'
import OrderAllView from './OrderAllPage'


class UserOrderPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
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
                    <SegmentedView.Sheet title='待支付'>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <OrderUnpaidView/>
                        </View>
                    </SegmentedView.Sheet>
                    <SegmentedView.Sheet title='全部'>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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