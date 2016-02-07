 'use strict';
 
var React = require('react-native');

var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

//Load images and such
var bg = require('./img/beer.gif');
var icon = require('./img/Beer-icon.png');

 
var {
  Alert,
  AsyncStorage,
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Image,
  TextInput
} = React;
 
var Firebase = require('firebase');

var Login = React.createClass({

  getInitialState: function() {
    return {
      email: '',
      password: '',
      firebaseRef: new Firebase('boiling-heat-8965.firebaseIO.com'),
    }
  },

  goToSignup: function(){
    var Signup = require('./signup.android');

    this.props.navigator.push({
      title: 'Signup',
      component: Signup,
      passProps: {myElement: "HI"}
    });
    console.log(this.props.navigator);
  },

  signIn: function(){
    var Child = require('./child.android');
    var Info = require('./infoscreen.android');

    var userObj = {
      email: this.state.email,
      password: this.state.password
    };

    var that = this;

    this.state.firebaseRef.authWithPassword(userObj, function(error, userData) {
      if (error) {
        //console.log("Error creating user:", error);
        Alert.alert('Invalid Login', error.toString());
      } else {
        //console.log("Successfully Logged in:", userData); 
        AsyncStorage.setItem('myKey', 'myValue');

        that.props.navigator.push({
          title: 'Home',
          component: Child,
          passProps: {myElement: userData}
        })
      }})
  },

  render: function() {

    return (
      <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Image style={styles.icon} source={icon} />
            </View>
            <View style={styles.header}>
                <Text style={styles.h1}> Bar Roulette </Text>
            </View>
              <Text style={styles.whiteFont}> Email </Text>
              <TextInput 
                style={styles.textInput}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}/>
              <Text style={styles.whiteFont}> Password </Text>
              <TextInput
                password={true}
                style={styles.textInput}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}/>
            <View style={styles.forgotContainer}>
                    <Text style={styles.greyFont}>Forgot Password</Text>
                </View>
            <View style={styles.signin}>
                <Text style={styles.whiteFont} onPress={() => this.signIn()}>Sign In</Text>
            </View>
            <View style={styles.signup}>
                <Text style={styles.greyFont}>Dont have an account?<Text style={styles.whiteFont} onPress={() => this.goToSignup()}> Sign Up</Text></Text>
            </View>
      </View>
    );
  }
});
 
var styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#334D5C'
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
      flex: .15
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


 
module.exports = Login;




    
