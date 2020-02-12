const initialState = {
   
};

const eventSelectedReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'GET_EVENT_SELECTED':
            return {
                ...state,
                response : action.payload
            };
        default:
            return state;
    };
};
export default eventSelectedReducer;