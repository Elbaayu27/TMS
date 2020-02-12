import React from 'react';
import { View, Image, StatusBar, ScrollView, Text, TouchableOpacity, TextInput} from 'react-native';
import PropTypes from 'prop-types';
// import Header from '../../components/elements/Header';
import styles from './styles';
import { connect } from 'react-redux';
import {getDataProject, getSquadSelected} from '../../actions';


class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      bandwitdh: '0',
      dataSource: [],
      // data : this.props.user.response.data.key
    };
  }

  _onPress = () => {
    this.props.navigation.navigate('Find');
  };  


  render() {
    return (
      <View style={{backgroundColor: '#455a64', flex:1}}>
        <StatusBar
             transculent={false}
             backgroundColor='#175873'
             barStyle='light-content'
             />
        <ScrollView>
          <View style={{backgroundColor:'#ffffff',flexDirection:'column', flexWrap: 'wrap', width:380, height: 500, borderRadius: 100/4, marginTop:60, marginLeft:16}}>
            <View style={{alignSelf:"center", marginTop:50}}>
              <Text style={{fontSize:20, fontWeight:'bold', color:'black'}}>Sofyan Maulana</Text>
              <Text style={{alignSelf:'center', fontSize:18, fontWeight:'normal', color:'black'}}>sofyan@gmail.com</Text>
            </View>

            <View style={{marginTop:20,justifyContent:"flex-start", flexDirection:'row', marginLeft:20}}>
              <Image style={{width:30, height:30}} source={require('../../../assets/images/score.png')}/>
              <View style={{flexDirection:'column', }}>
               <Text style={{fontSize:18,marginLeft:10}}>Score</Text>
               <Text style={{fontSize:18, color:'black', marginLeft:10, fontWeight:"bold"}}>95,5</Text>
              </View>
            </View>

            <View style={{marginTop:20,justifyContent:"flex-start", flexDirection:'row', marginLeft:20}}>
              <Image style={{width:30, height:30}} source={require('../../../assets/images/skill.png')}/>
              <View style={{flexDirection:'column', }}>
               <Text style={{fontSize:18,marginLeft:10}}>Skill</Text>
               <Text style={{fontSize:18, color:'black', marginLeft:10, fontWeight:"bold"}}>Laravel</Text>
              </View>
            </View>

            <View style={{marginTop:20,justifyContent:"flex-start", flexDirection:'row', marginLeft:20}}>
              <Image style={{width:30, height:30}} source={require('../../../assets/images/orangeloc.png')}/>
              <View style={{flexDirection:'column', }}>
               <Text style={{fontSize:18,marginLeft:10}}>Address</Text>
               <Text style={{fontSize:18, color:'black', marginLeft:10, fontWeight:"bold"}}>Indramayu</Text>
              </View>
            </View>

            <View style={{marginTop:20,justifyContent:"flex-start", flexDirection:'row', marginLeft:20}}>
              <Image style={{width:30, height:30}} source={require('../../../assets/images/id.png')}/>
              <View style={{flexDirection:'column', }}>
               <Text style={{fontSize:18,marginLeft:10}}>Age</Text>
               <Text style={{fontSize:18, color:'black', marginLeft:10, fontWeight:"bold"}}>24</Text>
              </View>
            </View>

            <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityStyle} >
            <Image style={styles.FloatingButtonStyle} source={require('../../../assets/images/addcircle.png')}/>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Image style={styles.carousel} source={require('../../../assets/images/carousel.jpeg')}/>
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
