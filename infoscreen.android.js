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
      
    };
  },

  componentDidMount: function() {
    
  },

  onPressSlide: function(index){
  	console.log(index);
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

           <View style={{width: width,height:height,backgroundColor:'#EBAF27'}}>
             <Text style={styles.title}>Page 1</Text>
           </View>


           <View style={{width:width,height:height,backgroundColor:'#bbb'}}>
             <Text>Page 2</Text>
           </View>


           <View style={{width:width,height:height,backgroundColor:'#ccc'}}>
             <Text>Page 3</Text>
             
           </View>

        </Carousel>
       </View>

    )
  }
});
 
var styles = StyleSheet.create({
  container: {
    flex: 1
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

