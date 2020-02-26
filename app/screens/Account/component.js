import React from 'react';
import { View, StatusBar, Text, Alert } from 'react-native';
import MainScreen from '../../components/layouts/MainScreen';
import Header from '../../components/elements/Header';
import Button from '../../components/elements/Button';
import Tabs from '../../components/elements/Tabs';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';

export default class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0
    };
  }
  _onPress = async () => {
    // Hapus AS
    try {
      await AsyncStorage.removeItem('userAccount')
    } catch(e) {
      // remove error
      Alert.alert(e);
    }

    this.props.navigation.navigate('OnBoarding');
  };

  _getTabData = () => [
    {
      name: 'Tab A',
      renderer: this._renderTab
    },
    {
      name: 'Tab B',
      renderer: this._renderTab
    }
  ];

  _onTabChanged = index => {
    this.setState({ tabIndex: index });
  };

  _renderTab = () => {
    const { tabIndex } = this.state;
    return (
      <View style={styles.containerInsideTab}>
        <Text>{`Tab Index : ${tabIndex}`}</Text>
        <Button title="Logout" disabled={false} onPress={this._onPress} type="raised-ripple" />
      </View>
    );
  };

  render() {
    return (
        <View>
          <StatusBar
          transculent={false}
          backgroundColor='#175873'
          barStyle='light-content'
          />
        <View style={{alignItems:'center', marginTop:300}}>
          <Button title="Logout" disabled={false} onPress={this._onPress} type="raised-ripple" />
        </View>
        </View>
      
    );
  }
}
