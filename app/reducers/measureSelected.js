const initialState = {
   
};

const measureSelectedReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'GET_MEASURE_SELECTED':
            return {
                ...state,
                response : action.payload
            };
        default:
            return state;
    };
};
export default measureSelectedReducer;