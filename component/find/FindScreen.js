import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import DetailScreen from "./DetailScreen";
import ScrollBanner from "./ScrollBanner";
import ItemBar from "./ItemBar";
import ShopScreen from './ShopScreen';
const ServerUrl=require('./../../app').server;

class FindScreen extends Component {
  static navigationOptions={
    header:renderHeader
  };
  constructor(props) {
    super(props);
    this.state = {
      bannerData: [],
      recommendData:[]
    };
  }

  componentWillMount() {
    let bannerUrl=ServerUrl+"bannerData";
    fetch(bannerUrl).then((res)=>res.json())
      .then((resJson)=>{
        this.setState({
          bannerData:resJson
        });
        //console.log(this.state.bannerData);
      }).catch((err)=>{
      console.log(err);
    });
    let itemUrl=ServerUrl+"recommend";
    fetch(itemUrl).then((res)=>res.json())
      .then((resJson)=>{
        this.setState({
          recommendData:resJson
        });
        //console.log(this.state.recommendData);
      }).catch((err)=>{
      console.log(err);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollBanner bannerData={this.state.bannerData} navigate={this.navigateDetail.bind(this)}/>
        <ScrollView>
          <View style={styles.sectionBar}>
            <Image source={{uri:'find_tea'}} style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>当季茗茶</Text>
          </View>
          {this.state.recommendData.map(
            (item,index)=>
              <ItemBar key={index} data={item} navigateTo={this.navigateShop.bind(this)}/>
          )}
        </ScrollView>
      </View>
    )
  }

  navigateDetail(item){
    this.props.navigation.navigate('Detail',{id:item.id,title:item.title});
  }
  navigateShop(id){
    this.props.navigation.navigate('Shop',{id:id});
  }

}

function renderHeader() {
  return(
    <View style={styles.header}>
      <Text style={styles.headerText}>茶·生活</Text>
    </View>
  )
}

export default StackNavigator(
  {
    Find:{screen:FindScreen},
    Detail:{screen:DetailScreen},
    Shop:{screen:ShopScreen}
  }
)

const DevWidth=require('Dimensions').get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header:{
    width:DevWidth,
    height:55,
    backgroundColor: '#444e5a',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  headerText:{
    fontSize:20,
    fontWeight:'bold',
    color:'#1fe0f3'
  },
  sectionBar:{
    width:DevWidth,
    height:30,
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#444e5a'
  },
  sectionIcon:{
    width:30,
    height:30
  },
  sectionTitle:{
    fontSize:18,
    color:'#fff'
  }
});
