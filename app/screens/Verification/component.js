import React from 'react';
import { View, Alert, StatusBar, Image, Text} from 'react-native';
import PropTypes from 'prop-types';
import Button from '../../components/elements/Button';
import BasicTitle from '../../components/elements/Input/BasicTitle';
import { connect } from 'react-redux';
import {loginSuccess} from '../../actions';
import Back from '../../../assets/svgs/Back';
import styles from './styles';
import OTPInputView from '@twotalltotems/react-native-otp-input';
// import {ENDPOINT} from 'app/configs';

class Component extends React.Component {
    state = {
      email : '',
      password : ''
    }

  //  handlePress = async () => {
  //   const data = { email : this.state.email,
  //     password: this.state.password};
  //   const strData  = JSON.stringify(data); 
  //   await fetch('http://cdp-api-dev.vsan-apps.playcourt.id/api/v1/mobile/login', {
  //     // cdp-api-dev.vsan-apps.playcourt.id
  //     method: 'POST',
  //     body: JSON.stringify({email : this.state.email, password: this.state.password}),
  //     headers: {
  //     'Content-Type' : 'application/json', 
  //     'Authorization' : 'Basic dGVsa29tOmRhMWMyNWQ4LTM3YzgtNDFiMS1hZmUyLTQyZGQ0ODI1YmZlYQ==' 
  //     }
  //   }).then(async (response) =>
  //   // console.log(response), 
  //    response.json())
  //   .then(async (responseJson) => {
  //     //Handle response
  //     console.log(responseJson);
  //     if(responseJson.success==true) {
  //       //Simpan ke reducer/redux
  //       await this.props.login(responseJson);
  //       this.props.navigation.navigate('App'); 
  //     } else {
  //       Alert.alert('Email atau Password Salah')
  //     }
  //   }).catch ((error) => {
  //     //Error Connection
  //     console.log('OnBoarding'+error)
  //     Alert.alert('Cannot Connect to Server !');
  //   })
    
  render() {
    return (
      
        <View style={{backgroundColor: '#ffffff', flex:1}}>
            <StatusBar
             transculent={false}
             backgroundColor='#175873'
             barStyle='light-content'
             />
            {/* <Text style={styles.title}>Measurement</Text> */}
            {/* <Setting style={{alignSelf:'flex-end'}}></Setting> */}
              <View style={styles.circle}/>
              <Image style={styles.lock} source={require('../../../assets/images/woman.png')}/>
              <Text style={{paddingTop:180, paddingLeft:30, fontFamily:'roboto', fontSize:24, fontWeight:'bold', color:'#000000'}}>Verification has sent !</Text>
              <Text style={{paddingTop:10, paddingLeft:30, fontFamily:'roboto', fontSize:18, color:'#000000'}}>Enter the code we sent via SMS to your 
              registered phone number +6287889057672</Text>
              <View style={{justifyContent:'center', alignItems:'center', marginBottom:60, marginTop: 5}}>
                <OTPInputView
                  style={{width:'80%', height: 200}}
                  autoFocusOnLoad
                  pinCount={4}
                  codeInputFieldStyle={{width: 30,
                    height: 45,
                    borderWidth: 0,
                    borderBottomWidth: 1,}}
                  codeInputHighlightStyle={{ borderColor: "#000",}}
                //   onCodeFilled = {(code => {
                //     console.log(`Code is ${code}, you are good to go!`)
                // })}
                />
              </View>
              <View style={styles.button}>
                <Button title="confirm" disabled={false} onPress={ () => this.props.navigation.navigate('Home')}
                type="raised-ripple" />
              </View>
            </View>
        
        /* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#000000' }}>
          <BasicTitle label='Email' editable={true} value={this.state.email}
          onChangeText={email => this.setState({email})} />
          <BasicTitle label='Password' editable={true} value={this.state.password} 
          onChangeText={password => this.setState({password})}/>
          <View style={{marginTop: 30}}>
          <Button title="login" disabled={false} onPress={this.handlePress}
          type="raised-ripple" />
          </View>
        </View> */
      
    );
  }
}

Component.propTypes = {
  navigation: PropTypes.object.isRequired
};

const mapStateToProps = state => {

  return {
    //  status: state.isLogged,
    // akun : state.isLogged.akun,
    user : state.user,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    login : (data) => dispatch(loginSuccess(data))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
