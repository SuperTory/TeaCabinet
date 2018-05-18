import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import DetailScreen from './DetailScreen';

class Cabinet extends Component {
  static navigationOptions={
    header:renderHeader
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
      "humidity":0
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
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          智能茶叶柜
        </Text>
        <Text style={styles.line}> </Text>
        <View style={styles.info}>
          <Text style={styles.infoText}>系统信息：</Text>
          <Text style={styles.infoText}>运行正常</Text>
          <Image source={{uri:'cabinet_normal'}} style={styles.infoBadge} />
        </View>
        <View style={styles.weather}>
          <Text style={styles.weatherText}>室外温度 {this.state.temp}℃</Text>
          <Text style={styles.weatherText}>湿度 {this.state.humidity}</Text>
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

  renderItem(item,index){
    return (
      <TouchableOpacity activeOpacity={0.5} style={styles.listItem}
                        onPress={()=>this.navigateTo(index)}>
        <Image source={{uri:item.item.image}} style={styles.itemImage} />
        <Text style={styles.itemTitle}>{item.item.title}</Text>
      </TouchableOpacity>
    )
  }

  navigateTo(index){
    console.log('test');
    this.props.navigation.navigate('Detail',{"id":index});
  }

}
function renderHeader() {
  return(
    <View style={styles.header}>
      <TouchableOpacity>
        <Image source={{uri:'cabinet_scan'}} style={{width:25,height:25}} />
      </TouchableOpacity>
    </View>
  )
}

export default StackNavigator(
  {
    Cabinet:{screen:Cabinet},
    Detail:{screen:DetailScreen}
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
  header:{
    height:50,
    alignItems:'flex-end',
    justifyContent:'center',
    backgroundColor:'#3f475e',
    paddingRight:20,
  },
  title:{
    fontSize:30,
    color:'#fff',
    marginTop:20
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
    fontSize:20
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
    marginRight:20
  },
  listWrapper:{
    marginTop:50
  },
  columnWrapper:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    marginTop:10
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
    fontSize:15
  }
});