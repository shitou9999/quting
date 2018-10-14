import React, {Component} from "react";
import {Platform, StyleSheet, Text, View} from 'react-native'
import PropTypes from 'prop-types'
import {Input, ListRow, Button, Overlay, Label, Toast} from "../components/teaset/index"
import {Divide} from "./base/index"
import {commonStyle} from "../constants/commonStyle"
import * as ViewUtil from "../utils/ViewUtil"


class ItemDetailView extends Component {

    static propTypes = {
        code: PropTypes.string,
        payMoney: PropTypes.number,
        orderType: PropTypes.string,
        opTime: PropTypes.string,
    }

    static defaultProps = {
        code: '',
        payMoney: 0,
        orderType: '',
        opTime: '',
    }

    constructor(props) {
        super(props);
        this.state = {
            storageArr: [],
        }
    }

    //10预付费 11后付费 12结算付费 20欠费补缴 21退费充值
    componentDidMount() {
        gStorage.getAllDataForKey('ORDER+TYPE', status => {
            this.setState({
                storageArr: status
            })
        })
    }

    render() {
        let tempArr = this.state.storageArr || []
        return (
            <View style={{backgroundColor: commonStyle.white, borderRadius: 5, margin: 5, padding: 5}}>
                <View style={{flexDirection: commonStyle.reverse}}>
                    <Label text={this.props.opTime} type={'title'} size={'md'}/>
                </View>
                <Divide orientation={'horizontal'} color={commonStyle.lineColor} width={commonStyle.lineHeight}/>
                <View style={{flexDirection: commonStyle.row}}>
                    <Label text={`${ViewUtil.getValue(tempArr, parseInt(this.props.orderType), '**')}:`}
                           type={'title'}
                           size={'md'}/>
                    <Label text={this.props.payMoney} type={'title'} size={'md'}/>
                </View>
            </View>
        )
    }
}


export default ItemDetailView
