import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid
} from 'react-native';
const ServerUrl=require('./../../app').server;

export default class RegisterScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      phone:''
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')}>
            <Image source={{uri:'log_back'}} style={styles.backBtn} />
          </TouchableOpacity>
        </View>
        <View style={styles.logoWrapper}>
          <Image source={{uri:'app_logo'}} style={styles.logo} />
        </View>
        <View style={styles.inputWrapper}>
          <View style={styles.inputBox}>
            <Image source={{uri:'log_name'}} style={styles.inputIcon} />
            <TextInput placeholder="请输入用户名"  name="username"
                       style={styles.inputText}
                       placeholderTextColor='#8596a6'
                       underlineColorAndroid='transparent'
                       value={this.state.username} onChangeText={this.updateName.bind(this)}
            />
          </View>
          <View style={styles.inputBox}>
            <Image source={{uri:'reg_phone'}} style={styles.inputIcon} />
            <TextInput placeholder="请输入手机号码"  name="username"
                       style={styles.inputText}
                       placeholderTextColor='#8596a6'
                       underlineColorAndroid='transparent'
                       value={this.state.phone} onChangeText={this.updatePhone.bind(this)}
            />
          </View>
          <View style={styles.inputBox}>
            <Image source={{uri:'log_password'}} style={styles.inputIcon} />
            <TextInput placeholder="请输入密码" name="password"
                       placeholderTextColor='#8596a6'
                       underlineColorAndroid='transparent'
                       secureTextEntry={true} style={styles.inputText}
                       value={this.state.password} onChangeText={this.updatePassword.bind(this)}
            />
          </View>
          <TouchableOpacity style={styles.btnWrapper} onPress={this.login.bind(this)}>
            <Text style={styles.logBtn}>注册</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  updateName(text){
    this.setState({
      username:text
    });
  }
  updatePassword(text){
    this.setState({
      password:text
    });
  }
  updateName(text){
    this.setState({
      username:text
    });
  }
  updatePhone(text){
    this.setState({
      phone:text
    });
  }
  login(){
    fetch(ServerUrl+'register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'username='+this.state.username+"&phone="+this.state.phone
            +"&password="+this.state.password
    }).then(res=>res.json()).then(res=>{
      if (res.status===0){
        this.props.navigation.navigate('Login')
      }else {
        ToastAndroid.show(res.msg,ToastAndroid.SHORT);
      }
    }).catch(err=>console.log(err))
  }
}

const DevWidth=require('Dimensions').get('window').width;
const DevHeight=require('Dimensions').get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#3f475e'
  },
  header:{
    height:DevHeight*0.1
  },
  backBtn:{
    width:30,
    height:30,
    marginTop:10,
    marginLeft:10
  },
  logoWrapper:{
    width:DevWidth,
    height:DevHeight*0.3,
    justifyContent:'center',
    alignItems:'center'
  },
  logo:{
    width:DevWidth*0.6,
    height:DevHeight*0.2,
    resizeMode:'stretch'
  },
  inputWrapper:{
    width:DevWidth,
    height:DevHeight*0.4,
    alignItems:'center',
    justifyContent:'center'
  },
  inputBox:{
    width:DevWidth*0.8,
    height:60,
    borderBottomWidth:1,
    borderBottomColor:'#606879',
    flexDirection:'row',
    alignItems:'center'
  },
  inputIcon:{
    width:30,
    height:30
  },
  inputText:{
    color:'#8596a6',
    width:200,
    marginLeft:10,
    fontSize:18
  },
  btnWrapper:{
    width:260,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:'#1fe0f3',
    marginTop:30
  },
  logBtn:{
    fontSize:18,
    color:'#675f68'
  },
  footer:{
    height:DevHeight*0.2,
    justifyContent:'center',
    alignItems:'center'
  },
  register:{
    fontSize:16,
    color:'#fff'
  }
});
