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
  AsyncStorage,
  MapView
} = React;
 
var loadingResults = React.createClass({

	callAPI: function(){
    var clientID = '3TNAEDBR0Y0M40L4NJQLWD20N4MJZB5ZVUEXMMJQ0KL3N5MP';
    var clientSecret = 'T4AUCHVFS5VAL1KEGMQ2QJ5FQGZQOEQ40AMAFKRNKCK1VGFL';

		var lat = this.props.route.passProps.location.lat;
		var lng = this.props.route.passProps.location.lng;

    var confirmDetails = require('./confirmDetails.android');

    fetch('https://api.foursquare.com/v2/venues/search?client_id='+ clientID +'&client_secret='+ clientSecret +'&v=20130815%20&categoryId=4bf58dd8d48988d116941735&radius=1000&ll='+ lat +','+ lng)
      .then((response) => response.text())
      .then((responseText) => {
        var bars = (JSON.parse(responseText).response.venues);
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
})
 
var styles = StyleSheet.create({
  container: {
    
  },
  text: {
    flex: 2,
    fontSize: 18,
    color: '#fff',
  },
  button: {
    
  },
  btnText: {
    
  }
});
 
module.exports = loadingResults;

