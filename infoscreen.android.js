'use strict';
 
var React = require('react-native');

var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var Carousel = require('react-native-spring-carousel');

 
var {
  AsyncStorage,
  StyleSheet,
  View,
  TouchableHighlight,
  Text
} = React;
 
var Info = React.createClass({

  getInitialState: function() {
    return {
      ok: "ok"
      
    };
  },

  componentDidMount: function() {
    
  },

  onPressSlide: function(index){
  	console.log(index);
  },

  goNext: function(){

    var mainScreen = require('./child.android');

    this.props.navigator.push({
      title: 'BAR',
      component: mainScreen,
      //passProps: {userLat: userLat, userLng: userLng, destLat: destLat, destLng: destLng}
    })

  },
  
  render: function() {

  	var width = windowSize.width;
  	var height = windowSize.height;

    return (

    	<View style={styles.container}>
       <Carousel
        width={windowSize.width}
        height={windowSize.height}
        pagerColor="#000"
        activePagerColor="#ff0000"
        pagerSize={10}
        pagerOffset={10}
        pagerMargin={2}
        speed={4000}
        onPress={this.onPressSlide}
        >

           <View style={{width: width,height:height,backgroundColor:'#400017'}}>
             <Text style={styles.title}>Welcome to bar Roulette</Text>
             <Text style={styles.whiteFont}>
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam laoreet porta leo, eu posuere purus pharetra sit amet. Suspendisse lobortis, felis a ullamcorper hendrerit, libero orci bibendum diam, at tincidunt ante massa bibendum lacus. Maecenas facilisis orci eget posuere placerat. Nulla condimentum diam vel orci fermentum, quis finibus leo imperdiet. Phasellus tellus ligula, bibendum in justo a, gravida sagittis nulla. Fusce faucibus magna sit amet justo facilisis, et dignissim erat efficitur. Donec libero est, blandit ut molestie quis, euismod nec eros. Aliquam est turpis, mollis at rutrum eu, varius in turpis.

               Morbi dignissim, elit sit amet varius lacinia, urna est malesuada lorem, ac vehicula ante dui et lectus. Praesent commodo lobortis ligula, a lacinia neque sodales id. Proin quis turpis est. Aenean tincidunt nisi eget tellus dapibus ultrices. Donec vel lectus sed orci consequat consectetur vitae vel justo. Proin pretium diam nibh, eget porttitor augue sollicitudin interdum. Etiam vulputate, nulla ac aliquet lacinia, ligula metus varius justo, at aliquet tellus risus id nibh. Proin lorem magna, vehicula quis fringilla non, porta at massa. Nullam cursus, felis ac tincidunt ullamcorper, ligula libero posuere purus, ullamcorper viverra felis tellus ac lacus. Donec sed rhoncus dui. Cras sem lectus, vulputate quis tincidunt et, suscipit ut ex. Pellentesque euismod massa eros, at sagittis dolor ultrices id.
             </Text>
           </View>


           <View style={{width:width,height:height,backgroundColor:'#66E893'}}>
             <Text style={styles.title}>More info here</Text>
             <Text style={styles.whiteFont}>
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam laoreet porta leo, eu posuere purus pharetra sit amet. Suspendisse lobortis, felis a ullamcorper hendrerit, libero orci bibendum diam, at tincidunt ante massa bibendum lacus. Maecenas facilisis orci eget posuere placerat. Nulla condimentum diam vel orci fermentum, quis finibus leo imperdiet. Phasellus tellus ligula, bibendum in justo a, gravida sagittis nulla. Fusce faucibus magna sit amet justo facilisis, et dignissim erat efficitur. Donec libero est, blandit ut molestie quis, euismod nec eros. Aliquam est turpis, mollis at rutrum eu, varius in turpis.

               Morbi dignissim, elit sit amet varius lacinia, urna est malesuada lorem, ac vehicula ante dui et lectus. Praesent commodo lobortis ligula, a lacinia neque sodales id. Proin quis turpis est. Aenean tincidunt nisi eget tellus dapibus ultrices. Donec vel lectus sed orci consequat consectetur vitae vel justo. Proin pretium diam nibh, eget porttitor augue sollicitudin interdum. Etiam vulputate, nulla ac aliquet lacinia, ligula metus varius justo, at aliquet tellus risus id nibh. Proin lorem magna, vehicula quis fringilla non, porta at massa. Nullam cursus, felis ac tincidunt ullamcorper, ligula libero posuere purus, ullamcorper viverra felis tellus ac lacus. Donec sed rhoncus dui. Cras sem lectus, vulputate quis tincidunt et, suscipit ut ex. Pellentesque euismod massa eros, at sagittis dolor ultrices id.
             </Text>
           </View>


           <View style={{width:width,height:height,backgroundColor:'#66E893'}}>
             <Text style={styles.title}>More info here</Text>
             <Text style={styles.title} onPress={() => this.goNext()}>Click to try it</Text>

           </View>

        </Carousel>
       </View>

    )
  }
});
 
var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },

  title: {
  	fontSize: 40,
  	color: 'black',
  	fontFamily: 'lucida grande'

  },

  text: {
    flex: 2,
    fontSize: 18,
    color: '#fff',
  },
  button: {
    
  },
  btnText: {
    
  }
});
 
module.exports = Info;

