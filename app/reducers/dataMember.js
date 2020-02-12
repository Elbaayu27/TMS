const initialState = {
    // listMember : [{id:1, name:'Eka Rahadi'},{id:2, name:'Elba Ayu Kurnia'},{id:3, name:'Salwa Husnun'},
    //               {id:4, name:'Afra Nur Sasantara'},{id:5, name:'Pricilia'},{id:6, name:'Liza Apriliyani'},
    //               {id:7, name:'Leonardo'},{id:8, name:'James'},{id:9, name:'Steve Rogers'},
    //               {id:10, name:'Iron Man'},]
};

const dataMemberReducer = (state= initialState, action) => {
    switch(action.type) {
        case 'GET_LIST_MEMBER':
            return {
                ...state,
                response : action.payload
            };
        default:
            return state;
    };
};
export default dataMemberReducer;