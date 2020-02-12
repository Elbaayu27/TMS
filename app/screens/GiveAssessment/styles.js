import { StyleSheet } from 'react-native';
import { COLOR_WHITE, FONT_HEADLINE6_PRIMARY } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_WHITE
  },
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 5,
    width: 400,
    flexDirection: 'row'
  },

item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
TextStyle:{
  backgroundColor:'#289f97',
  padding: 10,
  fontSize: 18,
  height: 44,
},
title : {
  ...FONT_HEADLINE6_PRIMARY,
  color: COLOR_WHITE,
  alignSelf: 'center',
  marginLeft: 150
}
});

export default styles;
