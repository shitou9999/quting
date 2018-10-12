import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, StatusBar} from 'react-native';
import PropTypes from 'prop-types'
import Label from 'teaset/components/Label/Label'
import {commonStyle} from "../constants/commonStyle"

class SearchView extends Component {

    static propTypes = {
        searchClick: PropTypes.func
    }

    render() {
        return (
            <View>
                {/*没有StatusBar则显示黑色*/}
                <StatusBar
                    backgroundColor={commonStyle.themeColor}
                    translucent={true}/>
                {/*没有View则TitleBar会被盖住*/}
                <View style={styles.statusBar}/>
                <View style={{
                    height: 50,
                    backgroundColor: commonStyle.themeColor,
                    alignItems: commonStyle.center,
                    justifyContent: commonStyle.center
                }}>
                    <TouchableOpacity onPress={() => {
                        this.props.searchClick && this.props.searchClick()
                    }}>
                        <View style={{
                            flex: 1,
                            height: 20,
                            width: gScreen.screen_width - 20,
                            borderRadius: 5,
                            backgroundColor: commonStyle.white,
                            justifyContent: commonStyle.center,
                            marginTop: commonStyle.margin - 5,
                            marginBottom: commonStyle.margin - 5
                        }}>
                            <Label text={'搜索目的地'} style={{
                                alignItems: commonStyle.center,
                                textAlign: commonStyle.center,
                                justifyContent: commonStyle.center
                            }}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    statusBar: {
        width: gScreen.screen_width,
        height: gScreen.statusBarHeight,
        backgroundColor: commonStyle.themeColor
    }
})

export default SearchView
