import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

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
      fill:"test"
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <AnimatedCircularProgress
            size={150}
            width={5}
            rotation={-180}
            prefill={0}
            fill={20}
            tintColor="#1fe0f3"
            backgroundColor="#3d5875">
            {
              (fill) => (
                <Text style={styles.points}>
                  温度：{ this.state.fill }
                </Text>
              )
            }
          </AnimatedCircularProgress>
          <AnimatedCircularProgress
            size={150}
            width={5}
            rotation={-180}
            prefill={0}
            fill={20}
            tintColor="#1fe0f3"
            backgroundColor="#3d5875">
            {
              (fill) => (
                <Text style={styles.points}>
                  温度：{ this.state.fill }
                </Text>
              )
            }
          </AnimatedCircularProgress>
        </View>

      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#3f475e'
  },

});