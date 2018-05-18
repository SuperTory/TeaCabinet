import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

export default class  extends Component {
  render() {
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.container}
                        onPress={()=>this.navigateTo()}>
        <Image style={styles.image} source={{uri:this.props.data.image}} />
        <View style={styles.info}>
          <Text style={styles.title}>{this.props.data.name}</Text>
          <Text style={styles.subtitle}>{this.props.data.intro}</Text>
          <Text style={styles.price}>价格：¥{this.props.data.price}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  navigateTo(){
    this.props.navigateTo(this.props.data.id);
  }
}

const DevWidth=require('Dimensions').get('window').width;
const styles = StyleSheet.create({
  container: {
    width:DevWidth,
    height:100,
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    borderBottomColor:'#67636e',
    borderBottomWidth:1,
    backgroundColor:'#3f475e'
  },
  info:{
    width:DevWidth*0.4,
  },
  image:{
    width:120,
    height:80,
    marginRight:10,
    borderRadius:10
  },
  title:{
    color:'#fff',
    fontSize:16,
    marginBottom:10,
    flexDirection:'row',
    justifyContent:'flex-end'
  },
  subtitle:{
    color:'#b3b7bf',

  },
  price:{
    color:'#ff8b69',
    alignItems:'flex-end'
  }
});