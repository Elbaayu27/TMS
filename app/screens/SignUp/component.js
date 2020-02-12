import React from 'react';
import { View, TextInput, StatusBar, Image, Text, TouchableOpacity, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import Button from '../../components/elements/Button';
import BasicTitle from '../../components/elements/Input/BasicTitle';
import { connect } from 'react-redux';
import {loginSuccess} from '../../actions';
import Back from '../../../assets/svgs/Back';
import styles from './styles';
import PhoneInput from "react-native-phone-input";
import AppIntroSlider from 'react-native-app-intro-slider';
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

  _onSignup = () => {
    this.props.navigation.navigate('Home');
  }
 
  render() {
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
            <View style={{backgroundColor: '#455a64', height:400}}>
            <TextInput style={styles.inputBox}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Email"
                placeholderTextColor = "#ffffff"
                selectionColor="#fff"
                keyboardType="email-address"
                onSubmitEditing={()=> this.password.focus()}
            />
            <TextInput style={styles.inputBox2}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Password"
                placeholderTextColor = "#ffffff"
                selectionColor="#fff"
                keyboardType="visible-password"
                onSubmitEditing={()=> this.password.focus()}
            /> 
            <TextInput style={styles.inputBox2}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Name"
                placeholderTextColor = "#ffffff"
                selectionColor="#fff"
                keyboardType="visible-password"
                onSubmitEditing={()=> this.password.focus()}
            />  
            <TextInput style={styles.inputBox2}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Address"
                placeholderTextColor = "#ffffff"
                selectionColor="#fff"
                keyboardType="visible-password"
                onSubmitEditing={()=> this.password.focus()}
            /> 
            <TextInput style={styles.inputBox2}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Phone"
                placeholderTextColor = "#ffffff"
                selectionColor="#fff"
                keyboardType="visible-password"
                onSubmitEditing={()=> this.password.focus()}
            /> 
            <TextInput style={styles.inputBox2}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Age"
                placeholderTextColor = "#ffffff"
                selectionColor="#fff"
                keyboardType="visible-password"
                onSubmitEditing={()=> this.password.focus()}
            />
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
    login : (data) => dispatch(loginSuccess(data))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
