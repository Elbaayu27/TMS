import React from 'react';
import DialogInput from 'react-native-dialog-input';

export default class Component extends React.Component{
    constructor(props) {
        super(props);
        state = {
            isDialogVisible : true
        };
    }
    render(){
        return(
         <DialogInput isDialogVisible={this.state.isDialogVisible}
            title={"DialogInput 1"}
            message={"Message for DialogInput #1"}
            hintInput ={"HINT INPUT"}
            submitInput={ (inputText) => {this.sendInput(inputText)} }
            closeDialog={ () => {this.showDialog(false)}}>
         </DialogInput>
        );
    }
}