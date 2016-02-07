'use strict';

let React = require('react-native');

let {
  View,
  Component,
} = React;

let ERROR = 'RNGmaps is not available in iOS - use MapView.';

class RNGMaps extends Component {
  constructor (props) {
    super(props);
    console.log(ERROR);
  }

  zoomOnMarkers () { console.error(ERROR) }

  render () {
    return ( <View /> );
  }
}

module.exports = RNGMaps;
