import React from 'react';
import { View, Text } from 'react-native';
import MainScreen from '../../components/layouts/MainScreen';
import Header from '../../components/elements/Header';
import Back from '../../../assets/svgs/Back';
import Setting from '../../../assets/svgs/Setting';
import Check from '../../../assets/svgs/Check';
import styles from './styles';

export default class Component extends React.Component {
  _onPress = () => {
    this.props.navigation.navigate('Home')
  };

  render() {
    return (
      <MainScreen style={styles.container}>
        {/* <Header title="List Assessment" setting back /> */}
        <View style={{backgroundColor: '#289F97', height : 56, width: 411, flexDirection: 'row'}}>
          <Back style={{alignSelf:'flex-start', marginTop: 20, marginLeft : 10}} onPress={this._onPress}/>
          <Text style={styles.title}>List Assessment</Text>
          {/* <Setting style={{alignSelf:'flex-end'}}></Setting> */}
        </View>
        <View style={styles.container}>
          <View style={{height:50, width:412, backgroundColor:'#fff', justifyContent:'flex-start', marginBottom:5, borderBottomColor:'#000', borderBottomWidth:1, flexDirection:'row'}}>
            <Text style={{color:'#000', fontSize:17, marginRight:280, marginTop:10}} >
              Kepedulian
            </Text>
            <Check/>
          </View>
        </View>
      </MainScreen>
    );
  }
}



