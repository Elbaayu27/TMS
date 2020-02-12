import { StyleSheet } from 'react-native';
import { COLOR_WHITE, FONT_HEADLINE6_PRIMARY  } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLOR_WHITE,
    
  },
  title : {
    ...FONT_HEADLINE6_PRIMARY,
    color: COLOR_WHITE,
    alignSelf: 'center',
    marginLeft: 145
  },
  MainContainer: {
    justifyContent: 'space-between',
    alignItems : 'center',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 50,
    marginTop: 10,
    width: 400,
    flexDirection: 'column'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  }
});

export default styles;

