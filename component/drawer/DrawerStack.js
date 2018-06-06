import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import {DrawerItems, SafeAreaView} from 'react-navigation';
const ServerUrl=require('./../../app').server;

class DrawerBar extends Component{
  constructor(props){
    super(props)
    this.state={
      login:false
    }
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
    this.state={
      login:false,
      username:"请登陆"
    }
  }

  componentDidMount() {
    fetch(ServerUrl+'checkLogin').then(res=>res.json()).then(res=>{
      if (res.status===0){
        this.setState({
          login:true,
          username:res.data.username
        })
      }
    }).catch(err=>console.log(err));
  }
  render(){
    return (
      <ScrollView style={styles.drawerWrap}>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
          {/*自定义区域*/}
          {this.renderUserInfo()}
          <View style={{marginTop:50}}>
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

  renderUserInfo(){
    if (this.state.login){
      return(
        <View style={styles.userWrap}>
          <Image source={{uri:ServerUrl+'image/userpic/'+this.state.username+'.png'}}
                 style={styles.userPic} />
          <Text style={styles.username}>{this.state.username}</Text>
          <TouchableOpacity onPress={this.logout.bind(this)}>
            <Text style={styles.userButton}>登出</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={styles.userWrap}>
          <Image source={{uri:'user_unknown'}} style={styles.userPic} />
          <TouchableOpacity onPress={this.login.bind(this)}>
            <Text style={styles.userButton}>请登陆</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
  login(){
    this.props.navigation.navigate('Login',{drawerLog:this.drawerLog.bind(this)});
  }
  drawerLog(username){
    this.setState({
      login:true,
      username:username
    })
  }
  logout(){
    fetch(ServerUrl+'logout').then(res=>res.json()).then(res=>{
      if (res.status===0){
        this.setState({
          login:false,
          username:''
        })
        ToastAndroid.show(res.msg,ToastAndroid.SHORT);
      }
    }).catch(res=>console.log(res))
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
    width:100,
    height:100,
    borderRadius:50,
    borderWidth:2,
    borderColor:'#1fe0f3'
  },
  username:{
    color:'#fff',
    fontSize:20,
    marginTop:10
  },
  userButton:{
    width:100,
    height:30,
    backgroundColor:'#1fe0f3',
    color:'#fff',
    textAlign:'center',
    lineHeight:30,
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