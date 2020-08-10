import { Map } from 'immutable';
import { handleActions,createAction } from "redux-actions";

const SET_INPUT = 'InputStudyData/SET_INPUT';
const UPDATE_STATUS = 'UpdateStudyStatus/UPDATE_STATUS';
const UPDATE_ATTRIBUTE_RESULT = 'UpdateStudyAttributeResult/UPDATE_ATTRIBUTE_RESULT';
const INITIALIZATION = 'StudyDataInitialization/INITIALIZATION';

export const setInput = createAction(SET_INPUT);
export const updateStatus = createAction(UPDATE_STATUS);
export const updateAttributeResult = createAction(UPDATE_ATTRIBUTE_RESULT);
export const initialization = createAction(INITIALIZATION);

const initialState = Map({
    status : 'ready',
    testResult : Map({
        attribute : Map({
            visual : 0,
            physical : 0,
            auditory : 0                    
        }),
        total : 0
    }),
    anser : Map({
        r1 : Map({
            value : 0,
            attribute : 'auditory'
        }),
        r2 : Map({
            value : 0,
            attribute : 'physical'
        }),
        r3 : Map({
            value : 0,
            attribute : 'visual'
        }),
        r4 : Map({
            value : 0,
            attribute : 'auditory'
        }),
        r5 : Map({
            value : 0,
            attribute : 'physical'
        }),
        r6 : Map({
            value : 0,
            attribute : 'visual'
        }),
        r7 : Map({
            value : 0,
            attribute : 'auditory'
        }),
        r8 : Map({
            value : 0,
            attribute : 'visual'
        }),
        r9 : Map({
            value : 0,
            attribute : 'visual'
        }),
        r10 : Map({
            value : 0,
            attribute : 'physical'
        })
    })
})

export default handleActions({
    [SET_INPUT] : (state,action) => {
        const { name,value } = action.payload;
        return state.setIn(['anser',name,'value'],Number(value));
    },
    [UPDATE_STATUS] : (state,action) => {
        const value = action.payload;
        return state.setIn(['status'],value);
    },
    [UPDATE_ATTRIBUTE_RESULT] : (state,action) => {
        const { visual,physical,auditory,total } = action.payload;
        return state.setIn(['testResult','attribute','visual'],visual)
                    .setIn(['testResult','attribute','physical'],physical)
                    .setIn(['testResult','attribute','auditory'],auditory)
                    .setIn(['testResult','total'],total)
                    .setIn(['status'],'completed');
    },
    [INITIALIZATION] : (state) => {
        return state.setIn(['testResult','total'],0)
                    .setIn(['testResult','attribute','visual'],0)
                    .setIn(['testResult','attribute','physical'],0)
                    .setIn(['testResult','attribute','auditory'],0);
                           
    }
},initialState);