import React from 'react';
import { View, StatusBar, Text, FlatList, TouchableOpacity} from 'react-native';
import RadioButton from '../../components/elements/RadioButton';
import styles from './styles';
import Button from '../../components/elements/Button';
const timer = require('react-native-timer');
// import { Button } from 'native-base';
import CountDown from 'react-native-countdown-component';


export default class Component extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      count:3600,
      number:{},
      selected: '',
      skill:[{id:'01',nama:'Laravel'},{id:'02',nama:'React Native'},{id:'03',nama:'CodeIgniter'},{id:'04',nama:'Flutter'},{id:'05',nama:'Kotlin'}],
      Data:{skill:'laravel',
            soal: [
              {
                id_soal:1,
                soal:'Apa itu laravel ?',
                jawaban:[
                  {id_jawaban:1,
                    jawaban: "Framework"
                  },
                  {id_jawaban:2,
                    jawaban: "OS"
                  },
                  {id_jawaban:3,
                    jawaban: "Kernel"
                  },
                  {id_jawaban:4,
                    jawaban: "Text Editor"
                    },
                ]
              },
              {
                id_soal:2,
                soal:'Apa itu laravel ?',
                jawaban:[
                  {id_jawaban:5,
                    jawaban: "Framework"
                  },
                  {id_jawaban:6,
                    jawaban: "OS"
                  },
                  {id_jawaban:7,
                    jawaban: "Kernel"
                  },
                  {id_jawaban:8,
                    jawaban: "Text Editor"
                    },
                ]
              },
              {
                id_soal:3,
                soal:'Apa itu laravel ?',
                jawaban:[
                  {id_jawaban:9,
                    jawaban: "Framework"
                  },
                  {id_jawaban:10,
                    jawaban: "OS"
                  },
                  {id_jawaban:11,
                    jawaban: "Kernel"
                  },
                  {id_jawaban:12,
                    jawaban: "Text Editor"
                    },
                ]
              },
              {
                id_soal:13,
                soal:'Apa itu laravel ?',
                jawaban:[
                  {id_jawaban:14,
                    jawaban: "Framework"
                  },
                  {id_jawaban:15,
                    jawaban: "OS"
                  },
                  {id_jawaban:16,
                    jawaban: "Kernel"
                  },
                  {id_jawaban:117,
                    jawaban: "Text Editor"
                    },
                ]
              }
            ]
    },
  };
}


  _onPress = () => {
    this.props.navigation.navigate('Exam')
  };

  _onSelect = (name, value) => {
    this.setState({selected: value})
  }

  _counting = () => {
    timer.setInterval(() => {
      this.setState({
        ...this.state,
        count: this.state.count-1
      })
    }, 10000);
  }

  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View
        style={{ height: 1, width: '100%', backgroundColor: '#000' }}
      />
    ); 
  };

  render() {
    console.log(this.state.count);
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
            until={3600}
            onFinish={() => alert('finished')}
            onPress={() => alert('hello')}
            size={15}
            digitStyle={{backgroundColor: '#175873'}}
            timeToShow={['H', 'M', 'S']}
          />
        </View>

        <FlatList
              data={this.state.Data.soal}
              extraData={this.state}
              // ItemSeparatorComponent={this.FlatListItemSeparator}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <View style={{borderWidth:0.2,width: 395, alignSelf: 'center', marginTop: 10, elevation:3, paddingTop:10, paddingLeft:10, borderBottomColor: '#f1f1f1', paddingRight:10}}>
              {/* Soal */}
              <View style={{flexDirection: 'row'}}>
                <Text>{item.id_soal}. </Text>
                <Text>{item.soal}</Text>
              </View>
              <FlatList
                    data={this.state.Data.soal[index].jawaban}
                    extraData={this.state.selected}
                    // ItemSeparatorComponent={this.FlatListItemSeparator}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => (
                      <View style={{alignSelf: 'flex-start'}}>
                        <RadioButton
                          name={item.jawaban} 
                          selected={ this.state.selected === item.id_jawaban ? true :false} 
                          value={item.id_jawaban}
                          onSelect={this._onSelect}
                          disabled={false}
                        />
                      </View> 
                       )} 
                   />
              </View>
                )}
            /> 
            <View style={{alignSelf:'center', marginBottom: 10}}>
              <Button title="submit" disabled={false} type="raised-ripple"/>
            </View>
      </View>
    );
  }
}
