import {Component} from "react";
import {commonStyle} from "../constants/commonStyle";
import Label from "teaset/components/Label/Label";
import {View} from "react-native";
import React from "react";
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
