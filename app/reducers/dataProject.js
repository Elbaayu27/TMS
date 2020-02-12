const initialState = {
    title : 'Squad List',
    // listData : [{ id : 1, name:'Codex'},{ id : 2, name:'My Pertamina'},{ id : 3, name:'Zoomin'},
    //                 { id : 4, name:'Agree'},{ id : 5, name:'Apartment Solution'},{ id : 6, name:'UseeTVGo'},
    //                 { id : 7, name:'TDN'},{ id : 8, name:'TDS'},{ id : 9, name:'SCN'},
    //                 { id : 10, name:'PalapaOne'}]
};

const dataProjectReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'GET_LIST_PROJECT':
            return {
                ...state,
                response : action.payload
            };
        default:
            return state;
    };
};
export default dataProjectReducer;