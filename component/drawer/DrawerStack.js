import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {DrawerItems, SafeAreaView} from 'react-navigation';

class DrawerBar extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <TouchableOpacity style={styles.drawerBar}>
        <View style={{flexDirection:'row'}}>
          <Image source={{uri:this.props.icon}} style={{width:25,height:25}} />
          <Text style={styles.barTitle}>{this.props.title}</Text>
        </View>
        <Image source={{uri:'icon_arrow_right'}} style={{width:20,height:20}} />
      </TouchableOpacity>
    )
  }
}

export default class CustomDrawer extends Component{
  constructor(props){
    super(props);                       //通过super传入上层调用的props
  }
  render(){
    return (
      <ScrollView style={styles.drawerWrap}>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
          {/*自定义区域*/}
          <View style={styles.userWrap}>
            <Image source={{uri:'user_tory'}} style={styles.userPic} />
            <Text style={styles.username}>Super Tory</Text>
          </View>
          <View style={{marginTop:20}}>
            <DrawerBar title='信息' icon='drawer_message'/>
            <DrawerBar title='设置' icon='drawer_set'/>
            <DrawerBar title='扫码' icon='drawer_scan'/>
            <DrawerBar title='帮助' icon='drawer_help'/>
            <DrawerBar title='反馈' icon='drawer_feedback'/>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const DevWidth=require('Dimensions').get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerWrap:{
    backgroundColor:'#444e5a'
  },
  userWrap:{
    alignItems:'center',
    marginTop:50
  },
  userPic:{
    width:80,
    height:80,
    borderRadius:40,
    borderWidth:2,
    borderColor:'#1fe0f3'
  },
  username:{
    color:'#fff',
    fontSize:15,
    marginTop:10
  },
  drawerBar:{
    width:DevWidth*0.6,
    height:50,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingLeft:10,
    paddingRight:10,
    borderBottomWidth:1,
    borderBottomColor:'#1fe0f3'
  },
  barTitle:{
    fontSize:18,
    color:'#fff',
    marginLeft:10
  }
});