//This is an example code to get DatePicker//
import React from 'react';
//import react in our code.
import { View, StyleSheet } from 'react-native';
//import all the components we are going to use.
import DatePicker from 'react-native-datepicker';
//import DatePicker from the package we installed
import PropTypes from 'prop-types';


export default class Component extends React.Component {
  constructor(props) {
    super(props);
    //set value in state for initial date
    // this.state = { date: '15-05-2019' };
  }

  render() {
    const {onDateChange, date, placeholder} = this.props;
    return (
      <View style={styles.container}>
        <DatePicker
          style={{ width: 340}}
          date={date} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder={placeholder}
          format="YYYY-MM-DD"
          minDate="2016-01-01"
          maxDate="2030-01-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              borderRadius: 6,
              borderWidth:1,
              borderColor:'#707A89',
              overflow: 'hidden',
              marginLeft: 36,
              
            },
          }}
          onDateChange={onDateChange}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    // padding: 16,
  },
});
Component.propTypes = {
  placeholder: PropTypes.string
};

