import { Map } from "immutable";
import { handleActions, createAction } from "redux-actions";

const SET_INPUT = 'InputLifeData/SET_INPUT';
const UPDATE_STATUS = 'UpdateLifeStatus/UPDATE_STATUS';
const UPDATE_RESULT = 'UpdateLifeResult/UPDATE_TEST_RESULT';
const INITIALIZATION = 'LifeDataInitialization/INITIALIZATION';

export const setInput = createAction(SET_INPUT);
export const updateStatus = createAction(UPDATE_STATUS);
export const updateResult = createAction(UPDATE_RESULT);
export const initialization = createAction(INITIALIZATION);
const initialState = Map({
    status : 'ready',
    testResult : Map({
        personality : Map ({
            society : 0, // 사회
            sensitivity : 0, // 감성
            creativity : 0, // 창의
            recognition : 0 // 인지
        }),
        interest : Map ({
            family : 0,
            nature : 0,
            imagination : 0,
            object : 0,
            relationship : 0,
            place : 0,
            physicalActivity : 0,
            art : 0,
            total : 0
        }),
        
    }),
    anser : Map({
        r1 : Map({
            value : 0,
            personality : 'society',
            interest : 'family'
        }),
        r2 : Map({
            value : 0,
            personality : 'sensitivity',
            interest : 'nature'
        }),
        r3 : Map({
            value : 0,
            personality : 'creativity',
            interest : 'imagination'
        }),
        r4 : Map({
            value : 0,
            personality : 'recognition',
            interest : 'object'
        }),
        r5 : Map({
            value : 0,
            personality : 'society',
            interest : 'relationship'
        }),
        r6 : Map({
            value : 0,
            personality : 'sensitivity',
            interest : 'nature'
        }),
        r7 : Map({
            value : 0,
            personality : 'creativity',
            interest : 'nature'
        }),
        r8 : Map({
            value : 0,
            personality : 'recognition',
            interest : 'place'
        }),
        r9 : Map({
            value : 0,
            personality : 'society',
            interest : 'imagination'
        }),
        r10 : Map({
            value : 0,
            personality : 'sensitivity',
            interest : 'physicalActivity'
        }),
        r11 : Map({
            value : 0,
            personality : 'creativity',
            interest : 'physicalActivity'
        }),
        r12 : Map({
            value : 0,
            personality : 'recognition',
            interest : 'place'
        }),
        r13 : Map({
            value : 0,
            personality : 'society',
            interest : 'family'
        }),
        r14 : Map({
            value : 0,
            personality : 'sensitivity',
            interest : 'relationship'
        }),
        r15 : Map({
            value : 0,
            personality : 'creativity',
            interest : 'art'
        }),
        r16 : Map({
            value : 0,
            personality : 'recognition',
            interest : 'object'
        }),
        r17 : Map({
            value : 0,
            personality : 'society',
            interest : 'relationship'
        }),
        r18 : Map({
            value : 0,
            personality : 'sensitivity',
            interest : 'imagination'
        }),
        r19 : Map({
            value : 0,
            personality : 'creativity',
            interest : 'physicalActivity'
        }),
        r20 : Map({
            value : 0,
            personality : 'recognition',
            interest : 'art'
        })
    }),
    
})



export default handleActions({
    [SET_INPUT] : (state,action) => {     
        const { name,value } = action.payload;
        return state.setIn(['anser',name,'value'],Number(value));
    },
    [UPDATE_RESULT] : (state,action) => {
        const {society,sensitivity,creativity,recognition,
                family,nature,imagination,
                object,relationship,place,physicalActivity,art,sum} = action.payload;
        return state.setIn(['testResult','personality','society'],society)
                    .setIn(['testResult','personality','sensitivity'],sensitivity)
                    .setIn(['testResult','personality','creativity'],creativity)
                    .setIn(['testResult','personality','recognition'],recognition)

                    .setIn(['testResult','interest','family'],family)
                    .setIn(['testResult','interest','nature'],nature)
                    .setIn(['testResult','interest','imagination'],imagination)
                    .setIn(['testResult','interest','object'],object)
                    .setIn(['testResult','interest','relationship'],relationship)
                    .setIn(['testResult','interest','place'],place)
                    .setIn(['testResult','interest','physicalActivity'],physicalActivity)
                    .setIn(['testResult','interest','art'],art)
                    .setIn(['testResult','interest','total'],sum);
    },
    
    [UPDATE_STATUS] : (state,action) => {
        const value = action.payload;
        return state.setIn(['status'],value);
    },
    [INITIALIZATION] : (state) => {
        return state.setIn(['testResult','personality','society'],0)
                    .setIn(['testResult','personality','sensitivity'],0)
                    .setIn(['testResult','personality','creativity'],0)
                    .setIn(['testResult','personality','recognition'],0)

                    .setIn(['testResult','interest','family'],0)
                    .setIn(['testResult','interest','nature'],0)
                    .setIn(['testResult','interest','imagination'],0)
                    .setIn(['testResult','interest','object'],0)
                    .setIn(['testResult','interest','relationship'],0)
                    .setIn(['testResult','interest','place'],0)
                    .setIn(['testResult','interest','physicalActivity'],0)
                    .setIn(['testResult','interest','art'],0)
                    .setIn(['testResult','interest','total'],0);
    }
},initialState);
