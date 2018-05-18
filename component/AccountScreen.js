import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native';

export default class MineScreen extends Component{
  static defaultProps={
    orderList:[{title:'未付款',iconSrc:'icon_order1'},
      {title:'运送中',iconSrc:'icon_order2'},
      {title:'待评价',iconSrc:'icon_order3'},
      {title:'退款/售后',iconSrc:'icon_order4'}]
  };

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.5} style={styles.userInfo}>
            <Image source={{uri:'user_tory'}} style={styles.userPic} />
            <Text style={styles.username}>SuperTory</Text>
            <Image source={{uri:'mine_vip'}} style={styles.userGrade} />
            <Image style={styles.headerArrow} source={{uri:'icon_arrow_right'}} />
          </TouchableOpacity>
          <View style={styles.headerItemList}>
            <HeaderItem title='喜欢' itemNum={10}/>
            <HeaderItem title='收藏' itemNum={15}/>
            <HeaderItem title='评价' itemNum={100}/>
          </View>
        </View>
        <ScrollView>
          <Cell title='我的订单' iconSrc="mine_order" infoText="查看全部"/>
          <FlatList data={this.props.orderList} columnWrapperStyle={styles.orderList}
                    keyExtractor={(item,index)=>index.toString()}
                    renderItem={this.renderOrderList}
                    numColumns={4}
          />
          <View style={styles.cellSection}>
            <Cell title='钱包' iconSrc="mine_wallet" infoText="账户余额：￥100.00" />
            <Cell title='抵用券' iconSrc="mine_coupon" infoText="0" />
          </View>
          <View style={styles.cellSection}>
            <Cell title='佳茗推荐' iconSrc="mine_recommend" badgeSrc="icon_cell_new" />
            <Cell title='联系客服' iconSrc="mine_custom" />
          </View>
        </ScrollView>
      </View>
    )
  }

  //“我的订单”下面四个块
  renderOrderList(item){
    return(
      <TouchableOpacity activeOpacity={0.5}>
        <View style={styles.orderItem}>
          <Image source={{uri:item.item.iconSrc}} style={{width:30,height:30}}/>
          <Text style={{color:'#fff'}}>{item.item.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

//按钮条
class Cell extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <TouchableOpacity style={styles.cellBar} onPress={this.props.cellFunction}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Image style={styles.cellIcon} source={{uri:this.props.iconSrc}} />
          <Text style={styles.cellTitle}>{this.props.title}</Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          {/*右边的文字*/}
          <Text style={styles.cellSubTitle}>{this.props.infoText}</Text>
          {/*右边的icon*/}
          <Image source={{uri:this.props.badgeSrc}} style={{width:30,height:18}} />
          {/*右边的箭头*/}
          <Image style={styles.cellArrow} source={{uri:'icon_arrow_right'}} />
        </View>
      </TouchableOpacity>
    )
  }
}
//头像下面半透明块
class HeaderItem extends  Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <TouchableOpacity activeOpacity={0.2} style={styles.headerItem}>
        <Text>{this.props.itemNum}</Text>
        <Text>{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}

const DevWidth=require('Dimensions').get('window').width;
const DevHeight=require('Dimensions').get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3f475e',
  },
  header:{
    width:DevWidth,
    paddingTop:20,
    backgroundColor:'#444e5a',
  },
  userInfo:{
    width:DevWidth,
    height:DevHeight*0.13,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    paddingLeft:10,
    marginBottom:10
  },
  userPic:{
    width:80,
    height:80,
    borderColor:'#1fe0f3',
    borderWidth:2,
    borderRadius:50,
    marginRight:10
  },
  username:{
    fontSize:18,
    color:'#fff'
  },
  userGrade:{
    width:20,
    height:20
  },
  headerArrow:{
    width:15,
    height:15,
    position:'absolute',
    right:10,
  },
  headerItemList:{
    width:DevWidth,
    height:50,
    flexDirection:'row',
    justifyContent:'space-evenly',
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:'rgba(255,255,255,0.5)'
  },
  headerItem:{
    width:DevWidth/3,
    height:40,
    alignItems:'center'
  },
  orderList:{
    flexDirection:'row',
    justifyContent:'space-around',
    backgroundColor:'#50586f'
  },
  orderItem:{
    width:80,
    height:80,
    justifyContent:'center',
    alignItems:'center'
  },
  cellSection:{
    marginTop:10
  },
  cellBar:{
    width:DevWidth,
    height:50,
    backgroundColor:'#2e3a50',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingLeft:10,
    paddingRight:10,
    borderBottomColor:'#67636e',
    borderBottomWidth:1
  },
  cellIcon:{
    width:25,
    height:25,
  },
  cellTitle:{
    fontSize:16,
    color:'#fff',
    marginLeft:5
  },
  cellSubTitle:{
    color:'#b3b7bf'
  },
  cellArrow:{
    width:15,
    height:15
  }
});