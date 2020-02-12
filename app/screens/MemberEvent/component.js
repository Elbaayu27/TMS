import React from 'react';
import { View, FlatList,Text, ActivityIndicator, ImageBackground} from 'react-native';
import MainScreen from '../../components/layouts/MainScreen';
import Header from '../../components/elements/Header';
import Back from '../../../assets/svgs/Back';
import Check from '../../../assets/svgs/Check'
import Button from '../../components/elements/Button';
import Tabs from '../../components/elements/Tabs';
import styles from './styles';
import { connect } from 'react-redux';
import { getDataMember, getDataEvent, getEventSelected} from '../../actions';

class Component extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      isLoading : true,
      tabIndex: 0,
      data : this.props.squadId,
      show : false
    };
  }

  _onBackPress = () => {
    this.props.navigation.navigate('Home');
  };

  _getTabData = () => [
    {
      name: 'Event',
      renderer: this._renderTabEvent
    },
    {
      name: 'Member',
      renderer: this._renderTabMember
    }
  ];

  _onTabChanged = index => {
    
  };

  _renderTabMember = () => {
    return (
      <View style={styles.containerInsideTab}>
        <View style={styles.MainContainer}>
              <FlatList
              data={this.props.members.response.data}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <View  style={{flex: 1, flexDirection: 'row', justifyContent:'space-between' }}>
                  <Text style={styles.item}>
                    {item.name}
                  </Text>
                  <Text style={styles.ItemMember}>
                    {item.point}
                  </Text>
                </View>
              )}
              />
        </View>
      </View>
    );

  };

  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View
        style={{ height: 1, width: '100%', backgroundColor: '#000' }}
      />
    ); 
  };

  _renderTabEvent = () => {
    if (this.props.title.response.data.title === "Scrum Master"){
      return(
        <View style={styles.containerInsideTabEvent}>
          <View style={styles.MainContainer}>
            <FlatList
                data={this.props.dataEvent.response.data}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <View  style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.item} onPress={async () => 
                    {
                      const dataEvent = {id: item.id, event: item.name,category:item.category, invited: item.invited, status: item.status}
                      await this.props.eventChoosen(dataEvent)
                      this.props.navigation.navigate('Details')
                    }
                    }>
                      {item.name}
                    </Text>
                    {item.status == 'COMPLETED'&&<Text style={{color:'#ffffff', fontSize:11, backgroundColor:'#2c9123', width:55, height: 17, marginTop:10, opacity:1}}>Completed</Text>}
                    {item.status == 'OPEN' &&<Text style={{color:'#ffffff', fontSize:11, backgroundColor:'#289f97', width:55, height: 17, marginTop:10, opacity:1}}>      Open</Text>}
                  </View>
                )}
            />
          </View>
          {this.state.show ? ( 
            <Button title="create event" disabled={false} onPress={ () => this.props.navigation.navigate('CreateEvent')} type="raised-ripple" />
          ): null}
          
        </View>
      );
    }
    else {
      return(
        <View style={styles.containerInsideTabEvent}>
          <View style={styles.MainContainer}>
            <FlatList
                data={this.props.dataEvent.response.data}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <View  style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.item} onPress={async () => 
                    {
                      const dataEvent = {id: item.id, event: item.name,category:item.category, invited: item.invited, status: item.status}
                      await this.props.eventChoosen(dataEvent)
                      this.props.navigation.navigate('Details')
                    }
                    // this.props.navigation.navigate('ListAssessment',
                    // {EventMembers : item.eventMembers})
                    }>
                      {item.name}
                    </Text>
                    {item.status == 'COMPLETED'&&<Text style={{color:'#ffffff', fontSize:11, backgroundColor:'#2c9123', width:65, height: 17, marginTop:10, opacity:1}}>Completed</Text>}
                    {item.status == 'NOT REVIEW' &&<Text style={{color:'#ffffff', fontSize:11, backgroundColor:'#ded00b', width:65, height: 17, marginTop:10, opacity:1}}>Not Review</Text>}
                    {item.status == 'OPEN' &&<Text style={{color:'#ffffff', fontSize:11, backgroundColor:'#289f97', width:55, height: 17, marginTop:10, opacity:1}}>      Open</Text>}
                  </View>
                )}
            />
          </View>
          {this.state.show ? ( 
            <Button title="create event" disabled={false} onPress={ () => this.props.navigation.navigate('CreateEvent')} type="raised-ripple" />
          ): null}
          
        </View>
      );
    }
    
  } 
  
async componentDidMount() {
const event = await fetch('http://cdp-api-dev.vsan-apps.playcourt.id/api/v1/mobile/event?squadId='+this.state.data,{
method: 'GET',
headers: {
  Accept: 'application/json',
  'Content-Type' : 'application/json',
  'Authorization' : `Bearer ${this.props.token.response.data.token}`
  // 'Authorization' : 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJoZW5pLm11bHlhbmkiLCJuYW1lIjoiSGVuaSBNdWx5YW5pIiwidGl0bGUiOiJCYWNrZW5kIERldmVsb3BlciIsImVtYWlsQWRkcmVzcyI6ImhlbmkubXVseWFuaUBzdHVkZW50LnVwaS5lZHUiLCJhY3RpdmUiOiJ0cnVlIiwiaW1hZ2UiOm51bGwsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTcyMjY5NDk4LCJleHAiOjE1NzIzMjk0OTgsImF1ZCI6Ijk3YjMzMTkzLTQzZmYtNGU1OC05MTI0LWIzYTliOWY3MmMzNCIsImlzcyI6InRlbGtvbWRldiJ9.NurCnhtVZw4pyAWZRpaVkuDicIbY51PDSETSKTsIhwT5dZ2KW6GCWcPVXnfYSBbrTKt1wlYqe5_NLD_QY0qmYL2ZRHCQvFJiQ2PUcRuePEuP3TfkF4HsH26cxiac1uHF14ku784Bg6_-jBy8rWAeTdOODyNpdBcvfb4bwcq9q8eL-pR0vfVUdyQ7ADwiwJ1DsaaGbzEj2LHzjjKRJAuyPK8-z2eh_jl9uvaxbfqtQkvIdYpzYhc_ChsPAQb2JqDa7yV_Ky4xZ6ZBEL-KvKRi04ZYUpovNTZsXB5S9pCUDjk4YcmBiiMoJnLdUkrMAaAWn6iql0YsfIqat6p02kJ1SQbFymtbdx6ipmA9N0cmv7DhZ4sjAZFDGcuex4OhoPGLF_sWjp6c0wPJgWElscbeLQds-kVsaLmTdUzHn_66pBTCxxYObmxHQBsPnzdbIsDnoP8iAPCEPSnVM4LnkyHlrftI4o1-5itK1qfZEf0sQ0gh_6nSnfGg8ymmzKMp5lgc9B_FYG_NAkyStZeScdbwqu7HhxnuD1e6DBE048geonV8Qlf6Wn5n-Vbr04G-klspKEQWbVUe3FL39Q6dCWDJJcHJmUaVgfzvmej1IVifSCUdtkTkDVpIZtvy2qbArLnZqLNJ2dExqHn11xi3ZJDTAxGdKOvxOAgHZPtCNkonSFU'
}
})
.then(async response => await response.json())
.then(async (responseJson)=> {
  console.log('EVENT')
  console.log(responseJson)
  await this.props.dispatchDataEvent(responseJson)
})
.catch(error=>console.log('memberevent event'+error))

const res = await fetch('http://cdp-api-dev.vsan-apps.playcourt.id/api/v1/mobile/member?squadId='+this.state.data,
// virtserver.swaggerhub.com/telkomdds/Dashboard_Performance_System/1.0.0
{
  method: 'GET',
  headers: {
  'Content-Type' : 'application/json',
  'Authorization' : `Bearer ${this.props.token.response.data.token}`
  }
}
)
.then(async response => await response.json())
.then(async (responseJson)=> {
  // console.log(responseJson)
  await this.props.dataMember(responseJson);
  await this.setState({
    ...this.state,
   isLoading : false
  });
})
.catch(error=>console.log('memberevent member'+error)) //to catch the errors if any

//Cek title ke reducer user
if(this.props.title.response.data.title === "Scrum Master") 
{
  this.setState({
    ...this.state,
    show : true
  })
} // end if
  } //componenDidmount



  render() {
    console.log(this.props.userkey.response.data.key)
    console.log(this.state.data)
    // console.log(this.props.dataEvent)
    if(this.state.isLoading){
      return(
        <View>
          <ActivityIndicator style={{marginTop: 300}} size="large" color="#289f97"/>
        </View>

      );
    }
    return (
      <MainScreen style={styles.container}>
        {/* <Header title= {this.props.header} setting back /> */}
        <View style={{backgroundColor: '#289F97', height : 56, width: 411, flexDirection: 'row', justifyContent:'flex-start'}}>
          <Back style={{alignSelf:'flex-start', marginTop: 20, marginLeft : 10}} onPress={this._onBackPress}/>
          <Text style={styles.title}>{this.props.header}</Text>
          {/* <Setting style={{alignSelf:'flex-end'}}></Setting> */}
        </View>
        <View style={styles.container}>
          <Tabs
            tabsData={this._getTabData()}
            tabContainerStyle={styles.tabContainer}
            tabLabelStyle={styles.tabLabelStyle}
            tabLabelSelectedStyle={styles.tabSelectedLabel}
            bottomLineStyle={styles.bottomLineStyle}
            onTabChanged={this._onTabChanged}
          />
        </View>
      </MainScreen>
    );
  
}

} //End Class

const mapStateToProps = state => {
  return {
    dataEvent : state.dataEvent,
    dataAllMember : state.dataMember.listMember,
    header : state.squadSelected.response.squad,
    squadId : state.squadSelected.response.id,
    members : state.dataMember,
    eventCreated : state.eventCreated,
    title : state.dataProject,
    token : state.user,
    userkey : state.dataProject
  }
};

const mapDispatchToProps = dispatch => {
  return {
    dataMember : (get) => dispatch(getDataMember(get)),
    dispatchDataEvent : (get) => dispatch(getDataEvent(get)),
    eventChoosen : (get) => dispatch(getEventSelected(get))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Component)