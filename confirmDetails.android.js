'use strict';
 
var React = require('react-native');

var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var uberBtn = require('./img/uberBtn.png');
 
var {
  AsyncStorage,
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  BackAndroid,
  Image
} = React;
 
var confirmDetails = React.createClass({


  componentDidMount: function() {
    var that = this;
    BackAndroid.addEventListener('hardwareBackPress', function() {
      console.log(that);
      that.props.navigator.pop(that);
      return true;
    })
  },
  
  render: function() {

      return (

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.h1}> Ready to go? </Text>
        </View>
        <View style={styles.iconContainer}>
          <Image style={styles.icon} source={uberBtn} />
        </View>
        <View>
          <Text>{this.props.route.passProps.bar.name}</Text>
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
    width: windowSize.width,
    height: 100,
    padding: 20,
    flex: .5,
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

  mark: {
    width: 200,
    height: 200
  },
  signin: {
    backgroundColor: '#D5080D',
    padding: 20,
    alignItems: 'center'
  },
  signup: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: .15,
    marginBottom: 20
  },
  inputs: {
    marginTop: 1,
    marginBottom: 1,
    flex: .35,
    backgroundColor: 'white',
    opacity: 0.5
  },
  textInput: {
    backgroundColor: 'white',
    opacity: 0.5,
    marginBottom: 10
  },

  forgotContainer: {
    alignItems: 'flex-end',
    padding: 15,
  },
  greyFont: {
    color: '#D8D8D8'
  },
  whiteFont: {
    color: '#FFF',
    fontSize: 20
  }
});
 
module.exports = confirmDetails;

