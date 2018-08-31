/**
 * Created by PVer on 2018/8/19.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import Label from 'teaset/components/Label/Label'
import Button from 'teaset/components/Button/Button'

class BuyCardView extends Component {

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

    getValue(key) {
        let tempArr = this.state.storageArr || []
        let searchValue;
        for (let i = 0; i < tempArr.length; i++) {
            let tempKey = tempArr[i].key
            if (key === tempKey) {
                searchValue = tempArr[i].value
                break
            }
        }
        return searchValue
    }

    render() {
        const {code, type, price, term, range} = this.props
        return (
            <View style={{
                padding:10,
                backgroundColor: 'white',
                borderRadius:5,
                margin:5
            }}>
                <View style={{backgroundColor:'white'}}>
                    <Label size='md' type='title' text={`NO:${code}`}/>
                    <View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'center',marginTop:30}}>
                        <Label size='xl' type='title' text={`￥${price}`}/>
                        <Label size='md' type='title' text={this.getValue(type)}/>
                    </View>

                    <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                        <Label size='md' type='title' text={`使用范围:${range}`} style={{flex:1,marginRight:20}}/>
                        <Button title="购买" onPress={()=>{
                            this.props.buyCard && this.props.buyCard()
                        }} type='danger' size='sm'/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

// code (integer, optional): 卡种类编号,
// type (string, optional): 卡类型:数据字典——CARD_TYPE,
// price (number, optional): 价格：元,
// term (integer, optional): 有效期：天,
// range (string, optional): 适用范围

BuyCardView.propTypes = {
    code: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    term: PropTypes.number,
    range: PropTypes.string.isRequired,
    buyCard: PropTypes.func,
}

BuyCardView.defaultProps = {
    term: 0,
}


export default BuyCardView