import React from 'react';
import NumericInput from 'react-native-numeric-input';
import PropTypes from 'prop-types';
import { createDataPoint } from '../../../actions';
import { connect } from 'react-redux';


 class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value : '',
            onLimitReached: 10
        }
    }

    componentWillUnmount() {
        // this.setState({
        //   allData : this.state.allData.concat([{eventName : {...this.state.eventName}, eventCategory :{...this.state.itemDipilih}, eventDate: {...this.state.eventDate}, eventMembers: {...this.state.choosenMembers}}])
        // });
        const passingPoint = {point : this.state.value};
        // console.log(passingAllData)
        this.props.createPoint(passingPoint)
      }

    render(){
        console.log(this.state.value)
        return(
            <NumericInput 
            value={this.state.value} 
            onChange={value => this.setState({value})} 
            onLimitReached={(isMax,msg) => console.log(isMax,msg)}
            totalWidth={80} 
            totalHeight={35} 
            iconSize={50}
            step={1}
            valueType='real'
            rounded 
            textColor='#289F97' 
            iconStyle={{ color: 'white' }} 
            rightButtonBackgroundColor='#289F97' 
            leftButtonBackgroundColor='#289F97'
            />
        );
    }


}

Component.propTypes = {
    navigation: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => {
    return {
      datapoint : state.dataPoint
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      createPoint : (allPoint) => dispatch(createDataPoint(allPoint))
    }
  };
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Component)
