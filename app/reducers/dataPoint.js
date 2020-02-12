const initialState = {
    measurements: {}
};

const dataPointReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'SAVE_DATA_LOCAL_TO_AS':
            return {
                ...state,
                measurements: [action.payload]
            };
        default:
            return state;
    };
};
export default dataPointReducer;