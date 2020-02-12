import { StyleSheet } from 'react-native';
import { COLOR_WHITE, FONT_HEADLINE6_PRIMARY } from '../../styles';

const styles = StyleSheet.create({
  container: {
    borderRadius:100/4,
    height:370,
    width:380,
    backgroundColor:'#175873',
    top:200,
    left:16,
    flexDirection:'column'
  },
  SectionHeaderStyle: {
    backgroundColor: '#289f97',
    fontSize: 15,
    padding: 5,
    color: '#fff',
    alignSelf:'stretch',
    textAlign:'center',
    fontStyle:'italic'
  

  },
  SectionListItemStyle: {
    fontSize: 15,
    padding: 15,
    color: '#000',
    backgroundColor: '#F5F5F5',
  },
  title : {
    ...FONT_HEADLINE6_PRIMARY,
    color: COLOR_WHITE,
    alignSelf: 'center',
    marginLeft: 100
  },
  carousel : {
    position:'absolute',
    height:100,
    width:100,
    borderRadius:100/2,
    left:160,
    top:5,
  },
  TouchableOpacityStyle:{
 
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
 
  FloatingButtonStyle: {
 
    resizeMode: 'contain',
    width: 50,
    height: 50,
  }
  
});

export default styles;
