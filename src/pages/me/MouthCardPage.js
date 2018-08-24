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
    Image,
    TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Label from 'teaset/components/Label/Label'
import MouthCardView from '../../components/MouthCardView'

class MouthCardPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         title: navigation.getParam('otherParam', 'A Nested Details Screen'),
    //     };
    // };
    componentDidMount() {
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate('BuyCardPage')
                }}>
                    <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'white'}}>
                        <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                               style={{width: 100, height: 50}}
                        />
                        <View style={{flexDirection:'row',marginLeft:5}}>
                            <Label size='md' type='title' text='海量停车场月卡等着你!'/>
                            <Label size='md' type='title' text='立即购买'/>
                        </View>
                    </View>
                </TouchableOpacity>
                <MouthCardView/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
    },
});

const mapState = (state) => ({
    nav: state.nav,
});

const dispatchAction = (dispatch) => ({
    // login: (user, pwd) => dispatch(userActions.login(user, pwd))
    // loginAction: bindActionCreators(loginActions, dispatch),
    // userAction: bindActionCreators(userActions, dispatch)
});

export default connect(mapState, dispatchAction)(MouthCardPage)