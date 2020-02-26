import React from 'react';
import { View, StatusBar, Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import RadioButton from '../../components/elements/RadioButton';
import styles from './styles';
import Button from '../../components/elements/Button';
import Modal, { ModalContent } from 'react-native-modals';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import network from '../../network';
// import { Button } from 'native-base';
import { connect } from 'react-redux';
import {userAccount, dataSkill} from '../../actions';

class Component extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      number:{},
      loading: true,
      selected: '',
      skill:null,
  };
}

async componentDidMount() {
  await fetch(network.ADDRESS+'/skillCategory', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify({
      idUser: this.props.userAccount.data.id_jobseeker
    })
  }).then(response => response.json())
    .then(responseJson => {
      if (responseJson.success === true) {
        this.setState({
          skill: responseJson.data,
          loading: false
        })
      }
      else {
        Alert.alert(responseJson.message);
      }
    }).catch(response => Alert.alert(response))
}

  _onPress = async (id_skill, name) => {
    console.log(id_skill, name);
    await this.props.dispatchDataSkill(id_skill, name)
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
         <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between' }}>
           {item.skor !== 'null' ?
            <Text style={styles.item} disabled={true}>
              {item.nama}
            </Text> 
            :
            <Text style={styles.item} onPress={ async () => 
                    {
                      await this.props.dispatchDataSkill(item.idSkill, item.nama)
                      this.props.navigation.navigate('Exam')
                    }}>
              {item.nama}
            </Text> }
            {item.skor !== 'null' ? <Text style={{marginTop:5,marginRight:10,fontWeight:'bold',fontSize:16, color:'green'}}> {item.skor}</Text> :  <Text style={{marginTop:5,marginRight:10,fontWeight:'bold', fontSize:16, color:'red'}}>Not Exam Yet </Text> }
          </View>
                   )}
          />

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
    userAccount : state.userAccount

  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchUserAccount: (account) => dispatch(userAccount(account, true)),
    dispatchDataSkill: (idSkill, name) => dispatch(dataSkill(idSkill, name)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
