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

  _floating = () => {
    this.props.navigation.navigate('UploadCV')
  };

  render() {
    console.log(this.props.userAccount.data.id_jobseeker);
    return (
      <View style={{backgroundColor: '#455a64', flex:1}}>
        <StatusBar
             transculent={false}
             backgroundColor='#175873'
             barStyle='light-content'
             />
        <ScrollView>
          <View style={{backgroundColor:'#ffffff',flexDirection:'column', flexWrap: 'wrap', width:380, height: 500, borderRadius: 100/4, marginTop:60, marginLeft:16}}>
            <View style={{alignSelf:"center", marginTop:50, alignItems:'center'}}>
              <Text style={{fontSize:20, fontWeight:'bold', color:'black'}}>{this.props.userAccount.data.nm_jobseeker}</Text>
              <Text style={{alignSelf:'center', fontSize:18, fontWeight:'normal', color:'black'}}>{this.props.userAccount.data.email_jobseeker}</Text>
            </View>

            <View style={{marginTop:20,justifyContent:"flex-start", flexDirection:'row', marginLeft:20}}>
              <Image style={{width:30, height:30}} source={require('../../../assets/images/phone.png')}/>
              <View style={{flexDirection:'column', }}>
               <Text style={{fontSize:18,marginLeft:10}}>Phone</Text>
                <Text style={{fontSize:18, color:'black', marginLeft:10, fontWeight:"bold"}}>{this.props.userAccount.data.no_hp_jobseeker}</Text>
              </View>
            </View>

            <View style={{marginTop:20,justifyContent:"flex-start", flexDirection:'row', marginLeft:20}}>
              <Image style={{width:30, height:30}} source={require('../../../assets/images/orangeloc.png')}/>
              <View style={{flexDirection:'column', }}>
               <Text style={{fontSize:18,marginLeft:10}}>Address</Text>
               <Text style={{fontSize:18, color:'black', marginLeft:10, fontWeight:"bold"}}>{this.props.userAccount.data.alamat_jobseeker}</Text>
              </View>
            </View>

            <View style={{marginTop:20,justifyContent:"flex-start", flexDirection:'row', marginLeft:20}}>
              <Image style={{width:30, height:30}} source={require('../../../assets/images/gender.png')}/>
              <View style={{flexDirection:'column', }}>
               <Text style={{fontSize:18,marginLeft:10}}>Gender</Text>
               <Text style={{fontSize:18, color:'black', marginLeft:10, fontWeight:"bold"}}>{this.props.userAccount.data.jk_jobseeker}</Text>
              </View>
            </View>

            <View style={{marginTop:20,justifyContent:"flex-start", flexDirection:'row', marginLeft:20}}>
              <Image style={{width:30, height:30}} source={require('../../../assets/images/id.png')}/>
              <View style={{flexDirection:'column', }}>
               <Text style={{fontSize:18,marginLeft:10}}>Born Date</Text>
               <Text style={{fontSize:18, color:'black', marginLeft:10, fontWeight:"bold"}}>{this.props.userAccount.data.tgl_lahir_jobseeker}</Text>
              </View>
            </View>
            {this.props.userAccount.data.id_cv_jobseeker === null && 
            <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityStyle} onPress={this._floating}> 
             <Image style={styles.FloatingButtonStyle} source={require('../../../assets/images/addcircle.png')}/> 
            </TouchableOpacity>}
            {this.props.userAccount.data.id_cv_jobseeker === null && 
            <Text style={{fontSize:12, alignSelf:"flex-end", marginRight:25}}>Upload CV</Text>}
          </View>
        </ScrollView>
        {/* <Image style={styles.carousel} source={require('../../../assets/images/carousel.jpeg')}/> */}
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
     dataUser : state.dataProject,
     userAccount : state.userAccount
     
  }
};

const mapDispatchToProps = dispatch => {
  return {
    sendDataProjects : (index) => dispatch(getDataProject(index)),
    squadChoosen : (select) => dispatch(getSquadSelected(select)),
    dispatchUserAccount: (account) => dispatch(userAccount(account, true)),
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Component)
