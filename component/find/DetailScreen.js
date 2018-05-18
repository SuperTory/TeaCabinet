import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';

export default class DetailScreen extends Component {
  static navigationOptions=((props)=>{
    return {
      title:props.navigation.state.params.title,
      headerStyle:{                                 //导航栏样式设置
        backgroundColor:'#444e5a',
      },
      headerTintColor:'#1fe0f3',                       //按钮、标题颜色设置
    }
  });
  constructor(props){
    super(props);
    this.state={
      detailHtml:''
    }
  }

  componentDidMount() {
    let articleId=this.props.navigation.state.params.id;
    let url='http://www.tea7.com/article/' + articleId;    //拼接详情的url
    fetch(url).then((response)=>response.text())              //将返回的数据转化为json格式
      .then((res)=>{
        let start=res.indexOf('<div class="fl teanewsbox">');
        let end=res.indexOf('<div class="tea_news_right">');
        let rawHtml=res.substring(start,end);
        let html=rawHtml.replace('<img','<img style="width:300;height:200;"');
        console.log(rawHtml);
        this.setState({
          detailHtml:html                      //将拼接好的网页body保存到state中
        });
      })
      .catch((err)=>{
        console.log(err);
      })
  }
  render() {
    return (
      <WebView
        automaticallyAdjustContentInsets={true}
        source={{html: this.state.detailHtml, baseUrl: ''}}     //网页数据源
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
      />
    )
  }
}
