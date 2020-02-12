const initialState = {
    
};

const dataMeasureReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'GET_DATA_MEASURE':
            return {
                ...state,
                response : action.payload
            };
        
       
        default:
            return state;
    };
};
export default dataMeasureReducer;