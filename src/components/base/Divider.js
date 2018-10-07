import React from 'react'
import {View} from 'react-native'
import PropTypes from 'prop-types'

import {commonStyle} from '../../constants/commonStyle'

const Divider = ({height, bgColor}) => (
    <View style={{height: height, backgroundColor: bgColor}}/>
)

Divider.defaultProps = {
    height: 10,
    bgColor: commonStyle.lineColor
}

Divider.propTypes = {
    height: PropTypes.number,
    bgColor: PropTypes.string
}

export default Divider
