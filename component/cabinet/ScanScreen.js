import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ToastAndroid
} from 'react-native';
import {RNCamera} from 'react-native-camera';
const ServerUrl=require('./../../app').server;

export default class ScanScreen extends Component {
  static navigationOptions= {
    title: '扫码添加',
    headerStyle: {                                 //导航栏样式设置
      backgroundColor: '#3f475e',
    },
    headerTintColor: '#1fe0f3'
  };
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.camera}
          onBarCodeRead={this.barcodeRead.bind(this)}
          barCodeTypes = {[RNCamera.Constants.BarCodeType.qr]}
        >
          <Image source={{uri:'scan_bg'}} style={{flex:1}}/>
        </RNCamera>
      </View>
    )
  }
  barcodeRead(res){
    ToastAndroid.show("扫描成功",ToastAndroid.SHORT);
    let url=ServerUrl+'addTea';
    fetch(url,{
      headers: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      body:JSON.stringify({id:this.props.navigation.state.params.cabinetId,data:res.data})
    }).then(res=>res.json()).then(res=>{
      if(res.status===0){
        ToastAndroid.show(res.msg,ToastAndroid.SHORT);
        this.props.navigation.navigate('Detail');
      }

    }).catch(err=>console.log(err));
    console.log(this.props.navigation.state.params.cabinetId);
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera:{
    flex:1
  },
  innerCamera:{
    width:300,
    height:300
  }
});