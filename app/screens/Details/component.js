import React from 'react';
import { View, Text, ActivityIndicator, FlatList, Alert, Button} from 'react-native';
import MainScreen from '../../components/layouts/MainScreen';
import Header from '../../components/elements/Header';
import Back from '../../../assets/svgs/Back';
import styles from './styles';
import {connect} from 'react-redux';
import {getDetailEvent} from '../../actions'
import ButtonCustom from '../../components/elements/Button';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';

class Component extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true
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

  _measurements = () => {
    this.props.navigation.navigate('ListAssessment')
  }

  _review = () => {
    this.props.navigation.navigate('ReviewPlanning')
  }

  _showDetail = () => {
    const startdate = moment(this.props.detail.detailEvent.data.startDate).format("dddd, MMMM Do YYYY, h:mm:ss a");
    const enddate = moment(this.props.detail.detailEvent.data.endDate).format("dddd, MMMM Do YYYY, h:mm:ss a")
    return (
    <View>
      <Text style={{color:'#6e6a6a', fontSize:16, fontStyle:'italic'}}>Event Name :  {this.props.detail.detailEvent.data.name}</Text>
      <Text style={{color:'#6e6a6a', fontSize:16, fontStyle:'italic'}}>Category :       {this.props.detail.detailEvent.data.category}</Text>
      <Text style={{color:'#6e6a6a', fontSize:16, fontStyle:'italic'}}>Location :       {this.props.detail.detailEvent.data.location}</Text>
      <Text style={{color:'#6e6a6a', fontSize:16, fontStyle:'italic'}}>Start Date :    {startdate}</Text>
      <Text style={{color:'#6e6a6a', fontSize:16, fontStyle:'italic'}}>End Date :     {enddate}</Text>
      <Text style={{color:'#6e6a6a', fontSize:16, fontStyle:'italic'}}>Description : {this.props.detail.detailEvent.data.description}</Text>
      <Text style={{color:'#6e6a6a', fontSize:16, fontStyle:'italic'}}>Member : </Text>
      {this.props.detail.detailEvent.data.invited.map((item, index) => {
        return (
          <Text style={{color:'#6e6a6a', fontSize:16, fontStyle:'italic'}} key={index}>                        -{item.memberName}</Text>
        )
      })}
    </View>
    );
  }

  _planning = () => {
    return (<MainScreen style={styles.container}>
      {/* <Header title="Measurement" setting back /> */}
      <View style={{backgroundColor: '#289F97', height : 56, width: 411, flexDirection: 'row'}}>
        <Back style={{alignSelf:'flex-start', marginTop: 20, marginLeft : 10}} onPress={this._onBackPress}/>
        <Text style={styles.title}>Details</Text>
        {/* <Setting style={{alignSelf:'flex-end'}}></Setting> */}
      </View>
      <View style={styles.MainContainer}>
        <View style={{alignSelf:'flex-start'}}>
          {this._showDetail()}
        </View>
       {this.props.statusEvent == 'OPEN' ?<ButtonCustom title="REVIEW" onPress={this._review} type="raised-ripple"/> :<ButtonCustom title="REVIEW" disabled={true} onPress={this._review} type="raised-ripple"/> } 
      </View>
    </MainScreen>
    );
  }
  _meeting = () => {
    return (
      <MainScreen style={styles.container}>
        {/* <Header title="Measurement" setting back /> */}
        <View style={{backgroundColor: '#289F97', height : 56, width: 411, flexDirection: 'row'}}>
          <Back style={{alignSelf:'flex-start', marginTop: 20, marginLeft : 10}} onPress={this._onBackPress}/>
          <Text style={styles.title}>Details</Text>
          {/* <Setting style={{alignSelf:'flex-end'}}></Setting> */}
        </View>
        <View style={styles.MainContainer}>
          <View style={{alignSelf:'flex-start'}}>
            {this._showDetail()}
          </View>
        </View>
      </MainScreen>
    );
  }

  _retroandreview = () => {
    showReview = () => {
      if(this.props.statusEvent == 'OPEN') {
        return (
          <View style={{flexDirection:'column',justifyContent:'space-between'}}>
            <View style={{marginBottom : 20}}>
              <ButtonCustom title="ASSESSMENT" onPress={this._measurements} type="raised-ripple"/>
            </View>
            <View>
              <ButtonCustom title="REVIEW" disabled={true} onPress={this._review} type="raised-ripple"/>
            </View>
          
          </View>
        );
      }
      else if (this.props.statusEvent == 'COMPLETED') {
        return (
          <View style={{flexDirection:'column',justifyContent:'space-between'}}>
            <View style={{marginBottom : 20}}>
              <ButtonCustom title="ASSESSMENT" disabled={true} onPress={this._measurements} type="raised-ripple"/>
            </View>
            <View>
              <ButtonCustom title="REVIEW" disabled={true} onPress={this._review} type="raised-ripple"/>
            </View>
          </View>
        );
      }
      else {
        //not review
        return (
          <View style={{flexDirection:'column',justifyContent:'space-between'}}>
            <View style={{marginBottom : 20}}>
              <ButtonCustom title="ASSESSMENT" disabled={true} onPress={this._measurements} type="raised-ripple"/>
            </View>
            <View>
              <ButtonCustom title="REVIEW" onPress={this._review} type="raised-ripple"/>
            </View>
          </View>
        );
      }
    }
    return (
      <MainScreen style={styles.container}>
        {/* <Header title="Measurement" setting back /> */}
        <View style={{backgroundColor: '#289F97', height : 56, width: 411, flexDirection: 'row'}}>
          <Back style={{alignSelf:'flex-start', marginTop: 20, marginLeft : 10}} onPress={this._onBackPress}/>
          <Text style={styles.title}>Details</Text>
          {/* <Setting style={{alignSelf:'flex-end'}}></Setting> */}
        </View>
        <View style={styles.MainContainer}>
          <View style={{alignSelf:'flex-start'}}>
            {this._showDetail()}
          </View>
         {/* {this.props.statusEvent == 'open' ? <ButtonCustom title="ASSESSMENT" onPress={this._measurements} type="raised-ripple"/> :<ButtonCustom title="ASSESSMENT" disabled={true} onPress={this._measurements} type="raised-ripple"/>} 
        {this.props.statusEvent == 'complete' ?<ButtonCustom title="REVIEW" disabled={true} onPress={this._review} type="raised-ripple"/> :<ButtonCustom title="REVIEW" onPress={this._review} type="raised-ripple"/> }  */}
        {showReview()}
        </View>
      </MainScreen>
    );
  }

  _onDeletePress = () => {
   fetch('http://cdp-api-dev.vsan-apps.playcourt.id/api/v1/mobile/delete-event?eventId='+this.props.eventId, {
     method: 'DELETE',
     headers: {
       'Content-Type' : 'application/json',
      //  'Authorization' : 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJoZW5pLm11bHlhbmkiLCJuYW1lIjoiSGVuaSBNdWx5YW5pIiwidGl0bGUiOiJCYWNrZW5kIERldmVsb3BlciIsImVtYWlsQWRkcmVzcyI6ImhlbmkubXVseWFuaUBzdHVkZW50LnVwaS5lZHUiLCJhY3RpdmUiOiJ0cnVlIiwiaW1hZ2UiOm51bGwsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTcyMjY5NDk4LCJleHAiOjE1NzIzMjk0OTgsImF1ZCI6Ijk3YjMzMTkzLTQzZmYtNGU1OC05MTI0LWIzYTliOWY3MmMzNCIsImlzcyI6InRlbGtvbWRldiJ9.NurCnhtVZw4pyAWZRpaVkuDicIbY51PDSETSKTsIhwT5dZ2KW6GCWcPVXnfYSBbrTKt1wlYqe5_NLD_QY0qmYL2ZRHCQvFJiQ2PUcRuePEuP3TfkF4HsH26cxiac1uHF14ku784Bg6_-jBy8rWAeTdOODyNpdBcvfb4bwcq9q8eL-pR0vfVUdyQ7ADwiwJ1DsaaGbzEj2LHzjjKRJAuyPK8-z2eh_jl9uvaxbfqtQkvIdYpzYhc_ChsPAQb2JqDa7yV_Ky4xZ6ZBEL-KvKRi04ZYUpovNTZsXB5S9pCUDjk4YcmBiiMoJnLdUkrMAaAWn6iql0YsfIqat6p02kJ1SQbFymtbdx6ipmA9N0cmv7DhZ4sjAZFDGcuex4OhoPGLF_sWjp6c0wPJgWElscbeLQds-kVsaLmTdUzHn_66pBTCxxYObmxHQBsPnzdbIsDnoP8iAPCEPSnVM4LnkyHlrftI4o1-5itK1qfZEf0sQ0gh_6nSnfGg8ymmzKMp5lgc9B_FYG_NAkyStZeScdbwqu7HhxnuD1e6DBE048geonV8Qlf6Wn5n-Vbr04G-klspKEQWbVUe3FL39Q6dCWDJJcHJmUaVgfzvmej1IVifSCUdtkTkDVpIZtvy2qbArLnZqLNJ2dExqHn11xi3ZJDTAxGdKOvxOAgHZPtCNkonSFU'
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
         'Your event has deleted',
         [
           { text: 'OK', onPress: () => this.props.navigation.navigate('MemberEvent') }
         ],
         { cancelable: false }
       );
     } else {
       Alert.alert('Cannot delete your event !')
     }
   })
   .catch(error=>console.log('Details delete-event'+error)) 
  }

  _scrumMaster = () => {
    return (
      <MainScreen style={styles.container}>
        {/* <Header title="Measurement" setting back /> */}
        <View style={{backgroundColor: '#289F97', height : 56, width: 411, flexDirection: 'row'}}>
          <Back style={{alignSelf:'flex-start', marginTop: 20, marginLeft : 10}} onPress={this._onBackPress}/>
          <Text style={styles.title}>Details</Text>
          {/* <Setting style={{alignSelf:'flex-end'}}></Setting> */}
        </View>
        <View style={styles.MainContainer}>
          <View style={{alignSelf:'flex-start'}}>
            {this._showDetail()}
          </View>
         <Button style={{width:100}} title="DELETE" color='#bf291f' onPress={this._onDeletePress}/> 
        </View>
      </MainScreen>
    )
  }

  async componentDidMount() {
    const res = await fetch('http://cdp-api-dev.vsan-apps.playcourt.id/api/v1/mobile/detail-event?eventId='+this.props.eventId,
    {
      method: 'GET',
      headers: {
      'Content-Type' : 'application/json', 
      // 'Authorization' : 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJoZW5pLm11bHlhbmkiLCJuYW1lIjoiSGVuaSBNdWx5YW5pIiwidGl0bGUiOiJCYWNrZW5kIERldmVsb3BlciIsImVtYWlsQWRkcmVzcyI6ImhlbmkubXVseWFuaUBzdHVkZW50LnVwaS5lZHUiLCJhY3RpdmUiOiJ0cnVlIiwiaW1hZ2UiOm51bGwsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTcyMjY5NDk4LCJleHAiOjE1NzIzMjk0OTgsImF1ZCI6Ijk3YjMzMTkzLTQzZmYtNGU1OC05MTI0LWIzYTliOWY3MmMzNCIsImlzcyI6InRlbGtvbWRldiJ9.NurCnhtVZw4pyAWZRpaVkuDicIbY51PDSETSKTsIhwT5dZ2KW6GCWcPVXnfYSBbrTKt1wlYqe5_NLD_QY0qmYL2ZRHCQvFJiQ2PUcRuePEuP3TfkF4HsH26cxiac1uHF14ku784Bg6_-jBy8rWAeTdOODyNpdBcvfb4bwcq9q8eL-pR0vfVUdyQ7ADwiwJ1DsaaGbzEj2LHzjjKRJAuyPK8-z2eh_jl9uvaxbfqtQkvIdYpzYhc_ChsPAQb2JqDa7yV_Ky4xZ6ZBEL-KvKRi04ZYUpovNTZsXB5S9pCUDjk4YcmBiiMoJnLdUkrMAaAWn6iql0YsfIqat6p02kJ1SQbFymtbdx6ipmA9N0cmv7DhZ4sjAZFDGcuex4OhoPGLF_sWjp6c0wPJgWElscbeLQds-kVsaLmTdUzHn_66pBTCxxYObmxHQBsPnzdbIsDnoP8iAPCEPSnVM4LnkyHlrftI4o1-5itK1qfZEf0sQ0gh_6nSnfGg8ymmzKMp5lgc9B_FYG_NAkyStZeScdbwqu7HhxnuD1e6DBE048geonV8Qlf6Wn5n-Vbr04G-klspKEQWbVUe3FL39Q6dCWDJJcHJmUaVgfzvmej1IVifSCUdtkTkDVpIZtvy2qbArLnZqLNJ2dExqHn11xi3ZJDTAxGdKOvxOAgHZPtCNkonSFU'
      'Authorization' : `Bearer ${this.props.token}` 
      }
    }
    )
    .then(async response => await response.json())
    .then(async (responseJson)=> {
      //dispatch ke reducer detail_info
      await this.props.dispatchDetailEvent(responseJson);
      await this.setState({
        ...this.state,
       isLoading : false
      });
    })
    .catch(error=>console.log('Details detail-event'+error)) //to catch the errors if any
} // end ComponentDidMount
  
  render() {
    console.log(this.props.detail)
    if(this.state.isLoading) {
      return (
        <View>
        <ActivityIndicator style={{marginTop: 300}} size="large" color="#289f97"/>
      </View>
      );
    }
    if(this.props.title=='Scrum Master') {
      return (this._scrumMaster());
    } else {
        if(this.props.category == 'Sprint Review & Retro') {
          return (this._retroandreview());
        }
        else if (this.props.category == 'Sprint Planning') {
          return(this._planning());
        }
        else if (this.props.category == 'Sprint Meeting') {
          return(this._meeting());
        } else {
          return (Alert.alert('Failed'));
        }
    }
    
  }
}

const mapStateToProps = state => {
  return {
    category: state.eventSelected.response.category,
    eventId : state.eventSelected.response.id,
    statusEvent : state.eventSelected.response.status,
    userTitle : state.user.response.data.title,
    detail : state.detailEvent,
    token : state.user.response.data.token,
    title : state.dataProject.response.data.title,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchDetailEvent: (get) => dispatch(getDetailEvent(get)),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Component)
