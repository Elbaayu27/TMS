import React from 'react';
import { View, Alert, StatusBar, Image, Text} from 'react-native';

class Component extends React.Component {
  render() {
    return (
      
        <View style={{backgroundColor: '#ffffff', flex:1, justifyContent:'center', alignItems:'center'}}>
            <StatusBar
             transculent={false}
             backgroundColor='#175873'
             barStyle='light-content'
             />

             <View style={{backgroundColor:'#175873', height:200, width:200, borderRadius:200/2}}></View>
             <Image style={{position:'absolute', width:200, height:200}} source={require('../../../assets/images/fix.png')}/>
            </View>
      
    );
  }
}

export default (Component)
