/**
 * Created by cyh on 2018/8/13.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import {connect} from 'react-redux';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import Input from 'teaset/components/Input/Input';
import ListRow from 'teaset/components/ListRow/ListRow';

import Loading from '../../components/Loading';
import LoadingModal from '../../components/LoadingModal';

import MeStyle from '../../assets/styles/MeStyle';
import Global from '../../constants/global';
import BeeUtil from '../../utils/BeeUtil';

//充值
class UserRechargePage extends Component {

    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this)
        this.state = {
            textPrice: '',
            overagePrice: 0,
            checkOne: false,
            checkTwo: false,
            checkThree: false,
            checkFour: false,
        }
    }


    onSelect(index, value) {
        if (index === 0) {
            this.setState({
                checkOne: true,
                checkTwo: false,
                checkThree: false,
                checkFour: false,
            })
        } else if (index === 1) {
            this.setState({
                checkOne: false,
                checkTwo: true,
                checkThree: false,
                checkFour: false,
            })
        } else if (index === 2) {
            this.setState({
                checkOne: false,
                checkTwo: false,
                checkThree: true,
                checkFour: false,
            })
        } else if (index === 3) {
            this.setState({
                checkOne: false,
                checkTwo: false,
                checkThree: false,
                checkFour: true,
            })
        }
        this.setState({
            textPrice: `Selected index: ${index} , value: ${value}`,
        })
    }

    userCheckBt() {
        return {}
    }

    userNoCheckBt() {
        return {}
    }


    render() {
        const {me} = this.props
        if (BeeUtil.isNotEmpty(me.overagePrice)) {
            this.overagePrice = me.overagePrice
        }
        // let radioStyle = {};
        // radioStyle = {
        //     flexDirection: 'row',
        //     alignItems: 'center',
        //     marginLeft: margin,
        // }
        const {checkOne, checkTwo, checkThree, checkFour}=this.state

        return (

            <View style={styles.container}>
                <ListRow
                    style={MeStyle.listRow}
                    title='账号信息'
                    detail={this.overagePrice}
                    bottomSeparator='full'/>
                <Input
                    style={styles.input}
                    size='lg'
                    value={this.state.textPrice}
                    placeholder='充值金额'
                    onChangeText={text => this.setState({textPrice: text})}
                />

                <RadioGroup
                    style={styles.group}
                    thickness={0}
                    size={0}
                    highlightColor='#ccc8b9'
                    onSelect={(index, value) => this.onSelect(index, value)}
                >
                    <RadioButton value={'50'}
                                 style={styles.radio}>
                        <Text style={styles.radioText}>50元</Text>
                    </RadioButton>

                    <RadioButton value={'100'}
                                 style={styles.radio}>
                        <Text style={styles.radioText}>100元</Text>
                    </RadioButton>

                    <RadioButton value={'200'}
                                 style={styles.radio}>
                        <Text style={styles.radioText}>200元</Text>
                    </RadioButton>

                    <RadioButton value={'500'}
                                 style={styles.radio}>
                        <Text style={styles.radioText}>500元</Text>
                    </RadioButton>

                </RadioGroup>
                {/*<Label style={{color: '#8a6d3b', fontSize: 16}} text='Hello world'/>*/}
                <RadioGroup
                    thickness={0}
                    size={10}
                    highlightColor='#ccc8b9'
                    onSelect={(index, value) => this.onSelect(index, value)}
                >
                    <RadioButton value={'钱包'}>
                        <Text style={styles.radioText}>钱包</Text>
                    </RadioButton>

                    <RadioButton value={'支付宝'}>
                        <Text style={styles.radioText}>支付宝</Text>
                    </RadioButton>

                    <RadioButton value={'微信'}>
                        <Text style={styles.radioText}>微信</Text>
                    </RadioButton>

                </RadioGroup>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
    },
    input: {
        width: Global.SCREEN_WIDTH,
        height: 50,
        borderColor: '#FFF',
        borderRadius: 0,
        marginTop: 5,
    },
    group: {
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    radio: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#7FFF00',
        alignItems: 'center',
    },
    radioText: {
        color: 'red',
    }
});

const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me
});

const dispatchAction = (dispatch) => ({
    // loginAction: bindActionCreators(loginActions, dispatch),
});

export default connect(mapState, dispatchAction)(UserRechargePage);