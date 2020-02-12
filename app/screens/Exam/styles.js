import { StyleSheet } from 'react-native';
import { COLOR_WHITE, FONT_HEADLINE6_PRIMARY } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_WHITE
  },
  button: {
    // paddingHorizontal: 20,
    // paddingVertical: 10,
    // backgroundColor: COLOR_BASE_PRIMARY_MAIN
    alignItems:'center',
    paddingTop:250
  },
  title : {
    ...FONT_HEADLINE6_PRIMARY,
    color: COLOR_WHITE,
    alignSelf: 'center',
    marginLeft: 140
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
},
});

export default styles;
