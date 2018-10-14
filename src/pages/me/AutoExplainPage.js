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
import {Input, ListRow, Button, Overlay, Label, Toast} from "../../components/teaset/index"
import {TitleBar} from '../../components/base'
import {commonStyle} from '../../constants/commonStyle'

class AutoExplainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
                <TitleBar title={'自动付费说明'} navigation={this.props.navigation}/>
                <View style={{
                    marginLeft: commonStyle.marginLeft,
                    marginRight: commonStyle.marginRight,
                    marginTop: commonStyle.marginTop
                }}>
                    <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                        <Label size='md' type='title' text='Q:'/>
                        <Label size='md' type='title'
                               text='动付费可以在那些业务中使用?'/>
                    </View>
                    <View style={{flexDirection: commonStyle.row}}>
                        <Label size='md' type='title' text='A:'/>
                        <Label size='md' type='detail'
                               text='开启自动付费后,在与平台对接的停车场停车,直接出入不用任何操作'
                               numberOfLines={2}/>
                    </View>

                    <View style={{flexDirection: commonStyle.row, marginTop: 10, alignItems: commonStyle.center}}>
                        <Label size='md' type='title' text='Q:'/>
                        <Label size='md' type='title'
                               text='自动付费安全吗？'/>
                    </View>
                    <View style={{flexDirection: commonStyle.row}}>
                        <Label size='md' type='title' text='A:'/>
                        <Label size='md' type='detail'
                               text='我们严格按照停车清单金额进行扣款,并且做了安全保障;您可以在停车清单核对支付信息'
                               numberOfLines={2}/>
                    </View>

                    <View style={{flexDirection: commonStyle.row, marginTop: 10, alignItems: commonStyle.center}}>
                        <Label size='md' type='title' text='Q:'/>
                        <Label size='md' type='title'
                               text='扣款后如果有异议如何申诉？'/>
                    </View>
                    <View style={{flexDirection: commonStyle.row}}>
                        <Label size='md' type='title' text='A:'/>
                        <Label size='md' type='detail'
                               text='如果对扣款费用有异议，您可以在投诉建议中进行投诉，客服MM会在第一时间为您处理，或拨打客服电话进行申诉 '
                               numberOfLines={2}/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default AutoExplainPage;
