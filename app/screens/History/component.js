import React from 'react';
import { View, StatusBar, FlatList, Text } from 'react-native';
import MainScreen from '../../components/layouts/MainScreen';
import Header from '../../components/elements/Header';
import Button from '../../components/elements/Button';
import Love from '../../../assets/svgs/Love';
import Tabs from '../../components/elements/Tabs';
import styles from './styles';

export default class Component extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      perusahaan:[{nama:'PT.TELKOM', alamat:'Jl. Asia Afrika'},{nama:'PT.Arkamaya', alamat:'Jl. Siliwangi'},{nama:'PT.Erporate', alamat:'Jl. Ahmad Yani'}]
    }
  }
  
  _onPress = () => {};

  _myFunction = () => {

  };

  _onTabChanged = index => {
    
  };

  _getTabData = () => [
    {
      name: 'Seen',
      renderer: this._renderTabSeen
    },
    {
      name: 'Hired',
      renderer: this._renderTabHired
    }
  ];

  _renderTabSeen = () => {
    return (
      <View style={styles.containerInsideTab}>
        <View style={styles.MainContainer}>
          <FlatList
                data={this.state.perusahaan}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <View  style={{flex: 1, flexDirection: 'column', justifyContent:'flex-start'}}>
                    <Text style={styles.item}>
                      {item.nama}
                    </Text>
                    <Text style={styles.ItemMember}>
                      {item.alamat}
                    </Text>

                  </View>
                )}
                />
        </View>
      </View>
    );

  };


  _renderTabHired = () => {
    return (
      <View style={styles.containerInsideTab}>
        <View style={styles.MainContainer}>
              <FlatList
              data={this.state.perusahaan}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <View  style={{flex: 1, flexDirection: 'row', justifyContent:'space-between', backgroundColor:'pink' }}>
                  <Text style={styles.item}>
                    {item.nama}
                  </Text>
                  <Text style={styles.ItemMember}>
                    {item.alamat}
                  </Text>

                </View>
              )}
              />
        </View>
      </View>
    );

  };

  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View
        style={{ height: 1, width: '100%', backgroundColor: '#000' }}
      />
    ); 
  };


 


  render() {
    

    return (
      <View style={{flex:1}}>
        <StatusBar
          transculent={false}
          backgroundColor='#175873'
          barStyle='light-content'
        />

<View style={styles.container}>
          <Tabs
            tabsData={this._getTabData()}
            tabContainerStyle={styles.tabContainer}
            tabLabelStyle={styles.tabLabelStyle}
            tabLabelSelectedStyle={styles.tabSelectedLabel}
            bottomLineStyle={styles.bottomLineStyle}
            onTabChanged={this._onTabChanged}
          />
          </View>
      </View>
    );
  }
}


