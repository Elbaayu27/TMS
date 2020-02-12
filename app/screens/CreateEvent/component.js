import React from 'react';
import { View , Text, FlatList, Alert, ScrollView, ActivityIndicator} from 'react-native';
import MainScreen from '../../components/layouts/MainScreen';
import Header from '../../components/elements/Header';
import Button from '../../components/elements/Button';
import Checkbox from 'react-native-custom-checkbox';
// import FlatList from '../../components/elements/FlatList';
import Pick from '../../components/elements/Pick';
import Date from '../../components/elements/Input/Date';
import BasicTitle from '../../components/elements/Input/BasicTitle';
import {TYPES} from '../../components/elements/Input/BasicTitle/styles'; 
import styles from './styles'; 
import PropTypes from 'prop-types';
import { FTYPES } from '../../components/elements/FlatList/styles';
import { connect } from 'react-redux';
import {getDataEvent} from '../../actions';
import { BTYPES } from '../../components/elements/BackButton/styles';
import Back from '../../../assets/svgs/Back';
import DatePicker from 'react-native-date-picker';
import moment from "moment";


class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      isLoading: true,
      status:false,
      point: 0,
      eventName : '', //penampung nama event (BasicTitle),
      locName : '',
      descEvent : '',
      itemDipilih : '', //penampung item dipilih (SelectPicker)
      sprintDipilih: '',
      startDate : '', //penampung tanggal event (DatePicker)
      endDate: '',
      choosenMembers : [], //penampung data nama ketika checkboxnya diceklis (CheckBox)
      dataPicker : [{label: 'Sprint Review & Retro', color: '#707A89', value: 'Sprint Review & Retro'},{label: 'Sprint Planning', color: '#707A89', value: 'Sprint Planning'},
      {label: 'Sprint Meeting', color: '#707A89', value: 'Sprint Meeting'}],
      // dataSprint :  [{label: 'Sprint 1', color: '#707A89', value: 'Sprint 1'},{label: 'Sprint 2', color: '#707A89', value: 'Sprint 2'},
      // {label: 'Sprint 3', color: '#707A89', value: 'Sprint 3'}],
      dataSprint: []
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

  _onBackPress = () => {
    this.props.navigation.navigate('MemberEvent');
  };
  
  _handleOnChange = async (name, checked) => {
    let index = this.state.choosenMembers.findIndex(x => x.Name === name ); //Mendapatkan index array keberapa name ->parameter (data nama-nama ) di  statechoosenMembers
    if (checked) // jika checkboxnya diceklis 
    {
      //Do this
      // await this.setState({
      //   ...this.state,
      //   choosenMembers : this.state.choosenMembers.concat({
      //     Name : name, Point : this.state.point}) //menambah data name ke array state choosenMember dgn methode concat
      // })//EndsetState

      await this.setState({
        ...this.state,
        choosenMembers : this.state.choosenMembers.concat({
          key : name}) //menambah data name ke array state choosenMember dgn methode concat
      })//EndsetState
    } 
    else //jika checkboxnya di uncheck
    {
      //Do This
      if (index > -1) //check index >= 0 karena array start from 0
        { 
          //Do this
          this.state.choosenMembers.splice(index, 1) //menghapus data yang di state choosenMembers dengan methode splice(), 1 menandakan berapa banyak data yg akan dihapus 
        } //End If
    } //End else
    // console.log(this.state.choosenMembers); //cek ketika debugging diconsole
  }

  handlePress = async () => {
    let data;
    if(this.state.itemDipilih == "Sprint Review & Retro") {
      data = {name : this.state.eventName, location: this.state.locName, category :this.state.itemDipilih,
        startDate : this.state.startDate, endDate: this.state.endDate , invite: this.state.choosenMembers,
        squadId:this.props.projects.response.id, description: this.state.descEvent, sprintId: this.state.sprintDipilih};
        // createdBy : this.props.user.response.data.key, updatedBy : this.props.user.response.data.key, 
    }
    else {
      data = {name : this.state.eventName, location: this.state.locName, category :this.state.itemDipilih,
        startDate :this.state.startDate, endDate: this.state.endDate, invite: this.state.choosenMembers,
        squadId:this.props.projects.response.id, description: this.state.descEvent, sprintId: ''};
    }
    fetch('http://cdp-api-dev.vsan-apps.playcourt.id/api/v1/mobile/create-event', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
         Accept: 'application/json',
        'Content-Type' : 'application/json',
        // 'Authorization' : 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJoZW5pLm11bHlhbmkiLCJuYW1lIjoiSGVuaSBNdWx5YW5pIiwidGl0bGUiOiJCYWNrZW5kIERldmVsb3BlciIsImVtYWlsQWRkcmVzcyI6ImhlbmkubXVseWFuaUBzdHVkZW50LnVwaS5lZHUiLCJhY3RpdmUiOiJ0cnVlIiwiaW1hZ2UiOm51bGwsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTcyMjY5NDk4LCJleHAiOjE1NzIzMjk0OTgsImF1ZCI6Ijk3YjMzMTkzLTQzZmYtNGU1OC05MTI0LWIzYTliOWY3MmMzNCIsImlzcyI6InRlbGtvbWRldiJ9.NurCnhtVZw4pyAWZRpaVkuDicIbY51PDSETSKTsIhwT5dZ2KW6GCWcPVXnfYSBbrTKt1wlYqe5_NLD_QY0qmYL2ZRHCQvFJiQ2PUcRuePEuP3TfkF4HsH26cxiac1uHF14ku784Bg6_-jBy8rWAeTdOODyNpdBcvfb4bwcq9q8eL-pR0vfVUdyQ7ADwiwJ1DsaaGbzEj2LHzjjKRJAuyPK8-z2eh_jl9uvaxbfqtQkvIdYpzYhc_ChsPAQb2JqDa7yV_Ky4xZ6ZBEL-KvKRi04ZYUpovNTZsXB5S9pCUDjk4YcmBiiMoJnLdUkrMAaAWn6iql0YsfIqat6p02kJ1SQbFymtbdx6ipmA9N0cmv7DhZ4sjAZFDGcuex4OhoPGLF_sWjp6c0wPJgWElscbeLQds-kVsaLmTdUzHn_66pBTCxxYObmxHQBsPnzdbIsDnoP8iAPCEPSnVM4LnkyHlrftI4o1-5itK1qfZEf0sQ0gh_6nSnfGg8ymmzKMp5lgc9B_FYG_NAkyStZeScdbwqu7HhxnuD1e6DBE048geonV8Qlf6Wn5n-Vbr04G-klspKEQWbVUe3FL39Q6dCWDJJcHJmUaVgfzvmej1IVifSCUdtkTkDVpIZtvy2qbArLnZqLNJ2dExqHn11xi3ZJDTAxGdKOvxOAgHZPtCNkonSFU'
        'Authorization' : `Bearer ${this.props.user.response.data.token}`
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
          'Your event has created',
          [
            { text: 'OK', onPress: () => this.props.navigation.navigate('MemberEvent') }
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert('Cannot create your event')
      }
    })
    .catch(error=>console.log('createevent - createevent'+error)) 
  }


  componentWillUnmount() {
    // this.setState({
    //   allData : this.state.allData.concat([{eventName : {...this.state.eventName}, eventCategory :{...this.state.itemDipilih}, eventDate: {...this.state.eventDate}, eventMembers: {...this.state.choosenMembers}}])
    // });
    const passingAllData = {eventName : this.state.eventName, locName: this.state.locName, eventCategory :this.state.itemDipilih, startDate :this.state.startDate, endDate: this.state.endDate , eventMembers: this.state.choosenMembers };
    // console.log(passingAllData)
    this.props.createEvent(passingAllData)
  }

  _handleOnValueChange = (itemValue) => {
    if(itemValue=="Sprint Review & Retro") {
      this.setState({ 
        ...this.state,
        status:true,
        itemDipilih: itemValue })
    }
    else {
      this.setState({
        ...this.state,
        status:false,
        itemDipilih: itemValue
      })
    }
  }

  async componentDidMount() {
    const event = await fetch('http://cdp-api-dev.vsan-apps.playcourt.id/api/v1/mobile/sprint?squadId='+this.props.squadId,{
  method: 'GET',
  headers: {
    'Content-Type' : 'application/json',
    'Authorization' : `Bearer ${this.props.user.response.data.token}`
  }
  })
  .then(async response => await response.json())
  .then(async (responseJson)=> {
    //Do Here
    let data = []
    await responseJson.data.map(item => {
      data.push({label : item.name, value: item.sprintId, color: '#707A89'})
    })
    this.setState({
      ...this.state,
      dataSprint: data,
      isLoading: false,
    })
  })
  .catch(error=>console.log('createevent sprint'+error))
  }

  render() {
    if(this.state.isLoading){
      return(
        <View>
          <ActivityIndicator style={{marginTop: 300}} size="large" color="#289f97"/>
        </View>

      );
    }
    return (
      <MainScreen style={styles.container}>
        {/* <Header title="Create Event" setting back/> */}
        <View style={{backgroundColor: '#289F97', height : 56, width: 411, flexDirection: 'row'}}>
          <Back style={{alignSelf:'flex-start', marginTop: 20, marginLeft : 10}} onPress={this._onBackPress}/>
          <Text style={styles.title}>Create Event</Text>
          {/* <Setting style={{alignSelf:'flex-end'}}></Setting> */}
        </View>
        <ScrollView>
        <View style={styles.container}>
          <View style={{justifyContent:'center', alignItems:'center', marginLeft:10}}>
            <BasicTitle label='' placeholder='Event Name..' editable={true} type={TYPES.FILLED} value={this.state.eventName} onChangeText = {value => {this.setState({eventName : value})}}/>
            <BasicTitle label='' placeholder='Location..' editable={true} type={TYPES.FILLED} value= {this.state.locName} onChangeText={value => {this.setState({locName : value})}}/>
            <BasicTitle label='' placeholder='Description..' editable={true} type={TYPES.FILLED} value= {this.state.descEvent} onChangeText={value => {this.setState({descEvent : value})}}/>
            <Pick label = {"Select Category Event.."} data = {this.state.dataPicker} selectedValue={this.state.itemDipilih} onValueChange={(itemValue) => this._handleOnValueChange(itemValue)}/> 
            {this.state.status ?<Pick label = {"Select Sprint.."} data = {this.state.dataSprint} selectedValue={this.state.sprintDipilih} onValueChange={(itemValue) => this.setState({ sprintDipilih: itemValue })}/> :null} 
            {/* <Text style={{color:'#454545', fontSize: 15, fontStyle:'italic', alignSelf:'center'}}>
              Start Date
            </Text> */}
            <Date placeholder='Start Date' date={this.state.startDate} onDateChange = {date => this.setState({startDate : date})}/>
            <Date placeholder='End Date' date={this.state.endDate} onDateChange = {date => this.setState({endDate : date})} />
            {/* <DatePicker
              date={this.state.date}
              onDateChange={date => this.setState({ date })}
            /> */}
           </View>
        <View style={{width: 5000, height: 30, backgroundColor: '#289f97', marginTop: 10, justifyContent:'center'}} >
        <Text style={styles.text}>
          Select Member :
        </Text>
        </View> 
        <View style={styles.MainContainer}>
           <FlatList
             data={this.props.dataAllMember.response.data}
             //data defined in constructor
             ItemSeparatorComponent={this.FlatListItemSeparator}
             //Item Separator View
             renderItem={({ item }) => (
               // Single Comes here which will be repeatative for the FlatListItems
               <View  style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginRight: 10 }}>
                 <Text style={styles.item}>
                   {item.name}
                 </Text>
                 <Checkbox
                   name = {item.key}
                   checked={false}
                   style={{backgroundColor: '#f2f2f2', color:'#900', borderRadius: 2}}
                   onChange={(name, checked) =>this._handleOnChange(name, checked)}
                   /> 
               </View>
             )}
             keyExtractor={(item, index) => index.toString()}
           />
         </View>
        {/* <FlatList
         type={FTYPES.CHECKBOX} //Props untuk Flatlist
         onChange = {(name, checked) => this._handleOnChange(name, checked)} //props untuk dikirim ke Flatlist dan digunakan di component checkbox
         /> */}
        </View>
        </ScrollView>
        <View style={{alignSelf:'center', marginBottom: 10}}>
        <Button title="create" disabled={false} onPress={this.handlePress
          // ()=>this.props.navigation.navigate('MemberEvent', {
          // ID : this.state.id,
          // Nama : this.state.nama
          // })
        } type="raised-ripple"/>
        </View>
       
      </MainScreen>
    );
  }
}

Component.propTypes = {
  navigation: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    dataevent : state.dataEvent,
    dataAllMember : state.dataMember,
    user : state.user,
    projects : state.squadSelected,
    squadId : state.squadSelected.response.id,
    dataUser: state.dataProject
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createEvent : (allData) => dispatch(getDataEvent(allData))
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Component)