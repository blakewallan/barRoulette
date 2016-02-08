'use strict';
 
var React = require('react-native');

var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var icon = require('./img/Beer-icon.png');
 
var {
  AsyncStorage,
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Image
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
        var endLat = theBar.geometry.location.lat;
        var endLng = theBar.geometry.location.lng;
        console.log(theBar);
        fetch('https://api.uber.com/v1/estimates/price?start_latitude='+ lat +'&start_longitude='+ lng +'&end_latitude='+ endLat +'&end_longitude='+ endLng +'&server_token=rrbj2kEDJN7cbRojTjG7rjzyeXmio_u1V_on544L')
          .then((response) => response.text())
          .then((responseText) => {
            var price = (JSON.parse(responseText).prices[0].estimate);
            this.props.navigator.push({
              title: 'BAR',
              component: confirmDetails,
              passProps: {bar: theBar, price: price, userCoords: {lat: lat, lng: lng}, destCoords: {lat: endLat, lng: endLng}}
            })
          })
        .catch((error) => {
          console.warn(error)
        })
      })
      .catch((error) => {
      console.warn(error);
    });

	},

  componentDidMount: function() {
    setTimeout( () => {
      this.callAPI();
    },3000);

  },
  
  render: function() {

      return (

        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Image style={styles.icon} source={icon} />
          </View>
          <View style={styles.header}>
            <Text style={styles.h1}> Picking Your Bar... </Text>
          </View>
        </View>

        )
	}    
});
 
var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#66E893'
  },

  bg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: windowSize.width,
    height: windowSize.height
  },

  iconContainer: {
    marginTop: 100,
    alignItems: 'center'
  },

  icon: {
    width: 200,
    height: 200,
    alignItems: 'center'
  },

  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: .5,
  },

  h1: {
    fontSize: 60,
    color: 'white'
  },

  greyFont: {
    color: '#D8D8D8'
  },
  whiteFont: {
    color: '#FFF',
    fontSize: 20
  }
});
 
module.exports = loadingResults;

