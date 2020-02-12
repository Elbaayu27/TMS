import React from 'react';
import { View, Image, StatusBar, FlatList, Text, TextInput, ImageBackground, ScrollView } from 'react-native';
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
    this.props.navigation.navigate('Find');
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
          <Text style={styles.title}>Syarat - Ketentuan</Text>
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
