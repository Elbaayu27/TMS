import { StyleSheet } from 'react-native';
import { COLOR_WHITE, COLOR_GREY, COLOR_GREY_DARK, FONT_BODY1_PRIMARY,  FONT_HEADLINE6_PRIMARY } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_WHITE
  },
  containerInsideTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerInsideTabEvent: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom:15
  },
  tabContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR_GREY
  },
  bottomLineStyle: {
    height: 4
  },
  tabLabelStyle: {
    ...FONT_BODY1_PRIMARY,
    color: COLOR_GREY
  },
  tabSelectedLabel: {
    ...FONT_BODY1_PRIMARY,
    color: COLOR_GREY_DARK
  },
  subContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLOR_WHITE,
    
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
ItemMember: {
  padding: 10,
  fontSize: 18,
  height: 44
},
text:{
  fontSize: 17,
  color:'#fff',
  fontStyle:'italic',
},
title : {
  ...FONT_HEADLINE6_PRIMARY,
  color: COLOR_WHITE,
  alignSelf: 'center',
  marginLeft: 50
}
});

export default styles;


