import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import DetailScreen from './DetailScreen';
import ScanScreen from './ScanScreen';
const ServerUrl=require('./../../app').server;

class Cabinet extends Component {
  static navigationOptions= {
    header: null
  };
  static defaultProps={
    listData:[
      {"title":'通风',"image":'cabinet_air'},
      {"title":'恒温',"image":'cabinet_constant'},
      {"title":'干燥',"image":'cabinet_dry'},
      {"title":'储存',"image":'cabinet_long'},
      {"title":'保湿',"image":'cabinet_moisture'},
      {"title":'除味',"image":'cabinet_smell'},
    ]
  };
  constructor(props){
    super(props);
    this.state={
      "temp":0,
      "humidity":0,
      "info":{}
    }
  }

  componentDidMount() {
    let weatherUrl='http://v.juhe.cn/weather/index?cityname=榆次&key=02ba636d816636cc3f7e37107b71a2f06';
    fetch(weatherUrl).then(res=>res.json()).then(res=>{
      this.setState({
        "temp":res.result.sk.temp,
        "humidity":res.result.sk.humidity
      });
      console.log(res.result.sk);
    }).catch(err=>console.log(err));
    fetch(ServerUrl+'checkInfo').then(res=>res.json()).then(res=>{
      console.log(res);
      this.setState({
        info:res
      })
    }).catch(err=>console.log(err));
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          智能茶叶柜
        </Text>
        <Text style={styles.line}> </Text>
        {this.renderInfo()}
        <View style={styles.weather}>
          <Text style={styles.weatherText}>室外温度 {this.state.temp}℃</Text>
          <Text style={styles.weatherText}>湿度 {this.state.humidity}%</Text>
        </View>
        <View style={styles.listWrapper}>
          <FlatList data={this.props.listData} numColumns={3}
                    keyExtractor={(item,index)=>index.toString()}
                    renderItem={this.renderItem.bind(this)}
                    columnWrapperStyle={styles.columnWrapper}
          />
        </View>
      </View>
    )
  }

  renderItem({item,index}){
    return (
      <TouchableOpacity activeOpacity={0.5} style={styles.listItem}
                        onPress={()=>this.navigateTo(index)}>
        <Image source={{uri:item.image}} style={styles.itemImage} />
        <Text style={styles.itemTitle}>{item.title}</Text>
      </TouchableOpacity>
    )
  }

  renderInfo(){
    let ret;
    if (this.state.info.status===0){
      ret=
        <View style={styles.info}>
          <Text style={styles.infoText}>系统信息：</Text>
          <Text style={styles.infoText}>{this.state.info.msg}</Text>
          <Image source={{uri:'cabinet_normal'}} style={styles.infoBadge} />
        </View>
    }else if(this.state.info.status===2){
      ret=<View style={styles.info}>
        <Text style={styles.infoText}>您好，欢迎使用！请登陆</Text>
      </View>
    }else if(this.state.info.status===3){
      ret=<View style={styles.info}>
        <Text style={styles.infoText}>系统信息：</Text>
        <Text style={styles.infoText}>{this.state.info.msg}</Text>
        <Image source={{uri:'cabinet_abnormal'}} style={styles.infoBadge} />
      </View>
    }
    return ret;
  }

  navigateTo(index){
    fetch(ServerUrl+'checkLogin').then(res=>res.json()).then(res=>{
      if (res.status===0){
        this.props.navigation.navigate('Detail',{"id":index+1});
      }else if(res.status===1){
        ToastAndroid.show(res.msg,ToastAndroid.SHORT);
      }
    }).catch(err=>console.log(err));
  }

}

export default StackNavigator(
  {
    Cabinet:{screen:Cabinet},
    Detail:{screen:DetailScreen},
    Scan:{screen:ScanScreen}
  }
)

const DevWidth=require('Dimensions').get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#3f475e',
    paddingLeft:20,
    paddingRight:20
  },
  title:{
    fontSize:30,
    color:'#fff',
    marginTop:60
  },
  line:{
    width:DevWidth*0.25,
    borderBottomWidth:2,
    borderBottomColor:'#1fe0f3',
  },
  info:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:20
  },
  infoText:{
    color:'#fff',
    fontSize:18
  },
  infoBadge:{
    width:15,
    height:15
  },
  weather:{
    marginTop:15,
    flexDirection:'row'
  },
  weatherText:{
    color:'#fff',
    marginRight:20,
    fontSize:15
  },
  listWrapper:{
    marginTop:50
  },
  columnWrapper:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    marginTop:30
  },
  listItem:{
    width:100,
    height:100,
    borderWidth:2,
    borderColor:'#1fe0f3',
    justifyContent:'center',
    alignItems:'center'
  },
  itemImage:{
    width:50,
    height:50
  },
  itemTitle:{
    color:'#fff',
    fontSize:15,
    marginTop:10
  }
});