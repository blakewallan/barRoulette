 'use strict';
 
var React = require('react-native');
 
var {
  Alert,
  AsyncStorage,
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Image,
  TextInput,
  BackAndroid
} = React;
 
var Firebase = require('firebase');

var icon = require('./img/Beer-icon.png');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');


 var Signup = React.createClass({

  componentDidMount: function(){
    console.log('works');
    var that = this;
    BackAndroid.addEventListener('hardwareBackPress', function() {
      console.log(that);
        that.props.navigator.pop(that);
        return true;
    });

  },

  getInitialState: function() {
    return {
      email: '',
      password: '',
      password2: '',
      firebaseRef: new Firebase('boiling-heat-8965.firebaseIO.com')
    }
  },

  checkStorage: function(){
    AsyncStorage.getItem("myKey").then((value) => {
      this.setState({"myKey": value});
      console.log(this.state);
    }).done();
  },

  addUser: function(){
    var Login = require('./login.android');

    this.checkStorage();

    var uid = '';

    var userObj = {
      email: this.state.email,
      password: this.state.password
    };

    var that = this;

    this.state.firebaseRef.createUser(userObj, function(error, userData) {
      if (error) {
        //console.log("Error creating user:", error);
        Alert.alert('Error Signing Up', error.toString());
      }
      else {
        uid = userData.uid;
        //console.log("Successfully created user account with uid:", userData.uid);
        that.props.navigator.push({
           title: 'The child title',
           component: Login,
           passProps: {"Message": "Thank you for signing up, please login to proceed"}
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
          <Text style={styles.h1}> Sign Up </Text>
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
        <Text style={styles.whiteFont}> Confirm Password </Text>
        <TextInput
          password={true}
          style={styles.textInput}
          onChangeText={(password2) => this.setState({password2})}
          value={this.state.password2}/>
        <View style={styles.forgotContainer}>
          <Text style={styles.greyFont}>Forgot Password</Text>
        </View>
        <View style={styles.signin}>
          <Text style={styles.whiteFont} onPress={() => this.signIn()}>Sign In</Text>
        </View>
        <View style={styles.signup}>
          <Text style={styles.greyFont}>Dont have an account?<Text style={styles.whiteFont} onPress={() => this.addUser()}> Sign Up</Text></Text>
        </View>
      </View>
    );
  }
});
 
var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#0B0B0D'
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
    color: 'white',
    fontFamily: 'lucida grande'
  },

  mark: {
    width: 200,
    height: 200
  },
  signin: {
    backgroundColor: '#93627c',
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
 
module.exports = Signup;





