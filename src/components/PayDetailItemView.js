import {Component} from "react";
import {Platform, StyleSheet, Text, View, Alert, SectionList} from 'react-native';
import Label from "teaset/components/Label/Label"
import * as ViewUtil from "../utils/ViewUtil"
import React from "react"
import PropTypes from 'prop-types'
import {commonStyle} from "../constants/commonStyle"

class PayDetailItemView extends Component {

    static propTypes = {
        item: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            storageArr: [],
        }
    }

    componentDidMount() {
        gStorage.getAllDataForKey('ORDER+TYPE', status => {
            this.setState({
                storageArr: status
            })
        })
    }

    //业务类型 0-充值 1-道路-付费，2-停车场-付费，3-退费，4-补缴，
    render() {
        // let opTime = DateUtil.formt(item.opTime, 'yyyy-MM-dd HH:mm:ss')
        let tempArr = this.state.storageArr || []
        return (
            <View style={styles.itemStyle}>
                <View>
                    <Label size='md' type='title'
                           text={ViewUtil.getValue(tempArr, parseInt(this.props.item.orderType), '***')}/>
                    <Label size='md' type='detail' text={this.props.item.opTime}/>
                </View>
                <View style={styles.priceStyle}>
                    <Label size='md' type='detail' text={this.props.item.changeMoney}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    itemStyle: {
        flexDirection: commonStyle.row,
        justifyContent: commonStyle.between,
        paddingLeft: commonStyle.padding,
        paddingRight: commonStyle.padding,
        backgroundColor: commonStyle.white
    },
    priceStyle: {
        alignItems: commonStyle.center,
        justifyContent: commonStyle.center
    }
});

export default PayDetailItemView
