'use strict';
 
var React = require('react-native');
var RNGMap = require('react-native-gmaps');

var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
 
var {
  AsyncStorage,
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  MapView
} = React;
 
var ChildNav = React.createClass({

  getInitialState: function() {
    return {
      initialPosition: 'unknown',
      lastPosition: 'unknown'
    };
  },

  componentDidMount: function() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
  },

  loadResults: function(){
    var loadResults = require('./loadingResults.android');

    this.props.navigator.push({
      title: 'Home',
      component: loadResults,
      passProps: {location: {lat: JSON.parse(this.state.lastPosition).coords.latitude, lng: JSON.parse(this.state.lastPosition).coords.longitude}}
    })
  },
  
  render: function() {

    //console.log(this.state.lastPosition);
    if(this.state.lastPosition !== 'unknown'){

      var lat = JSON.parse(this.state.lastPosition).coords.latitude;
      var lng = JSON.parse(this.state.lastPosition).coords.longitude;

      return (

        <View>
        <RNGMap
        ref={'gmap'}
        style={ { height: windowSize.height / 2, width: windowSize.width } }
        markers={ [
          { coordinates: {lng: -18.5333, lat: 65.9667} },
          { 
            coordinates: {lng: -18, lat: 65}, 
            title: "Click marker to see this title!",
            snippet: "Subtitle",
            id: 0,
            color: 120,

            icon: require('./img/Beer-icon.png')
          }
        ] }
        zoomLevel={10}
        annotations= {this.markers}
        onMapChange={(e) => console.log(e)}
        onMapError={(e) => console.log('Map error --> ', e)}
        center={ { lng: lng, lat: lat } } 
        /*
         * clickMarker shows Info Window of Marker with id: 0,
         * hides Info Window if given null
         */
         clickMarker={null}
        />

        <View style={styles.container}>
          <Text>Find your location on the map</Text>
          <View style={styles.signin}>
            <Text style={styles.whiteFont} onPress={() => this.loadResults()}>Find your bar</Text>
          </View>
        </View>


        </View>

        )
    }

    return (

      <Text>NEED TO MAKE A PAGE IF USER WONT TURN ON GPS</Text>
      
    )
  }
});
 
var styles = StyleSheet.create({
  container: {
    backgroundColor: '#66E893',
    height: windowSize.height / 2
  },
  text: {
    flex: 2,
    fontSize: 18,
    color: '#fff',
  },
  button: {
    
  },
  btnText: {
    
  },
  signin: {
    backgroundColor: '#93627c',
    padding: 20,
    alignItems: 'center'
  },
  whiteFont: {
    color: '#FFF',
    fontSize: 20
  }
});
 
module.exports = ChildNav;

