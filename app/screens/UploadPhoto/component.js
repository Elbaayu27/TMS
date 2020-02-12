import React from 'react';
import { View, StatusBar, Text, FlatList, TouchableOpacity} from 'react-native';
import RadioButton from '../../components/elements/RadioButton';
import styles from './styles';
import Button from '../../components/elements/Button';
import Modal, { ModalContent } from 'react-native-modals';
// import { Button } from 'native-base';

export default class Component extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
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
    this.props.navigation.navigate('Exam');
  };

  _onSelect = (name, value) => {
    this.setState({selected: value})
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
    return (
      <View style={{flex:1}}>
        <StatusBar
          transculent={false}
          backgroundColor='#175873'
          barStyle='light-content'
        />
        <View style={{backgroundColor: '#175873', height : 56, width: 411,alignItems:'center', flexDirection: 'row'}}>
          <Text style={styles.title}>Skill Category</Text>
        </View>

        <FlatList
         data={this.state.skill}
         ItemSeparatorComponent={this.FlatListItemSeparator}
         keyExtractor={(item, index) => index.toString()}
         renderItem={({item, index}) => (
         <View  style={{flex: 1, flexDirection: 'row', justifyContent:'space-between' }}>
            <Text style={styles.item} onPress={this._onPress}>
              {item.nama}
            </Text>
          </View>
                   )}
          />
      </View>
    );
  }
}
