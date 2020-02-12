import React from 'react';
import { View, Image, StatusBar, FlatList, Text, TextInput, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Back from '../../../assets/svgs/Back';
import styles from './styles';
import { connect } from 'react-redux';
import {getDataProject, getSquadSelected} from '../../actions';
import Checkbox from 'react-native-custom-checkbox';
import Button from '../../components/elements/Button';


class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      bandwitdh: '0',
      dataSource: [],
      data: [{nama:'Freon', harga:'Rp.30.000'}, {nama:'Lampu', harga:'Rp.50.000'}]
      // data : this.props.user.response.data.key
    };
  }

  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View
        style={{ height: 1, width: 300, backgroundColor: '#000', alignSelf:'center' }}
      />
    ); 
  };
  _onPress = () => {
    this.props.navigation.navigate('Home');
  };

  _onSKPress = () => {
    this.props.navigation.navigate('SyaratKetentuan');
  };



  render() {
    return (
      <View style={{backgroundColor: '#ffffff', flex:1}}>
        <StatusBar
             transculent={false}
             backgroundColor='#175873'
             barStyle='light-content'
             />
        <View style={{backgroundColor: '#175873', height : 56, width: 411, flexDirection: 'row'}}>
          <Back style={{alignSelf:'flex-start', marginTop: 10, marginLeft : 10}} onPress={this._onPress}/>
          <Text style={styles.title}>Refrigerator</Text>
        </View>
        
        <TouchableOpacity onPress={this._onSKPress}>
          <View style={{borderWidth:1, borderRadius:100/10, height: 40, width:350, marginTop:30, alignSelf:'center', flexDirection:'row', justifyContent:'center'}}>
            <Text style={{color:'#000', fontSize: 20, fontWeight:'400', alignSelf:'center'}}>Syarat dan Ketentuan</Text>
            <Image style={{width:30, height:30, marginTop: 5, marginLeft:15}} source={require('../../../assets/images/arrowright.png')}/>
          </View>
        </TouchableOpacity>

        <View style={{marginTop:30, justifyContent:'space-between', width:350, flexDirection:'row', alignSelf:'center'}}>
          <Image style={{width:30, height:30, marginTop: 5, marginLeft:5 }} source={require('../../../assets/images/blueloc.png')}/>
          <View style={styles.textAreaContainer} >
            <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="Lokasi Anda.."
            placeholderTextColor="black"
            numberOfLines={10}
            multiline={true}
            />
          </View>
        </View>

        <View style={{flexDirection:'row', justifyContent:'center', marginTop:30}}>
          <View style={{backgroundColor:'#175873', borderRadius:100/2, width:40, height:40, marginTop:5, alignSelf:'center'}}>
            <Image style={{width:20, height:20, marginTop: 13, marginLeft:10}} source={require('../../../assets/images/tools.png')}/>
          </View>
          <Text style={{color:'#000', fontSize: 20, fontWeight:'400', marginTop:10, paddingLeft:5}}>Info Service</Text>
        </View>

        {/* <ScrollView> */}
          <View style={{height:200, width:300, borderWidth:1, borderRadius:10, marginTop:10, alignSelf:'center'}}>
            <FlatList
                  data={this.state.data}
                  ItemSeparatorComponent={this.FlatListItemSeparator}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => (
                    <View  style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', width:300, alignSelf:'center'}}>
                      <Text style={styles.item} onPress={ async () =>
                      {
                        const dataMeasure = {id: item.measurementId, name: item.name}
                        await this.props.measureChoosen(dataMeasure)
                        this.props.navigation.navigate('GiveAssessment')
                      }
                      }>
                        {item.nama}
                      </Text>
                      <Text style={styles.item} onPress={ async () =>
                      {
                        const dataMeasure = {id: item.measurementId, name: item.name}
                        await this.props.measureChoosen(dataMeasure)
                        this.props.navigation.navigate('GiveAssessment')
                      }
                      }>
                        {item.harga}
                      </Text>
                    </View>
                  )}
              />
            </View>
          {/* </ScrollView> */}

          <View style={{marginTop:30, justifyContent:'flex-start', width:350, flexDirection:'row', alignSelf:'center'}}>
            <Checkbox
              // name = {item.key}
              name='checkbox1'
              checked={false}
              style={{backgroundColor: '#175873', color:'#ffffff', borderRadius: 2}}
              // onChange={(name, checked) =>this._handleOnChange(name, checked)}
            /> 
            <Text style={{color:'black', fontSize:15, marginLeft:5}}>
              Layanan satu hari jadi
            </Text>
          </View>

          <View style={{flexDirection:'row', justifyContent:'center', marginTop:30}}>
          <Button title="cari teknisi" disabled={false} onPress={ () => this.props.navigation.navigate('Verification')} type="raised-ripple" />
          </View>
      </View>
    );
  }
}

Component.propTypes = {
  listUsers: PropTypes.array
}; 

Component.defaultProps = {
  listUsers: []
};

const mapStateToProps = state => {
  return {
     projects : state.dataProject,
     user : state.user,
     dataUser : state.dataProject

     
  }
};

const mapDispatchToProps = dispatch => {
  return {
    sendDataProjects : (index) => dispatch(getDataProject(index)),
    squadChoosen : (select) => dispatch(getSquadSelected(select))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Component)
