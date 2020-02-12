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
  tabContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR_GREY
  },
  tabLabelStyle: {
    ...FONT_BODY1_PRIMARY,
    color: COLOR_GREY
  },
  tabSelectedLabel: {
    ...FONT_BODY1_PRIMARY,
    color: COLOR_GREY_DARK
  },
  bottomLineStyle: {
    height: 4
  },
  item: {
    fontSize: 14,
    fontWeight:'bold',
    color:'black'
  },
  itemMember:{
    marginLeft:10,
    color:'black'
  }
});

export default styles;
