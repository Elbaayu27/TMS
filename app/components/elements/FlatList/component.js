import React from 'react';
import { FlatList, Text, View } from 'react-native';
import styles, {FTYPES} from './styles';
import PropTypes from 'prop-types';
import NumericInput from '../NumericInput';
import Checkbox from 'react-native-custom-checkbox';
import {connect } from 'react-redux';

class Component extends React.Component { 
  
  FlatListItemSeparator = () => {
        return (
          //Item Separator
          <View
            style={{ height: 1, width: '100%', backgroundColor: '#000' }}
          />
        ); 
      };


    render() {
      // console.log(this.props.memberChoosen.eventMembers)
      const {type,} = this.props;
      if (type === FTYPES.CHECKBOX) {
        return (
          <View style={styles.MainContainer}>
           <FlatList
             data={this.props.dataAllMember.response.data}
             //data defined in constructor
             ItemSeparatorComponent={this.FlatListItemSeparator}
             //Item Separator View
             renderItem={({ item }) => (
               // Single Comes here which will be repeatative for the FlatListItems
               <View  style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginRight: 10 }}>
                 <Text style={styles.item}>
                   {item.name}
                 </Text>
                 <Checkbox
                   name = {item.name}
                   checked={false}
                   style={{backgroundColor: '#f2f2f2', color:'#900', borderRadius: 2}}
                   onChange={this.props.onChange} //Ngambil props dari crate event
                   /> 
               </View>
             )}
             keyExtractor={(item, index) => item.id.toString()}
           />
         </View>
         );
      }
      else if (type === FTYPES.NUMERIC) {
        return (
          <View style={styles.MainContainer}>
          <FlatList
             data={this.props.data}
             ItemSeparatorComponent={this.FlatListItemSeparator}
             renderItem={({ item, index }) => (
               <View  style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                 <Text style={styles.item}>
                   {item}
                 </Text>
                 <NumericInput/>
               </View>
             )}
             keyExtractor={(item, index) => index.toString()}
           />
         </View>
         );
      }
      else if (type === FTYPES.TABEVENT){
        return (
          <View style={styles.MainContainer}>
           <FlatList
             data={this.props.dataNameAllEvent}
             ItemSeparatorComponent={this.FlatListItemSeparator}
             keyExtractor={(item, index) => index.toString()}
             renderItem={({item, index}) => (
               <View  style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                 <Text style={styles.item} onPress={() => this.props.navigation.navigate('ListAssessment')}>
                   {item.eventName}
                 </Text>
               </View>
             )}
           />
         </View>
         );
      } //END ELSE IF
      else {
        return (
          <View style={styles.MainContainer}>
           <FlatList
             data={this.props.dataAllMember}
             ItemSeparatorComponent={this.FlatListItemSeparator}
             renderItem={({ item }) => (
               <View  style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                 <Text style={styles.item}>
                   {item.name}
                 </Text>
               </View>
             )}
             keyExtractor={(item, index) => item.id.toString()}
           />
         </View>
         );
      }
    }
  }
  
  Component.propTypes = {
    type : PropTypes.oneOfType([FTYPES.CHECKBOX, FTYPES.NUMERIC, FTYPES.TABEVENT])
  };
  

const mapStateToProp = state => {
  return {
    dataAllMember : state.dataMember,
    dataNameAllEvent : state.dataEvent.listEvent,
    memberChoosen : state.dataEvent.listEvent
  };
}

export default connect(mapStateToProp)(Component)
  