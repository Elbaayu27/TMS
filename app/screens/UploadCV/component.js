import React from 'react';
import { View, TextInput, StatusBar, Image, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {loginSuccess, userAccount} from '../../actions';
import Back from '../../../assets/svgs/Back';
import styles from './styles';
import network from '../../network'
import DocumentPicker from 'react-native-document-picker';
// import {ENDPOINT} from 'app/configs';

class Component extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cvName: null,
      cvType: null,
      cvUri: null
    }
  }

  selectCV = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size
      );
      this.setState({
        cvName: res.name,
        cvType: res.type,
        cvUri: res.uri
      })
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  uploadCV = async () => {
    const cv = new FormData();
    cv.append('cv', {
      name: this.state.cvName,
      uri: this.state.cvUri,
      type: this.state.cvType
    });
    cv.append('idUser', this.props.userAccount.data.id_jobseeker);
    cv.append('name', this.state.cvName);

    //Upload
    if(this.state.cvName !== null || this.state.cvType !== null || this.state.cvUri !== null) {
      await fetch(network.ADDRESS+'/uploadCV', {
        method: 'POST',
        body: cv
      })
        .then(response => response.json())
        .then(async responseJson => {
          if(responseJson.success === true) {
            //Do what
            // Update reducer
            await this.props.dispatchUserAcount(responseJson.data);
            this.props.navigation.navigate('Home');
          }
          else {
            Alert.alert('Upload CV Gagal !');
          }
        })
        .catch(response => {
          Alert.alert(response);
        })
    }
    else {
      Alert.alert('Pilih CV Dahulu !')
    }
  }

 
  render() {
    return (
        <View style={{backgroundColor: '#455a64', flex:1}}>
            <StatusBar
             transculent={false}
             backgroundColor='#175873'
             barStyle='light-content'
             />

            <View style={{backgroundColor: '#ffffff', height:300, width: 350, marginHorizontal:10,alignItems:'center', alignSelf:'center', marginTop:100, borderWidth:2}}>
              <TouchableOpacity style={styles.button2} onPress={this.selectCV}>
                <Text style={{fontSize:14, color:'#525252',alignSelf:'center'}}>Choose File</Text>
              </TouchableOpacity>

              <Text style={{fontSize:14, color:'#525252',alignSelf:'center'}}>{this.state.cvName}</Text>
            </View> 

            <TouchableOpacity onPress={this.uploadCV} style={styles.button}>
              <Text style={styles.buttonText}>Submit CV</Text>
            </TouchableOpacity>
         </View>
      
    );
  }
}

Component.propTypes = {
  navigation: PropTypes.object.isRequired
};

const mapStateToProps = state => {

  return {
    userAccount : state.userAccount
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    login : (data) => dispatch(loginSuccess(data)),
    dispatchUserAcount: (account) => dispatch(userAccount(account, true)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
