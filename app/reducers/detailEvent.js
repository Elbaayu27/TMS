const initialState = {
    detailEvent : null
};

const detailEventReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'DETAIL_EVENT':
            return {
                ...state,
                detailEvent: action.payload
            };
        default:
            return state;
    };
};
export default detailEventReducer;