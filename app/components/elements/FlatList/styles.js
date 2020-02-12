import { StyleSheet } from 'react-native';

export const FTYPES = {
  NUMERIC : 'numeric',
  CHECKBOX: 'checkbox',
  TABEVENT: 'tabevent'
}
export default StyleSheet.create({
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
    }
  });