import React from 'react';
import { View, StatusBar, FlatList, Text, Alert, PermissionsAndroid, Linking} from 'react-native';
import MainScreen from '../../components/layouts/MainScreen';
import Header from '../../components/elements/Header';
import Button from '../../components/elements/Button';
import Love from '../../../assets/svgs/Love';
import Tabs from '../../components/elements/Tabs';
import styles from './styles';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import network from '../../network';
import { connect } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import {dataSkill} from '../../actions';


class Component extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      perusahaan: null,
      perusahaanHired: null,
      loading: true,
      url: null

    
    }
  }

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

  actualDownload = () => {
    const { dirs } = RNFetchBlob.fs;
   RNFetchBlob.config({
     fileCache: true,
     addAndroidDownloads: {
     useDownloadManager: true,
     notification: true,
     mediaScannable: true,
     title: `SuratPenerimaan.pdf`,
     path: `${dirs.DownloadDir}/SuratPenerimaan.pdf`,
     },
   })
    //  .fetch('GET', network.ADDRESS+this.state.perusahaanHired[0].suratPenerimaan.slice(14)+'example_006.pdf', {})
    .fetch('GET','http://www.africau.edu/images/default/sample.pdf', {})
     .then((res) => {
       console.log('The file saved to ', res.path());
     })
     .catch((e) => {
       console.log(e)
     });
 }

  downloadFile = async () => {
    try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.actualDownload();
        } else {
          Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
        }
      } catch (err) {
        console.warn(err);
      } 
  }

  _renderTabSeen = () => {
    if(this.state.perusahaan === null) {
      return (
        <View style={styles.containerInsideTab}>
          <View style={styles.MainContainer}>
            <Text style={{fontSize:14, fontWeight:'bold', alignSelf:'center'}}>Maaf !</Text>
            <Text style={{fontSize:18, alignSelf:'center'}}>Anda Belum Disalurkan</Text>
          </View>
        </View>
      );
    }
    else {
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
                        {item.namaPerusahaan}
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
    }

  };


  _renderTabHired = () => {
    if(this.state.perusahaanHired === null) {
      return (
        <View style={styles.containerInsideTab}>
        <View style={styles.MainContainer}>
            <Text style={{fontSize:14, fontWeight:'bold', alignSelf:'center'}}>Maaf !</Text>
            <Text style={{fontSize:18, alignSelf:'center'}}>Belum Ada yang Menyalurkanmu</Text>
        </View>
      </View>
      );
    }
    else {
      return (
        <View style={styles.containerInsideTab}>
          <View style={styles.MainContainer}>
                <FlatList
                data={this.state.perusahaanHired}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <View  style={{flex: 1, flexDirection: 'column', justifyContent:'space-between'}}>
                    <Text style={styles.item}>
                      {item.namaPerusahaan}
                    </Text>
                    <Text style={styles.ItemMember}>
                      {item.alamat}
                    </Text>
                    <Text style={styles.ItemMember}>
                      {item.contact}
                    </Text>
  
                  </View>
                )}
                />
                  <View style={{alignSelf:'center', marginBottom:200}}>
                    <Button title="download PDF"  type="raised-ripple"
                    //  onPress={this.downloadFile}
                    onPress={ ()=> Linking.openURL(network.ADDRESS+this.state.perusahaanHired[0].suratPenerimaan.slice(14))}/>
                  </View>
          </View>
        </View>
      );
    }
    

  };

  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View
        style={{ height: 1, width: '100%', backgroundColor: '#000' }}
      />
    ); 
  };

  async componentDidMount() {
    await fetch(network.ADDRESS+'/seen', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        idUser: this.props.userAccount.data.id_jobseeker
      })
    }).then(response => response.json())
      .then(responseJson => {
        if (responseJson.success === true) {
          this.setState({
            ...this.state,
            perusahaan: responseJson.data
          })
        }
        else {
          // Alert.alert(responseJson.message);
          console.log('Belum di salurkan !')
        }
      }).catch(response => {
        // Alert.alert(response)
        console.log(response);
        this.setState({
          ...this.state,
          loading: false,
        })
      })

      await fetch(network.ADDRESS+'/hired', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
          idUser: this.props.userAccount.data.id_jobseeker
        })
      }).then(response => response.json())
        .then(responseJson => {
          if (responseJson.success === true) {
            this.setState({
              ...this.state,
              perusahaanHired: [responseJson.data],
              loading: false,
              url: responseJson.data.suratPenerimaan
            })
            console.log(this.state.perusahaanHired[0].suratPenerimaan.slice(14));
          }
          else {
            // Alert.alert(responseJson.message);
            console.log('Belum di Hired')
          }
        }).catch(response => {
          // Alert.alert(response)
          this.setState({
            ...this.state,
            loading: false,
          })
          console.log(response);
        })
}

 


  render() {
    console.log(this.state.perusahaanHired);
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

          <OrientationLoadingOverlay
          visible={this.state.loading}
          color="white"
          indicatorSize="large"
          messageFontSize={24}
          message="Loading"
          />
      </View>
    );
  }
}

const mapStateToProps = state => {

  return {
    //  status: state.isLogged,
    // akun : state.isLogged.akun,
    // user : state.user,
    // userAccount : state.userAccount,
    dataSkill : state.dataSkill,
    userAccount : state.userAccount

  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchDataSkill: (idSkill, name) => dispatch(dataSkill(idSkill, name)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
