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
      <Image source={require('./img/beerlabels.png')} style={styles.backgroundImage}>

    <View style={styles.container}>

        <Text style={styles.welcome}>
          Welcome to Bar Roulette!
        </Text>
        <Text style={styles.instructions}>
          email
        </Text>
        <TextInput 
          style={styles.textInput}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
        <Text style={styles.instructions}>
          password
        </Text>
        <TextInput
          password={true}
          style={styles.textInput}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />
      <TouchableHighlight
        onPress={() => this.addUser()}>
        <Text>Signup</Text>
        </TouchableHighlight>
      </View>
    </Image>
    );
  }
});
 
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },
  instructions: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 5
  },
  textInput: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    color: 'white'
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  }
});
 
module.exports = Signup;





