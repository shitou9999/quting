import React from 'react';
import {Image, StyleSheet, View, ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';

/**
 *  placeholderSource={require('../assets/images/me_car_empty.png')}
 */
class ImageView extends React.PureComponent {

    static propTypes = {
        source: PropTypes.object,
        style: ViewPropTypes.style,
        placeholderSource: PropTypes.number.isRequired,
    };

    // state: {
    //     source: {},
    //     loading: boolean
    // };

    constructor(props) {
        super(props);
        this.state = {
            source: this.props.source,
            loading: true,
        };
    }

// <View style={this.props.style}>
// <Image style={[this.props.style, styles.imageStyle]} source={this.props.source}
// onLoad={() => this.setState({loading: false})}/>
// {this.state.loading ?
//     <Image style={[this.props.style, styles.imageStyle]} source={this.props.placeholderSource}/> : null}
// </View>

    render() {
        return (
            <Image source={this.state.source} style={this.props.style} onLoad={() => {
                this.setState({loading: false})
            }} onLoadEnd={() => {
                if (this.state.loading === true) {
                    this.setState({source: this.props.placeholderSource})
                }
            }}/>
        );
    }

}

const styles = StyleSheet.create({
    imageStyle: {position: 'absolute', top: 0, right: 0, left: 0, bottom: 0}
});

export default ImageView;