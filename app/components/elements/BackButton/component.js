import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles, {BTYPES} from './styles';
import Back from '../../../../assets/svgs/Back';

export default class Component extends React.Component {

  _onPress = () =>{
    this.props.navigation.goBack()
  }

  render() {
    // const {type,} = this.props;
    // if (type === BTYPES.HOME) {
      return (
        <TouchableOpacity onPress={this._onPress}  style={styles.container}>
           <Back />
        </TouchableOpacity>
       );
    // }
    // else if (type === BTYPES.MEMBEREVENT){
    //   return (
    //     <TouchableOpacity style={styles.container}>
    //       <Back/>
    //     </TouchableOpacity>
    //   );
    // }


    // return (
    //   <TouchableOpacity onPress={()=> this.props.navigation.navigate('Home')}  style={styles.container}>
    //     <Back />
    //   </TouchableOpacity>
    // );
  }
}

Component.propTypes = {
  navigation: PropTypes.object.isRequired,
  type : PropTypes.oneOfType([BTYPES.HOME])
  
};
