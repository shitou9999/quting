import React,{Component} from "react";
import {commonStyle} from "../constants/commonStyle";
import {Input, ListRow, Button, Overlay, Label, Toast} from "../components/teaset/index"
import {View} from "react-native";
import PropTypes from "prop-types";


class SectionHeaderView extends Component {

    static propTypes = {
        headTitle: PropTypes.string
    }

    render() {
        return (
            <View style={{
                height: 40,
                flexDirection: commonStyle.row,
                alignItems: commonStyle.center,
                marginLeft: commonStyle.marginLeft
            }}>
                <Label text={this.props.headTitle} size={'md'} type={'title'}/>
            </View>
        )
    }

}

export default SectionHeaderView
