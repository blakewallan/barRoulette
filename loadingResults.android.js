'use strict';
 
var React = require('react-native');

var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
 
var {
  AsyncStorage,
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  MapView,
  BackAndroid
} = React;
 
var loadingResults = React.createClass({

	callAPI: function(){
    var key = 'AIzaSyCt9duN2xXtOGOPuBegUgIuLC4sMjAM5f0';

		var lat = this.props.route.passProps.location.lat;
		var lng = this.props.route.passProps.location.lng;

    var confirmDetails = require('./confirmDetails.android');

    fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+ lat +','+ lng +'&radius=500&types=bar&opennow&key='+ key)
      .then((response) => response.text())
      .then((responseText) => {
        var bars = (JSON.parse(responseText).results);
        var rand = Math.floor((Math.random() * bars.length) + 1);
        var theBar = bars[rand];
        console.log(theBar);
        this.props.navigator.push({
            title: 'BAR',
            component: confirmDetails,
            passProps: {bar: theBar}
          })
      })
      .catch((error) => {
      console.warn(error);
    });

	},

  componentDidMount: function() {
    this.callAPI();
  },
  
  render: function() {

      return (

     	<View>

          <Text>Find your location on the map</Text>
        </View>

        )
	}    
});
 
var styles = StyleSheet.create({
  container: {
    
  },
  text: {
    flex: 2,
    fontSize: 18,
    color: '#fff'
  },
  button: {
    
  },
  btnText: {
    
  }
});
 
module.exports = loadingResults;

