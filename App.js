/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import {DrawerNavigator,TabNavigator} from 'react-navigation';
import customDrawer from './component/drawer/DrawerStack';
import CabinetStack from './component/cabinet/CabinetStack';
import FindScreen from './component/find/FindScreen';
import AccountScreen from './component/AccountScreen';

const HomeNavigation=TabNavigator(
  {
    Cabinet:{
      screen:CabinetStack,
      navigationOptions:{
        title:'茶叶柜',
        tabBarIcon:(tab)=>renderIcon(tab,'cabinet'),
      }
    },
    Find:{
      screen:FindScreen,
      navigationOptions:{
        title:'发现',
        tabBarIcon:(tab)=>renderIcon(tab,'tea'),
      }
    },
    Account:{
      screen:AccountScreen,
      navigationOptions:{
        title:'我的',
        tabBarIcon:(tab)=>renderIcon(tab,'account'),
      }
    }
  },
  {
    initialRouteName:'Cabinet',
    tabBarPosition:'bottom',
    animationEnabled: true,               //开启标签页切换动画
    swipeEnabled: true,
    tabBarOptions:{                       //标签栏的样式设置如下↓
      style:{                               //整体标签栏样式设置
        backgroundColor:'#444e5a',
        height:55
      },
      iconStyle:{
        height:25,
        marginBottom:0
      },
      labelStyle:{
        marginTop:0
      },
      activeTintColor:'#1fe0f3',               //标签激活时的前景色
      activeBackgroundColor:'white',
      pressColor:'#9dbbff',                 //标签被点击时的颜色（仅安卓）
      showIcon:true,                       //显示图标，默认为false隐藏
    }
  }
);
function renderIcon(tab,component){
  let iconSrc='';
  if (tab.focused){                       //标签激活状态下icon的路径
    iconSrc='tab_'+component+'_selected';
  }else{                                  //未激活状态下的icon
    iconSrc='tab_'+component;
  }
  return <Image source={{uri:iconSrc}} style={styles.tabIcon} />
}

const DevWidth=require('Dimensions').get('window').width;
export default DrawerNavigator(
  {
    Home: {  screen: HomeNavigation },
  },
  {
    drawerWidth: DevWidth*0.6,            //侧边栏的宽度
    contentComponent:customDrawer ,
  }
)

const styles = StyleSheet.create({
  tabIcon:{
    width:25,
    height:25
  }
});



