import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';

export default class  extends Component {
  static navigationOptions={
    title:'茶叶详情',
    headerStyle:{                                 //导航栏样式设置
      backgroundColor:'#444e5a',
    },
    headerTintColor:'#1fe0f3',
  };
  render() {
    let url="http://m.tea7.com/item/"+this.props.navigation.state.params.id+".htm";
    return (
      <WebView source={{uri:url}}
               javaScriptEnabled={true}
               domStorageEnabled={true}
               scalesPageToFit={true}
      />
    )
  }
}
