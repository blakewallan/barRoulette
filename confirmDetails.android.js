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
} = React;
 
var confirmDetails = React.createClass({


  componentDidMount: function() {
    console.log(this.props.route.passProps.name);
    console.log("THING");
  },
  
  render: function() {

      return (
     	<View>

          <Text>{this.props.route.passProps.bar.name}</Text>
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
 
module.exports = confirmDetails;

