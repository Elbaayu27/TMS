import React from 'react';
import { View, TextInput, StatusBar, Image, Text, TouchableOpacity, Alert} from 'react-native';
import PropTypes from 'prop-types';
import Button from '../../components/elements/Button';
import BasicTitle from '../../components/elements/Input/BasicTitle';
import SplashScreen from '../SplashScreen'
import { connect } from 'react-redux';
import {userAccount} from '../../actions';
import Back from '../../../assets/svgs/Back';
import styles from './styles';
import PhoneInput from "react-native-phone-input";
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-community/async-storage';
import network from '../../network'
// import {ENDPOINT} from 'app/configs';

const slides=[
  {
    key:'satu',
    title:'Title 1',
    text: 'L-Fix partners are professional partners who have \n been recognized in their fields. ',
    image: require('../../../assets/images/carousel.jpeg'),
    backgroundColor: '#FFFFFF'
  },
  {
    key:'dua',
    title:'Title 2',
    text: 'Ready to come for maintain and repair your \n electronics stuff',
    image: require('../../../assets/images/samsung.jpg'),
    // backgroundColor: '#FFFFFF'
  }
];
class Component extends React.Component {
    state = {
      email : '',
      password : '',
      value: '',
      isSplashScreen : true,
      showRealApp:false
    }
  
    _onPress = () => {
      this.props.navigation.navigate('SignUp')
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
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  }

  _onLogin = async () => {
    const login = new Promise( async  (resolve, reject) => {
      await fetch(network.ADDRESS+'/login', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      }).then(response => response.json())
        .then(responseJson => {
          if (responseJson.success === true) {
            resolve(responseJson);
          }
          else {
            reject({
              message: 'Failed to Login'
            });
          }
        }).catch(response => Alert.alert(response))
    })

 await login
          .then( async response => {
            console.log(response)
            await this.props.dispatchUserAccount(response.data);
            try {
              await AsyncStorage.setItem('userAccount', JSON.stringify(response.data));
            } catch(e) {
              // save error
              Alert.alert(e)
            }
            this.props.navigation.navigate('Home');
          })
          .catch(response => {
            console.log(response)
            Alert.alert('Login Failed Please Check Email/Password')
          })  
  }

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('userAccount');
      if(value !== null) {
        // value previously stored
        await this.props.dispatchUserAccount(JSON.parse(value));
        this.props.navigation.navigate('Home');

      }
    } catch(e) {
      // read error
    }
    setTimeout( () => {
      this.setState({
        isSplashScreen : false
      })
    },2000)
  }
    
  render() {
    if(this.state.isSplashScreen) {
      return <SplashScreen/>
    }
    return (
        <View style={{backgroundColor: '#455a64', flex:1}}>
            <StatusBar
             transculent={false}
             backgroundColor='#175873'
             barStyle='light-content'
             />
            <Image style={{alignSelf:'center',width:300, height:150, marginTop: 50, marginLeft:5 }} source={require('../../../assets/images/jobseeker.png')}/>
            <Text style={styles.logoText}>Welcome to Talent Management System.</Text>
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
                placeholder="Password"
                placeholderTextColor = "#ffffff"
                selectionColor="#fff"
                secureTextEntry={true}
                // keyboardType="visible-password"
                onChangeText= {(text) => this.setState({password: text})}
            />    

            <TouchableOpacity onPress={this._onLogin} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.signupTextCont}>
              <Text style={styles.signupText}>Dont have an account yet?</Text>
              <TouchableOpacity onPress={this._onPress}><Text style={styles.signupButton}> Signup</Text></TouchableOpacity>
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
    // user : state.user,
    userAccount : state.userAccount

  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchUserAccount: (account) => dispatch(userAccount(account, true)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
