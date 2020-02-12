import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
    status : false,
    measurementsFromAsyncStorage:[],
};
_getData = async (params) => {
    AS = await AsyncStorage.getItem(params);
    if(AS !== null) {
        return {
            ...initialState,
            measurementsFromAsyncStorage : JSON.parse(AS)
        }
    }
}

const updateDataPointReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'UPDATE_DATA_AS':
           let index = action.datapatch.findIndex(y => y.measurementId == action.id.measurementId)
           if(index == -1) {
               console.log('Concat')
               let hasil = [...action.datafix, action.id]
               return {
                    ...state,
                    measurementsFromAsyncStorage: hasil
               }
           }
           else
           {
               console.log('update')
               let update = {...action.datapatch[index], member: action.payload}
               action.datapatch = action.datapatch.splice(index, 1, update)
               let dataBaru = [...action.datafix, update]
               dataBaru.pop()

               return {
                   ...state,
                   measurementsFromAsyncStorage : dataBaru

               }
           }
        case 'INIT_DATA_AS':
            return {
                ...state,
                measurementsFromAsyncStorage : action.payload

            }
        default:
            return state;
    };
};
export default updateDataPointReducer;