const initialState = {
   
};

const squadSelectedReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'GET_SQUAD_SELECTED':
            return {
                ...state,
                response : action.payload
            };
        default:
            return state;
    };
};
export default squadSelectedReducer;