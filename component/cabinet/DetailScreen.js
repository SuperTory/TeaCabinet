import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
const ServerUrl=require('./../../app').server;
let CabinetId=0;

export default class DetailScreen extends Component {
  static navigationOptions= {
    title: '茶叶详情',
    headerStyle: {                                 //导航栏样式设置
      backgroundColor: '#3f475e',
    },
    headerTintColor: '#1fe0f3',
  };
  constructor(props){
    super(props);
    this.state={
      cabinetData:{},
      target_temp:0,
      target_humid:0
    }
  }

  componentWillMount() {
    CabinetId=this.props.navigation.state.params.id;
    let url=ServerUrl+"cabinetData/"+CabinetId;
    fetch(url).then(res=>res.json())
      .then((res)=>{
        this.setState({
          cabinetData:res,
          target_humid:res.target_humid,
          target_temp:res.target_temp
        });
        console.log(ServerUrl + 'image/cabinet_image' + CabinetId);
      }).catch((err)=>{
      console.log(err);
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.chart}>
          <AnimatedCircularProgress
            size={150}
            width={5}
            rotation={-180}
            prefill={0}
            fill={this.state.cabinetData.current_temp||0 }
            tintColor="#1fe0f3"
            backgroundColor="#3d5875">
            {
              (fill) => (
                <Text style={styles.chartText}>
                  温度：{Math.floor(fill) }℃
                </Text>
              )
            }
          </AnimatedCircularProgress>
          <AnimatedCircularProgress
            size={150}
            width={5}
            rotation={-180}
            prefill={0}
            fill={this.state.cabinetData.current_humid||0}
            tintColor="#1fe0f3"
            backgroundColor="#3d5875">
            {
              (fill) => (
                <Text style={styles.chartText}>
                  湿度：{ Math.floor(fill)}%
                </Text>
              )
            }
          </AnimatedCircularProgress>
        </View>
        <View style={styles.info}>
          <View style={styles.infoLeft}>
            <Image source={{uri:ServerUrl+'image/cabinet_image'+CabinetId+'.jpg'}}
                   style={styles.infoImage} />
          </View>
          <View>
            <Text style={styles.infoTitle}>{this.state.cabinetData.tea}</Text>
            <View style={styles.infoColumn}>
              <Text style={styles.introTitle}>产地：</Text>
              <Text style={styles.introValue}>{this.state.cabinetData.origin}</Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.introTitle}>保质期：</Text>
              <Text style={styles.introValue}>{this.state.cabinetData.expiration_date}天</Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.introTitle}>存入时间：</Text>
              <Text style={styles.introValue}>{this.state.cabinetData.save}</Text>
            </View>
          </View>
        </View>
        <View style={styles.controlColumn}>
          <Text style={styles.controlTitle}>设定温度：</Text>
          <TouchableOpacity onPress={()=>this.setValue('temp',+1)}>
            <Image source={{uri:'cabinet_add'}} style={styles.controlBtn}/>
          </TouchableOpacity>
          <Text style={styles.controlValue}>{this.state.target_temp}℃</Text>
          <TouchableOpacity onPress={()=>this.setValue('temp',-1)}>
            <Image source={{uri:'cabinet_sub'}} style={styles.controlBtn}/>
          </TouchableOpacity>
        </View>
        <View style={styles.controlColumn}>
          <Text style={styles.controlTitle}>设定湿度：</Text>
          <TouchableOpacity onPress={()=>this.setValue('humid',+1)}>
            <Image  source={{uri:'cabinet_add'}} style={styles.controlBtn}/>
          </TouchableOpacity>
          <Text style={styles.controlValue}>{this.state.target_humid}%</Text>
          <TouchableOpacity onPress={()=>this.setValue('humid',-1)}>
            <Image source={{uri:'cabinet_sub'}} style={styles.controlBtn}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  setValue(col,opt){
    let setUrl=ServerUrl+'setCabinet/'+CabinetId+'/'+col+'/'+opt;
    fetch(setUrl).then(res=>res.json()).then(res=>{
      if (res.status===0){
        if (col==='temp') {
          this.setState(prev=>({
            target_temp:prev.target_temp+opt
          }))
        }else if (col==='humid') {
          this.setState(prev=>({
            target_humid:prev.target_humid+opt
          }))
        }
      }else{
        console.log(res.msg);
      }
    }).catch(err=>consolo.log(err))
  }
}

const DevWidth=require('Dimensions').get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#3f475e',
    paddingLeft:10,
    paddingRight:10
  },
  chart:{
    marginTop:30,
    flexDirection:'row',
    justifyContent:'space-evenly'
  },
  chartText:{
    color:'#fff',
    fontSize:20
  },
  info:{
    marginTop:40,
    flexDirection:'row',
    justifyContent:'space-evenly'
  },
  infoLeft:{
    alignItems:'center',
  },
  infoImage:{
    width:130,
    height:160,
    borderRadius:20
  },
  infoTitle:{
    fontSize:20,
    color:'#fff',
    marginBottom:15
  },
  infoColumn:{
    width:DevWidth*0.4,
    height:40,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginRight:10
  },
  introTitle:{
    color:'#fff',
    fontSize:18,
  },
  introValue:{
    color:'#b3b7bf',
    fontSize:16
  },
  controlColumn:{
    flexDirection:'row',
    marginLeft:20,
    marginTop:20
  },
  controlTitle:{
    fontSize:18,
    color:'#fff',
    marginLeft:20,
    marginRight:40
  },
  controlValue:{
    fontSize:16,
    color:'#b3b7bf',
    width:100,
    height:30,
    textAlign:'center',
  },
  controlBtn:{
    width:30,
    height:30
  }


});