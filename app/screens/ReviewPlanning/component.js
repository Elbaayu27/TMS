import React from 'react';
import { View, Text,Platform, Image, TouchableOpacity, TextInput, Alert, ScrollView} from 'react-native';
import MainScreen from '../../components/layouts/MainScreen';
import Header from '../../components/elements/Header';
import Back from '../../../assets/svgs/Back';
import styles from './styles';
import TextArea from 'react-native-textarea';
import {connect} from 'react-redux';
import {getDataMeasure, getMeasureSelected} from '../../actions'
import Button from '../../components/elements/Button';
import AsyncStorage from '@react-native-community/async-storage';

class Component extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      Default_Rating : 0,
      Max_Rating : 5,
      comments:'',
      feedback:'',
      whatReview:this.props.check.response.category
    };
    this.Star =  'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';

    this.Star_With_Border = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
  }


  UpdateRating(key) {
    this.setState({ Default_Rating: key });
  }

  _onBackPress = () => {
    this.props.navigation.navigate('MemberEvent')
  }

  _onPress = async () => {
    const data = {comment:this.state.comments, feedback:this.state.feedback, ratting:this.state.Default_Rating, reviewer:this.props.userKey, eventId:this.props.eventId}
    await fetch('http://cdp-api-dev.vsan-apps.playcourt.id/api/v1/mobile/review', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${this.props.token}`
      }
    }).then(async (response)=> 
    // console.log(response),
    await response.json())
    .then(async (responseJson)=>{
      console.log(responseJson);
      if(responseJson.success===true) {
        Alert.alert(
          //title
          'Success !',
          //body
          'Your review has been successful',
          [
            { text: 'OK', onPress: () => this.props.navigation.navigate('MemberEvent') }
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert('Cannot submit your review')
      }
    })
    .catch(error=>console.log(error)) 

  }
 
  render() {
    let React_Native_Rating_Bar = [];
    for (var i = 1; i<= this.state.Max_Rating; i++){
      React_Native_Rating_Bar.push(
        <TouchableOpacity 
         activeOpacity={0.7}
         key={i}
         onPress={this.UpdateRating.bind(this,i)} >
          <Image
            style={styles.StarImage}
            source={
              i <= this.state.Default_Rating ?{ uri: this.Star } :{ uri: this.Star_With_Border }
            }
          />
        </TouchableOpacity>

      );   
    }
    return (
      <MainScreen style={styles.container}>
        {/* <Header title="Measurement" setting back /> */}
        <View style={{backgroundColor: '#289F97', height : 56, width: 411, flexDirection: 'row'}}>
          <Back style={{alignSelf:'flex-start', marginTop: 20, marginLeft : 10}} onPress={this._onBackPress}/>
          {this.state.whatReview === 'Sprint Planning' ? <Text style={styles.title}>Review Planning</Text> : <Text style={styles.title}>Review Sprint</Text>  }
          {/* <Setting style={{alignSelf:'flex-end'}}><Setting> */}
        </View>
        <ScrollView>
        <View style={styles.MainContainer}>
        {this.state.whatReview === 'Sprint Planning' ? <Text style={styles.textStyleSmall}>Please Rate This Planning</Text> : <Text style={styles.textStyleSmall}>Please Rate This Sprint</Text>  }
          
          <View style={styles.childView}>{React_Native_Rating_Bar}</View>

          <Text style={styles.textStyle}>
            {this.state.Default_Rating} / {this.state.Max_Rating}
          </Text>

          <View style={styles.textareaContainer} >
              <TextInput
                style={styles.textarea}
                underlineColorAndroid="transparent"
                placeholder="Type your comments here.."
                placeholderTextColor="#000000"
                numberOfLines={10}
                multiline={true}
                value={this.state.comments}
                onChangeText={value => {this.setState({comments : value})}}
              />
            </View>


          <View style={styles.textareaContainer} >
            <TextInput
              style={styles.textarea}
              underlineColorAndroid="transparent"
              placeholder="Type your feedback here.."
              placeholderTextColor="#000000"
              numberOfLines={10}
              multiline={true}
              value={this.state.feedback}
              onChangeText={value => {this.setState({feedback : value})}}
            />
          </View>

        </View>
       </ScrollView>
        <View style={{marginBottom:20, flexDirection:'column', justifyContent:'flex-end'}}>
        <Button title="submit review" type="raised-ripple" onPress={this._onPress}/>
        </View>
      </MainScreen>
    );
  }
}

const mapStateToProps = state => {
  return {
    eventId: state.eventSelected.response.id,
    userKey: state.user.response.data.key,
    check: state.eventSelected,
    token: state.user.response.data.token
  }
}

export default connect(mapStateToProps, null) (Component)



