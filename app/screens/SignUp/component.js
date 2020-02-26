import React from 'react';
import { View, TextInput, StatusBar, Image, Text, TouchableOpacity, ScrollView, Alert, Picker} from 'react-native';
import PropTypes from 'prop-types';
import Button from '../../components/elements/Button';
import BasicTitle from '../../components/elements/Input/BasicTitle';
import { connect } from 'react-redux';
import {loginSuccess, register, userAccount} from '../../actions';
import Back from '../../../assets/svgs/Back';
import styles from './styles';
import PhoneInput from "react-native-phone-input";
import AppIntroSlider from 'react-native-app-intro-slider';
import Date from '../../components/elements/Input/Date';
import network from '../../network'
// import {ENDPOINT} from 'app/configs';

class Component extends React.Component {
    state = {
      email : '',
      password : '',
      name : '',
      bornDate :'',
      address :'',
      phone :'',
      gender :null,
      value: '',
      phoneCode: '',
      isSplashScreen : true,
      showRealApp:false
    }

  _renderItem = (item) => {
    return (
      <View style={{backgroundColor:'#000', flex:1}}>
        <Text style={styles.judul}>{item.title}</Text>
        <Image source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  }

  _onDone = () => {
    this.setState({ showRealApp: true });
  }

  _onSignup = async () => {
    const login = new Promise( async  (resolve, reject) => {
      await fetch(network.ADDRESS+'/register', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          address: this.state.address,
          phone: this.state.phone,
          born_date: this.state.bornDate,
          gender: this.state.gender


        })
      }).then(response => response.json())
        .then(responseJson => {
          if (responseJson.success === true) {
            resolve(responseJson)
          }
          else {
            reject({
              message: 'Failed to SignUp'
            })
          }
        }).catch(response => Alert.alert(response))
    })

    await login
          .then(async response => {
            console.log(response)
            await this.props.dispatchUserAcount(response.data);
            this.props.navigation.navigate('Home');
          })
          .catch(response => {
            console.log(response)
            Alert.alert('SignUp Failed Please Check Your Data')
          })
    
  }
 
  render() {
    console.log(this.state.gender, 'gender');
    return (
        <View style={{backgroundColor: '#455a64', flex:1}}>
            <StatusBar
             transculent={false}
             backgroundColor='#175873'
             barStyle='light-content'
             />
            <Image style={{alignSelf:'center',width:300, height:150, marginTop: 20, marginLeft:5 }} source={require('../../../assets/images/jobseeker.png')}/>
            <Text style={styles.logoText}>Welcome to Talent Management System.</Text>

            <ScrollView>
            <View style={{backgroundColor: '#455a64', flex:1}}>
              <TextInput style={styles.inputBox}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder="Email"
                  placeholderTextColor = "#ffffff"
                  selectionColor="#fff"
                  keyboardType="email-address"
                  onChangeText= {(text) => this.setState({email: text})}
              />
              <TextInput style={styles.inputBox2}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  autoCompleteType='password'
                  placeholder="Password"
                  placeholderTextColor = "#ffffff"
                  selectionColor="#fff"
                  secureTextEntry={true}
                  onChangeText= {(text) => this.setState({password: text})}
              /> 
              <TextInput style={styles.inputBox2}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder="Name"
                  placeholderTextColor = "#ffffff"
                  selectionColor="#fff"
                  keyboardType="visible-password"
                  onChangeText= {(text) => this.setState({name: text})}
              />  
              <View style={styles.inputBox2}>
                <Date placeholder='Born Date' date={this.state.bornDate} onDateChange= {(text) => this.setState({bornDate: text})}/>
              </View>
              <TextInput style={styles.inputBox2}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder="Address"
                  placeholderTextColor = "#ffffff"
                  selectionColor="#fff"
                  keyboardType="visible-password"
                  onChangeText= {(text) => this.setState({address: text})}
              /> 
              <TextInput style={styles.inputBox2}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder="Phone"
                  placeholderTextColor = "#ffffff"
                  selectionColor="#fff"
                  keyboardType="visible-password"
                  onChangeText= {(text) => this.setState({phone: text})}
              /> 
              {/* <TextInput style={styles.inputBox2}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder="Gender"
                  placeholderTextColor = "#ffffff"
                  selectionColor="#fff"
                  keyboardType="visible-password"
                  onChangeText= {(text) => this.setState({gender: text})}
              /> */}
              <View style={styles.inputBox2}>
                <Picker
                  selectedValue={this.state.gender}
                  style={{width:270, fontSize:16,color:'#ffffff',}}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({
                      ...this.state,
                      gender : itemValue
                    })
                  }
                  }>
                  <Picker.Item label="Pria" value="Pria" />
                  <Picker.Item label="Wanita" value="Wanita" />
                </Picker>
              </View>
            </View> 
            </ScrollView>  

            <TouchableOpacity onPress={this._onSignup} style={styles.button}>
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>

            <View style={styles.signupTextCont}>
              <Text style={styles.signupText}>Already have an account?</Text>
              <TouchableOpacity><Text style={styles.signupButton}> Sign In</Text></TouchableOpacity>
            </View>
            {/* <Text></Text> */}
         </View>
      
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
    login : (data) => dispatch(loginSuccess(data)),
    dispatchUserAcount: (account) => dispatch(userAccount(account, true)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
