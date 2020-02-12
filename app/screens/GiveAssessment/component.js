import React from 'react';
import { View, FlatList, Text, ActivityIndicator} from 'react-native';
import MainScreen from '../../components/layouts/MainScreen';
import Header from '../../components/elements/Header';
import Button from '../../components/elements/Button';
import Back from '../../../assets/svgs/Back';
import NumericInput from 'react-native-numeric-input';
import styles from './styles';
import PropTypes from 'prop-types';
import { createDataPoint, updateDataPoint, initDataAs } from '../../actions';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

 class Component extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status : false,
      isLoading: true,
      info : false,
      indexAS : null,
      members : null
    }
}

  _onBackPress = () => {
    this.props.navigation.navigate('ListAssessment');
  };

  _onPress = async () => {
    const key = JSON.stringify(this.props.squad.response.id)+'-'+JSON.stringify(this.props.invited.response.id);
    if(this.state.status) {
      //Masukan data ke reducer data async ->Params for updatePoint measurementId,updateDataMembers, datapatch, datafix
      await this.props.updatePoint(this.state.members, this.state.members.member, this.props.updateDataPoint.measurementsFromAsyncStorage, this.props.updateDataPoint.measurementsFromAsyncStorage) //->not fixed yet
      //Remove AS
      try {
        //hapus dulu data yg udh di AS
        await AsyncStorage.removeItem(JSON.stringify(this.props.squad.response.id)+'-'+JSON.stringify(this.props.invited.response.id))
      }
      catch (error) {
        console.log(error)
      }
      //Terus diupdate disini (insert ulang dengan data yg udh diperbaharui))Masukan ke asyncStorage sebagai setItem datanya diambil dari this.props.updateDataPoint.measurementsFromAsyncStorage
      await this._initDataToSave(this.props.updateDataPoint.measurementsFromAsyncStorage)
    }
    else
    {
      //Masukkan data ke reducer datapoint
      await this.props.createPoint(this.state.members);
      //Masukan ke asyncstorage sebagai setItem datanya diambil dari this.props.datapoint.measurements
      await this._initDataToSave(this.props.datapoint.measurements);
    }
    this.props.navigation.navigate('ListAssessment');
  };

  _initDataToSave = async (params) => {
   try {
    await AsyncStorage.setItem(JSON.stringify(this.props.squad.response.id)+'-'+JSON.stringify(this.props.invited.response.id),
     JSON.stringify(params));
   }
   catch (error) {
     console.log(error);
   }
  }

 _getData = async () => { 
   try {
    const membersfromasyncStorage = await AsyncStorage.getItem(JSON.stringify(this.props.squad.response.id)+'-'+
    JSON.stringify(this.props.invited.response.id));
    if(membersfromasyncStorage !== null && this.state.status === false) {
      this.setState({
        ...this.state,
        status: true
        });
      await this.props.initDataAs(JSON.parse(membersfromasyncStorage));
    }
   }
   catch (error) {
    console.log(error);
   }
 }

 _getKeys = async () => {
   const keys = await AsyncStorage.getAllKeys();

   console.log(keys);
 }

 _clear = async () => {
    await AsyncStorage.clear();
 }

 _updateMemberMeasurements = async () => {
  let newMember = [];
 await this.props.invited.response.invited.map((data) => {
   console.log(data.key)
  newMember.push({
      key: data.key,
      name: data.name,
      point: 0
    })
  })
    let measurements;
    if(this.props.sprint.detailEvent.data.category === 'Sprint Review & Retro') {
      measurements = {
           measurementId: this.props.header.response.id,
           assessor : this.props.userKey.response.data.key ,
           squadId: this.props.squad.response.id,
           sprintId: this.props.sprint.detailEvent.data.sprintId,
           eventId: this.props.invited.response.id,
           member : newMember
         };
         console.log('_updateMemberMeasurements')
    }
    else {
      measurements = {
        measurementId: this.props.header.response.id,
        assessor : this.props.userKey.response.data.key ,
        squadId: this.props.squad.response.id,
        sprintId: '',
        eventId: this.props.invited.response.id,
        member : newMember
      };
    }
    await this.props.createPoint(measurements);
 }

 _handleOnChange = async (value, index, key) => {
   const {members} = this.state
    try {
        this.setState({
          ...this.state,
          members: {
            ...members,
            member: members.member.map(item => {
              return item.key == key ? {...item, point: value} : item
            })
          }
        })
    }
        catch (error) {
          console.log(error)
    }

 }

 async componentDidUpdate() {
  if(this.state.status && this.state.indexAS === null) {
    this.props.updateDataPoint.measurementsFromAsyncStorage.map((file, index) => {
      try {
        if(file.measurementId === this.props.header.response.id) {
          this.setState({
            ...this.state,
            indexAS: index,
            members : file
          })
      }
      }
      catch (error) {
        console.log(error)
      }
      
    })
  }

  if(this.state.indexAS === null && this.state.info === false) {
    this.setState({
      ...this.state,
      info: true,
      members : this.props.datapoint.measurements[0]
    })
  }

  if(!this.state.status && this.state.members === null) {
    this.setState({
      ...this.state,
      members : this.props.datapoint.measurements[0]
    })
  }
 }
 async componentDidMount() {
  await this._updateMemberMeasurements();
  await this._getData();
  if(this.state.isLoading === true) {
    this.setState({
      ...this.state,
      isLoading: false
    });
  }
 }

 _renderElementAS = (index, key) => {
     return(
      <NumericInput
        value={this.state.members.member[index].point} 
        onChange={(value) => this._handleOnChange(value, index, key)} 
        minValue={0}
        maxValue={10} 
        totalWidth={80} 
        totalHeight={35} 
        iconSize={50}
        step={1}
        valueType='real'
        rounded 
        textColor='#289F97' 
        iconStyle={{ color: 'white' }} 
        rightButtonBackgroundColor='#289F97' 
        leftButtonBackgroundColor='#289F97'
      />
     );
 }

 _renderElementLocal = (index, key) => {
  return(
   <NumericInput
    value={this.state.members.member[index].point} 
    // value={5}
    onChange={(value) => this._handleOnChange(value, index, key)} 
    minValue={0}
    maxValue={10} 
    totalWidth={80} 
    totalHeight={35} 
    iconSize={50}
    step={1}
    valueType='real'
    rounded 
    textColor='#289F97' 
    iconStyle={{ color: 'white' }} 
    rightButtonBackgroundColor='#289F97' 
    leftButtonBackgroundColor='#289F97'
    />
  );
 }
  render() {
    let count=0;
    console.log(this.props.invited)
    if(this.state.isLoading){
      return(
        <View>
          <ActivityIndicator style={{marginTop: 300}} size="large" color="#289f97"/>
        </View>
      );
    };
    this.state.members.member.map(item => {
      if(item.point != 0) {
        count = count+1
      }
    })
    return (
      <MainScreen style={styles.container}>
        {/* <Header title="Kepedulian" setting back /> */}
        <View style={{backgroundColor: '#289F97', height : 56, width: 411, flexDirection: 'row'}}>
          {/* <Back style={{alignSelf:'flex-start', marginTop: 20, marginLeft : 10}} onPress={this._onBackPress}/> */}
          <Text style={styles.title}>{this.props.header.response.name}</Text>
          {/* <Setting style={{alignSelf:'flex-end'}}></Setting> */}
        </View>
        <View style={styles.container}>
        <View style={styles.MainContainer}>
          <FlatList
             data = {this.state.members.member}
             ItemSeparatorComponent={this.FlatListItemSeparator}
             renderItem={({ item, index }) => (
               <View  style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                 <Text style={styles.item}>
                   {item.name}
                 </Text>
                 {this.state.status ? this._renderElementAS(index, item.key) : this._renderElementLocal(index, item.key)}
               </View>
             )}
             keyExtractor={(item, index) => index.toString()}
           />
         </View>
          <View style={{marginBottom:10}}>
           {count == this.state.members.member.length ? <Button title="submit" disabled={false} onPress={this._onPress} type="raised-ripple"/> : <Button title="submit" disabled={true} onPress={this._onPress} type="raised-ripple"/> }
          </View>
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
    datapoint : state.dataPoint,
    point : state.point,  
    header : state.measureSelected,
    invited : state.eventSelected,
    squad : state.squadSelected,
    asesor : state.user.response.data.key,
    updateDataPoint : state.updateDataPoint,
    userKey: state.dataProject,
    sprint: state.detailEvent


  }
}

const mapDispatchToProps = dispatch => {
  return {
    createPoint : (allPoint) => dispatch(createDataPoint(allPoint)),
    updatePoint : (measurementId,updateDataMembers, datapatch, datafix) => dispatch(updateDataPoint(measurementId,updateDataMembers, datapatch, datafix)),
    initDataAs : (initData) => dispatch(initDataAs(initData))
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Component)
