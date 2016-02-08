'use strict';

var React = require('react-native');

var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var uberBtn = require('./img/uberBtn.png');
var icon = require('./img/Beer-icon.png');

var {
  StyleSheet,
  View,
  Text,
  BackAndroid,
  WebView
  } = React;

var confirmDetails = React.createClass({


  componentDidMount: function() {
    var that = this;
    BackAndroid.addEventListener('hardwareBackPress', function () {
      console.log(that);
      that.props.navigator.pop(that);
      return true;
    })
  },

  getInitialState: function() {
    var userLat = this.props.route.passProps.userLat;
    var userLng = this.props.route.passProps.userLng;
    var destLat = this.props.route.passProps.destLat;
    var destLng = this.props.route.passProps.destLng;
    console.log(userLat);
    return {
      url: 'https://m.uber.com/sign-up?&pickup_latitude='+ userLat +'&pickup_longitude='+ userLng +'&dropoff_latitude='+ destLat +'&dropoff_longitud='+ destLng +'&client_id=rBA_azhU7byTRXyl_Xt9hoK1z9aTfydC'
    };
  },

  render: function() {

    return (

      <WebView
        url={this.state.url}
        javaScriptEnabled={true}
      />
    )
  }
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#400017'
  },

  iconContainer: {
    marginTop: 100,
    alignItems: 'center'
  },

  icon: {
    width: 200,
    height: 200,
    padding: 20,
    flex: .5,
    alignItems: 'center'
  }

});

module.exports = confirmDetails;

