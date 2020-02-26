import { StyleSheet } from 'react-native';
import { COLOR_BASE_PRIMARY_MAIN, FONT_HEADLINE6_PRIMARY, COLOR_WHITE  } from '../../styles';

const styles = StyleSheet.create({
     button: {
      width:200,
      alignSelf:'center',
      backgroundColor:'#1c313a',
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13, 
      marginBottom:200,
      marginTop:50
  },

  button2: {
    width:100,
    alignSelf:'center',
    backgroundColor:'#d6d6d6',
    borderRadius: 15,
    marginVertical: 10,
    paddingVertical: 13, 
    // marginBottom:200,
    marginTop:100
},
      buttonText: {
      fontSize:16,
      fontWeight:'500',
      color:'#ffffff',
      textAlign:'center'
  },
});

export default styles;
