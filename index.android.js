'use strict';
 
var React = require('react-native');
 
var {
  AppRegistry,
  AsyncStorage,
  BackAndroid,
  StyleSheet,
  Navigator,
  Text,
  View,
  Image
} = React;

var icon = require('./img/Beer-icon.png');

 
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

        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Image style={styles.icon} source={icon} />
          </View>
          <View style={styles.header}>
            <Text style={styles.h1}> Picking Your Bar! </Text>
          </View>
        </View>

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

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#334D5C'
  },

  //bg: {
  //  position: 'absolute',
  //  left: 0,
  //  top: 0,
  //  width: windowSize.width,
  //  height: windowSize.height
  //},

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
 
AppRegistry.registerComponent('stupidnavshit', () => stupidnavshit);













