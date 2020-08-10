import { Map } from "immutable";
import { handleActions, createAction } from "redux-actions";

const SET_DATE = 'kakaoSetDate/SET_DATE';
const SET_TEST_DATA = 'kakaoSetTestData/SET_TEST_DATA';

export const setDate = createAction(SET_DATE);
export const setTestData = createAction(SET_TEST_DATA);
const initialState = Map({
    testDate : Map({
        life : [{}],
        study : [{}],
        roadMap : [{}],
        character : [{}]
    }),
    selectedData : Map({
        life : 0,
        study : 0,
        roadMap : 0,
        character : 0
    })
})



export default handleActions({
    [SET_DATE] : (state,action) => {     
        const  {roadMap,life,study,character}  = action.payload;
        return state.setIn(['testDate','life'],life.data)
                    .setIn(['testDate','roadMap'],roadMap.data)
                    .setIn(['testDate','study'],study.data)
                    .setIn(['testDate','character'],character.data);
    }    
},initialState);
