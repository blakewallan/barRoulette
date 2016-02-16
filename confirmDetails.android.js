'use strict';
 
var React = require('react-native');

var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var uberBtn = require('./img/uberBtn.png');
var icon = require('./img/Beer-icon.png');
 
var {
  AsyncStorage,
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  BackAndroid,
  Image,
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
    return {
      url: 'IDK'
    };
  },

  openUber: function(){
    var uberView = require('./uberView.android');
    var userLat = (this.props.route.passProps.userCoords.lat);
    var userLng = (this.props.route.passProps.userCoords.lng);
    var destLat = (this.props.route.passProps.destCoords.lat);
    var destLng = (this.props.route.passProps.destCoords.lng);

    this.props.navigator.push({
      title: 'BAR',
      component: uberView,
      passProps: {userLat: userLat, userLng: userLng, destLat: destLat, destLng: destLng}
    })

  },
  
  render: function() {

      return (

      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Image style={styles.icon} source={icon} />
        </View>
        <View style={styles.header}>
          <Text style={styles.h1}> Ready to go? </Text>
        </View>
        <View style={styles.iconContainer}>
          <Image style={styles.uberBtn} source={uberBtn} >
            <View>
              <Text style={styles.whiteFont} onPress={() => this.openUber()}> {this.props.route.passProps.price} </Text>
            </View>
          </Image>
        </View>
      </View>

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
  },

  uberBtn: {
    width: windowSize.width,
    height: 100,
    padding: 20,
    flex: .2,
    alignItems: 'center'
  },

  header: {
    alignItems: 'center',
  },

  h1: {
    fontSize: 60,
    color: 'white',
    fontFamily: 'lucida grande'
  },

  greyFont: {
    color: '#D8D8D8'
  },
  whiteFont: {
    color: '#FFF',
    fontSize: 30,
    marginTop: 10,
    textAlign: 'right'
  }
});
 
module.exports = confirmDetails;

