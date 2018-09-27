/**
 * Created by PVer on 2018/8/19.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import Label from 'teaset/components/Label/Label'
import Button from 'teaset/components/Button/Button'
import * as ViewUtil from "../utils/ViewUtil"
import {commonStyle} from '../constants/commonStyle'

class BuyCardView extends Component {

    static propTypes = {
        code: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        term: PropTypes.number,
        range: PropTypes.string.isRequired,
        buyCard: PropTypes.func,
    }

    static defaultProps = {
        term: 0,
    }

    constructor(props) {
        super(props);
        this.state = {
            storageArr: [],
        }
    }

    componentDidMount() {
        gStorage.storage.getAllDataForKey('CARD+TYPE', status => {
            this.setState({
                storageArr: status
            })
        });
    }

    render() {
        const {code, type, price, term, range} = this.props
        let bgRes = require('../assets/images/me_card_yellow.png')
        //1月卡 2季卡 3半年卡 4年卡
        if (type === '1') {
            bgRes = require('../assets/images/me_card_gray.png')
        } else if (type === '2') {
            bgRes = require('../assets/images/me_card_yellow.png')
        } else if (type === '3') {
            bgRes = require('../assets/images/me_card_blue.png')
        } else if (type === '4') {
            bgRes = require('../assets/images/me_card_back.png')
        }
        return (
            <ImageBackground
                source={bgRes}
                style={{
                    paddingTop: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingBottom: 3,
                    margin: 5,
                    height: 150,
                    justifyContent: commonStyle.between
                }}
                imageStyle={{
                    borderRadius: 5
                }}>

                <View style={{justifyContent: commonStyle.between, flexDirection: commonStyle.row}}>
                    <Label size='md' type='title' text={`NO:${code}`} style={{color: commonStyle.white}}/>
                    <View
                        style={{
                            flexDirection: commonStyle.row,
                            alignItems: commonStyle.center,
                            marginTop: commonStyle.marginTop + 10
                        }}>
                        <Label size='xl' type='title' text={`￥${price}`} style={{color: commonStyle.white}}/>
                        <Label size='md' type='title' text={ViewUtil.getValue(this.state.storageArr, type, '*卡')}
                               style={{color: commonStyle.white}}/>
                    </View>
                </View>

                <View style={{
                    justifyContent: commonStyle.between,
                    flexDirection: commonStyle.row,
                }}>
                    <Label size='md' type='title' text={`使用范围:${range}`} style={{flex: 1, marginRight: 20}}/>
                    <Button title="购买" onPress={() => {
                        this.props.buyCard && this.props.buyCard(code, price, range)
                    }} type='danger' size='sm'/>
                </View>
            </ImageBackground>
        );
    }
}


// code (integer, optional): 卡种类编号,
// type (string, optional): 卡类型:数据字典——CARD_TYPE,
// price (number, optional): 价格：元,
// term (integer, optional): 有效期：天,
// range (string, optional): 适用范围

export default BuyCardView
