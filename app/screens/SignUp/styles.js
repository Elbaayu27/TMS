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
  inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10,
    alignSelf:'center',
    marginTop:20
  },    
  inputBox2: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10,
    alignSelf:'center',
    marginTop:10
  }, 
  logoText : {
    alignSelf:'center',
    marginVertical: 15,
    fontSize:18,
    color:'rgba(255, 255, 255, 0.7)'
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
     button: {
      width:200,
      alignSelf:'center',
      backgroundColor:'#1c313a',
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13, 
      // marginTop:165
  },
      buttonText: {
      fontSize:16,
      fontWeight:'500',
      color:'#ffffff',
      textAlign:'center'
  },

  judul: {
    fontSize: 22,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },
  image: {
    width: 320,
    height: 320,
  },
  slide:{
    flex:1
  },
  signupTextCont : {
    flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
    color:'rgba(255,255,255,0.6)',
    fontSize:16
  },
});

export default styles;
