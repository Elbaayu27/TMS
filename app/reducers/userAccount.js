const initialState = {
    data: null,
    userLogin: false
};

const userAccountReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'USER_ACCOUNT' :
            return {
                ...state,
                data : action.payload,
                userLogin : action.status
            };
        case 'USER_LOGOUT' :
            return {
                data: null,
                userLogin: false
            }
        default :
            return state;
    }
}

export default userAccountReducer;