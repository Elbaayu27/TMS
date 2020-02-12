import { StyleSheet } from 'react-native';
import { COLOR_WHITE, FONT_HEADLINE6_PRIMARY } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: COLOR_WHITE
  },
  text:{
    fontSize: 17,
    color:'#fff',
    fontStyle:'italic',
    marginLeft: 10
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
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
  textDate:{
    fontSize: 17,
    color:'#fff',
    fontStyle:'italic',
    alignSelf: 'center'
  },
  title : {
    ...FONT_HEADLINE6_PRIMARY,
    color: COLOR_WHITE,
    alignSelf: 'center',
    marginLeft: 100
  },
});

export default styles;

