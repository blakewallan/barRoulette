/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';
 
var React = require('react-native');
 
var {
  AppRegistry,
  AsyncStorage,
  BackAndroid,
  StyleSheet,
  Navigator,
  Text,
} = React;

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});
 
var stupidnavshit = React.createClass({

  componentDidMount: function(){
    AsyncStorage.getItem("myKey").then((value) => {
      this.setState({'myKey': value});
    }).done();

    // AsyncStorage.clear(function(res){
    //   console.log(res);
    // })
  },

  getInitialState: function(){
      return {'myKey': 'loading' };
  },

  _renderScene: function(route, navigator) {
    var Component = route.component;
    return (
      <Component {...route.props} navigator={navigator} route={route}/>
    );
  },

  render: function() {

    if (this.state.myKey === "myValue") {
      var Child = require('./child.android');
      var Info = require('./infoscreen.android');
      return(
        <Navigator
         initialRoute={{
         title: 'My Root',
         component: Child
         }}
        renderScene={this._renderScene}/>
      )
    }
    if (this.state.myKey === "loading"){
      return (

        <Text>LOADING</Text>

      )
    } 
    else {
      var Login = require('./login.android');
      return (
      <Navigator
         initialRoute={{
         title: 'My Root',
         component: Login
         }}
        renderScene={this._renderScene}/>
      )
    }
  }
});

 
AppRegistry.registerComponent('stupidnavshit', () => stupidnavshit);













