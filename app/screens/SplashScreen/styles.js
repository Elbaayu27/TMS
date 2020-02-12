import { StyleSheet } from 'react-native';
import { COLOR_BASE_PRIMARY_MAIN, FONT_HEADLINE6_PRIMARY, COLOR_WHITE  } from '../../styles';

const styles = StyleSheet.create({
  button: {
    // paddingHorizontal: 20,
    // paddingVertical: 10,
    // backgroundColor: COLOR_BASE_PRIMARY_MAIN
    alignItems:'center',
    paddingTop:250
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20
  },
  title : {
    ...FONT_HEADLINE6_PRIMARY,
    color: COLOR_WHITE,
    alignSelf: 'center',
    marginLeft: 100
  },
  circle: {
     width: 70, 
     height: 70,
     borderRadius: 100/2, 
     backgroundColor: '#175873',
    //  marginLeft:50,
    //  marginTop: 20,
     top:100,
     left:50,
     position:'absolute'
     },
  lock: {
     width: 60, 
     height: 60,
     top:100,
     left:60,
     position:'absolute'
  }
});

export default styles;
