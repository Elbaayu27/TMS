const initialState = {
    // listEvent: []
};

const dataEventReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'GET_DATA_EVENT':
            return {
                // listEvent: state.listEvent.concat([action.payload])
                ...state,
                response : action.payload
            };
        
       
        default:
            return state;
    };
};
export default dataEventReducer;