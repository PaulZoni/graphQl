import PropTypes from 'prop-types';
import React from 'react';
import {requireNativeComponent} from 'react-native'

var RNTMap = requireNativeComponent('RNTMap', MapView);

export default class MapView extends React.Component {

    static propTypes = {
        zoomEnabled: PropTypes.bool,
        region: PropTypes.shape({
            latitude:PropTypes.number.isRequired,
            longitude: PropTypes.number.isRequired,
            latitudeDelta: PropTypes.number.isRequired,
            longitudeDelta: PropTypes.number.isRequired,
        })

    };

    render() {
        return(
            <RNTMap{...this.props}/>
        )
    }

}