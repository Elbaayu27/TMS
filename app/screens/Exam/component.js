import React from 'react';
import { View, StatusBar, Text, FlatList, TouchableOpacity, Alert} from 'react-native';
// import RadioButton from '../../components/elements/RadioButton';
import RadioForm from 'react-native-simple-radio-button';
import styles from './styles';
import Button from '../../components/elements/Button';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
const timer = require('react-native-timer');
import network from '../../network';
// import { Button } from 'native-base';
import CountDown from 'react-native-countdown-component';
import { connect } from 'react-redux';
import {dataSkill} from '../../actions';

const radio_props = [
  {label: 'param1', value: 0 },
  {label: 'param2', value: 1 }
];


class Component extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      count:3600,
      number:{},
      loading:true,
      soal: null,
      jawaban: [],
      index : []
     
  };
}

async componentDidMount() {
  await fetch(network.ADDRESS+'/soal', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify({
      idSkill: this.props.dataSkill.idSkill
    })
  }).then(response => response.json())
    .then(responseJson => {
      if (responseJson.success === true) {
        this.setState({
          soal: responseJson.data[0].soal,
          loading: false
        })
      }
      else {
        Alert.alert(responseJson.message);
      }
    }).catch(response => Alert.alert(response))
}


  _submitExam = async () => {
    await fetch(network.ADDRESS+'/submitExam', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        idSkill: this.props.dataSkill.idSkill,
        jawaban: this.state.jawaban,
        idUser: this.props.userAccount.data.id_jobseeker
      })
    }).then(response => response.json())
      .then(responseJson => {
        if (responseJson.success === true) {
          Alert.alert("Score Anda " , responseJson.data.skor, [
            {text: 'OK', onPress: () => this.props.navigation.navigate('Home')},
          ]);
        }
        else {
          Alert.alert("Error", responseJson.message, [
            {text: 'OK', onPress: () => this.props.navigation.navigate('Home')},
          ]);
        }
      }).catch(response => Alert.alert(response))
  };


  _counting = () => {
    timer.setInterval(() => {
      this.setState({
        ...this.state,
        count: this.state.count-1
      })
    }, 10000);
  }

  _onFinish = async () => {
    this.setState({
      loading: true,
    })

    await fetch(network.ADDRESS+'/submitExam', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        idSkill: this.props.dataSkill.idSkill,
        jawaban: this.state.jawaban,
        idUser: this.props.userAccount.data.id_jobseeker
      })
    }).then(response => response.json())
      .then(responseJson => {
        if (responseJson.success === true) {
          Alert.alert("Score Anda " , responseJson.data.skor, [
            {text: 'OK', onPress: () => this.props.navigation.navigate('Home')},
          ]);
        }
        else {
          Alert.alert("Error", responseJson.message, [
            {text: 'OK', onPress: () => this.props.navigation.navigate('Home')},
          ]);
        }
      }).catch(response => Alert.alert(response))
  }

  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View
        style={{ height: 1, width: '100%', backgroundColor: '#000' }}
      />
    ); 
  };

  _handleLoading = () => {
    return(
      <View style={{alignSelf:'center', marginBottom: 10}}>
              <Button title="submit" disabled={true} type="raised-ripple" onPress={this._submitExam}/>
      </View>
    );
  }

  _handleLoadingFalse = () => {
    return(
      <View style={{alignSelf:'center', marginBottom: 10}}>
              {this.state.soal.length === this.state.index.length ? <Button title="submit" disabled={false} type="raised-ripple" onPress={this._submitExam}/> 
              :<Button title="submit" disabled={true} type="raised-ripple" onPress={this._submitExam}/>}
            </View>
    );
  }

  render() {
    console.log(this.state.jawaban);
    console.log(this.props.dataSkill.idSkill)
    {this._counting}
    return (
      <View style={{flex:1}}>
        <StatusBar
          transculent={false}
          backgroundColor='#175873'
          barStyle='light-content'
        />
        
        <View style={{marginTop:10}}>
          <CountDown
            until={120}
            onFinish={this._onFinish}
            size={15}
            digitStyle={{backgroundColor: '#175873'}}
            timeToShow={['H', 'M', 'S']}
          />
        </View>

       {/* FLatlist */}
       <FlatList
              data={this.state.soal}
              extraData={this.state}
              // ItemSeparatorComponent={this.FlatListItemSeparator}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                let itemParent = item.id_soal;
                let props_radio = []
                item.jawaban.map( item => {
                  props_radio.push({label: item.nama, value: item.id_jawaban})
                })
                return(
                  <View style={{borderWidth:0.2,width: 395, alignSelf: 'center', marginTop: 10, elevation:3, paddingTop:10, paddingLeft:10, borderBottomColor: '#f1f1f1', paddingRight:10}}>
                  {/* Soal */}
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color:'black'}}>{index+1}. </Text>
                    <Text style={{color:'black'}}>{item.pertanyaan}</Text>
                  </View>
                  
                  <View style={{marginLeft:15, marginTop:5}}>
                          <RadioForm
                            radio_props={props_radio}
                            initial={-1}
                            onPress={(value) => {
                              if(!this.state.index.includes(itemParent)) {
                                this.setState({
                                  ...this.state,
                                  index: [...this.state.index, itemParent],
                                  jawaban : [...this.state.jawaban, {id_soal: itemParent, id_jawaban: value}]
                                })
                              }
                              else {
                                this.setState({
                                  ...this.state,
                                  jawaban : this.state.jawaban.map(item => {
                                    return item.id_soal === itemParent ? {...item, id_jawaban : value} : item;
                                  })
                                })
                              }
                            }}
                            buttonSize={10}
                            buttonColor={'#175873'}
                            selectedButtonColor={'#175873'}
                          />
                        </View>
                  
                  </View>
                );
              }
               
                }
            /> 

            {/* Button Submit */}
            {this.state.loading === true ? this._handleLoading() :this._handleLoadingFalse()}

        {/* Loading */}
        <OrientationLoadingOverlay
          visible={this.state.loading}
          color="white"
          indicatorSize="large"
          messageFontSize={24}
          message="Loading"
          />
      </View>
    );
  }
}

const mapStateToProps = state => {

  return {
    //  status: state.isLogged,
    // akun : state.isLogged.akun,
    // user : state.user,
    // userAccount : state.userAccount,
    dataSkill : state.dataSkill,
    userAccount : state.userAccount

  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchDataSkill: (idSkill, name) => dispatch(dataSkill(idSkill, name)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
