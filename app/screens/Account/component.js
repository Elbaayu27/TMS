import React from 'react';
import { View, StatusBar, Text } from 'react-native';
import MainScreen from '../../components/layouts/MainScreen';
import Header from '../../components/elements/Header';
import Button from '../../components/elements/Button';
import Tabs from '../../components/elements/Tabs';
import styles from './styles';

export default class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0
    };
  }
  _onPress = () => {};

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
