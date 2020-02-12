const initialState = {
    // akun : {email : "elbaayu27@gmail.com", password: "elba123"},
    //  status: false
}
const loggedReducer = (state =initialState, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                ...state,
                response : action.payload
            }
        default:
            return state;
    }
};
export default loggedReducer; 