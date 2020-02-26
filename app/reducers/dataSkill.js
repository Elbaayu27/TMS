const initialState = {
    idSkill: null,
    name: null
};

const dataSkillReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'SAVE_DATA_SKILL':
            return {
                ...state,
                idSkill: action.payload,
                name: action.name
            };
        default:
            return state;
    };
};
export default dataSkillReducer;