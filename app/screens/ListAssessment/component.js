import React from 'react';
import { View, Text, ActivityIndicator, FlatList, Alert } from 'react-native';
import MainScreen from '../../components/layouts/MainScreen';
import Header from '../../components/elements/Header';
import Back from '../../../assets/svgs/Back';
import styles from './styles';
import {connect} from 'react-redux';
import {getDataMeasure, getMeasureSelected} from '../../actions'
import Button from '../../components/elements/Button';
import AsyncStorage from '@react-native-community/async-storage';

class Component extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      data: this.props.eventId,
      sizeMeasurements: null,
      sizeAS: null,
      dataAS: null,
      buttonDisable: true
    }
  }

  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View
        style={{ height: 1, width: '100%', backgroundColor: '#000' }}
      />
    ); 
  };

  _onBackPress =  () => {
    this.props.navigation.navigate('MemberEvent')
  }

  _buttonOnPress = async () => {
    let status;
    let dataResponse;
    const sendAPI = {"status":1,"point" : this.state.dataAS}
    // const data = {}

    await fetch('http://cdp-api-dev.vsan-apps.playcourt.id/api/v1/mobile/point-assessment', {
      method: 'POST',
      body: JSON.stringify(sendAPI),
      headers: {
       'Content-Type' : 'application/json',
       'Authorization' : `Bearer ${this.props.token.response.data.token}`
      }
    }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      status = responseJson.success
      dataResponse = responseJson
      if(responseJson.success===true) {
        Alert.alert(
          //title
          'Success !',
          //body
          'Your assessment has submitted.',
          [
            { text: 'OK', onPress: () => this.props.navigation.navigate('MemberEvent') }
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert('Cannot submit your assessment !')
      }
    })
    .catch((error) => {
      console.log(Alert.alert('Failed to Submit Data'+error))
    })
    console.log("sendAPI")
    console.log(sendAPI)

    if(status == true) {
      //Remove data in AS 
      try {
        await AsyncStorage.removeItem(JSON.stringify(this.props.squadId)+'-'+JSON.stringify(this.props.eventId))
      }
      catch(error) {
        console.log(error)
      }
    }
    this.props.navigation.navigate('MemberEvent')
  };


  async componentDidMount(){
    const idEvent = await fetch('http://cdp-api-dev.vsan-apps.playcourt.id/api/v1/mobile/measurement',{
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json', 
        'Authorization' : `Bearer ${this.props.token.response.data.token}`
      }
    })
    .then(async response => await response.json())
    .then(async (responseJson)=>{
      await this.props.dispatchDataMeasure(responseJson);
    })
    .catch(error=> console.error(error));

    if(this.state.sizeMeasurements == null) {
      //Menyimpan size dari data measurements
    this.setState({
      ...this.state,
      sizeMeasurements: this.props.dataMeasure.response.data.length
    })
  }

    //getItem data dari AS
    try {
    const membersfromasyncStorage = await AsyncStorage.getItem(JSON.stringify(this.props.squadId)+'-'+
    JSON.stringify(this.props.eventId));

    if(membersfromasyncStorage != null && this.state.sizeAS == null) {
      const data = JSON.parse(membersfromasyncStorage);
      this.setState({
        ...this.state,
        sizeAS : data.length,
        dataAS : data,
      })
    }
    }
    catch (error) {
      console.log(error)
    }

    if(this.state.sizeAS == this.state.sizeMeasurements) {
      this.setState({
        ...this.state,
        buttonDisable: false
      })
    }
       //=====   //=====
    this.setState({
      ...this.state,
      isLoading: false
    })
    
  }

  render() {
    if(this.state.isLoading){
      return(
        <View>
          <ActivityIndicator style={{marginTop: 300}} size='large' color="#289f97" />
        </View>
      )
    };
    return (
      <MainScreen style={styles.container}>
        {/* <Header title="Measurement" setting back /> */}
        <View style={{backgroundColor: '#289F97', height : 56, width: 411, flexDirection: 'row'}}>
          <Back style={{alignSelf:'flex-start', marginTop: 20, marginLeft : 10}} onPress={this._onBackPress}/>
          <Text style={styles.title}>Measurement</Text>
          {/* <Setting style={{alignSelf:'flex-end'}}></Setting> */}
        </View>
        <View style={styles.MainContainer}>
          <FlatList
              data={this.props.dataMeasure.response.data}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <View  style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <Text style={styles.item} onPress={ async () =>
                  {
                    const dataMeasure = {id: item.measurementId, name: item.name}
                    await this.props.measureChoosen(dataMeasure)
                    this.props.navigation.navigate('GiveAssessment')
                  }
                  }>
                    {item.name}
                  </Text>
                </View>
              )}
          />
        </View>
        <View style={{marginBottom:10, flexDirection:'column', justifyContent:'flex-end'}}>
           {this.state.buttonDisable ? <Button title="submit all" disabled={true} onPress={this._buttonOnPress}
            type="raised-ripple"/> : <Button title="submit all" disabled={false} onPress={this._buttonOnPress} 
            type="raised-ripple"/>}
        </View>
      </MainScreen>
    );
  }
}

const mapStateToProps = state => {
  return {
    eventId : state.eventSelected.response.id,
    dataMeasure : state.dataMeasure,
    choosenMeasure : state.measureSelected,
    squadId : state.squadSelected.response.id,
    token : state.user,

  }
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchDataMeasure: (get) => dispatch(getDataMeasure(get)),
    measureChoosen : (get) => dispatch(getMeasureSelected(get))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Component)

