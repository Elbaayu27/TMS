import React from 'react';
import { Picker, View, StyleSheet, Text } from 'react-native';
import {
  FONT_SUBTITLE1_PRIMARY,
  COLOR_GREY_DARK
} from '../../../styles';
import PropTypes from 'prop-types';

export default class Component extends React.Component {
  constructor(props) {
    super(props);

  }
  _coba = () => {

  }
  render() {
    const {selectedValue, onValueChange, label} = this.props;
    listData = this.props.data;
    return (
      <View style={styles.container}>
        <Picker style={{height:50, width:300}}
          selectedValue={selectedValue}
          onValueChange={onValueChange}>
            <Picker.Item label={label} color='#707A89' value='0' />
            {
              listData.map((data, i) => {
                return <Picker.Item label={data.label} color={data.color} value={data.value} key={i} />}
                
            )}
        </Picker>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    height:50,
    width:340,
    borderRadius: 4,
    borderWidth:1,
    borderColor:'#707A89',
    overflow: 'hidden',
    justifyContent: 'center',
    flexDirection: 'row',
    
  },
  text: {
    fontSize: 20,
    alignSelf: 'center',
    fontFamily: 'Quicksand-Regular'
    
    
  },
});

Component.propTypes = {
  label: PropTypes.string
};