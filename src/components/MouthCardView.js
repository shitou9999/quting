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

class MouthCardView extends Component {

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
        const {id, plate, plateColor, type, price, term, range, validTime, invalidTime} = this.props
        return (
            <View style={{
                padding:10,
                backgroundColor: 'white',
                borderRadius:5,
                margin:5
            }}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                               style={{width: 30, height: 40}}
                        />
                        <Label size='md' type='title' text={plate} style={{marginLeft:5}}/>
                        <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                               style={{width: 15, height: 15}}
                        />
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Label size='xl' type='title' text={`￥${price}`}/>
                        <Label size='md' type='title' text={this.getValue(type)}/>
                    </View>
                </View>
                <View style={{flexDirection:'row',justifyContent:'flex-end',marginTop:30}}>
                    <Label size='md' type='title' text={`生效时间:${validTime}`}/>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Label size='md' type='title' text={`NO:${id}`}/>
                    <Label size='md' type='title' text={`到期时间:${invalidTime}`}/>
                </View>

                <View style={{flexDirection:'row'}}>
                    <View style={{flex:2}}>
                        <Label size='md' type='title' text={`使用范围:${range}`}/>
                    </View>
                    <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                           style={{width: 15, height: 15,flex:1,marginRight:60}}
                    />
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

// id (integer, optional): 卡编号,
// plate (string, optional): 车牌号码,
// plateColor (string, optional): 车牌颜色:数据字典——PLATE_COLOR,
// type (string, optional): 卡类型:数据字典——CARD_TYPE,
// price (number, optional): 价格：元,
// term (integer, optional): 有效期：天,
// range (string, optional): 适用范围,
// validTime (string, optional): 生效时间：YYYY-MM-DD,
// invalidTime (string, optional): 结束时间：YYYY-MM-DD
MouthCardView.propTypes = {
    id: PropTypes.number,
    plate: PropTypes.string,
    plateColor: PropTypes.string,
    typ: PropTypes.string,
    price: PropTypes.number,
    term: PropTypes.number,
    range: PropTypes.string,
    validTime: PropTypes.string,
    invalidTime: PropTypes.string,
}

MouthCardView.defaultProps = {
    id: 0,
    plate: '',
    plateColor: '0',
    typ: '',
    price: 0,
    term: 0,
    range: '',
    validTime: '',
    invalidTime: '',
}


export default MouthCardView